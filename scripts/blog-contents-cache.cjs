const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { Client } = require('@notionhq/client');
const cliProgress = require('cli-progress');
const { PromisePool } = require('@supercharge/promise-pool');

const notion = new Client({ auth: process.env.NOTION_API_SECRET });

const getAllPages = async () => {
  const params = {
    database_id: process.env.DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'Date',
          date: {
            on_or_before: new Date().toISOString(),
          },
        },
      ],
    },
  };

  let results = [];
  while (true) {
    const res = await notion.databases.query(params);

    results = results.concat(res.results);

    if (!res.has_more) {
      break;
    }

    params['start_cursor'] = res.next_cursor;
  }

  const pages = results.map((result) => {
    return {
      id: result.id,
      last_edited_time: result.last_edited_time,
      slug: result.properties.Slug.rich_text
        ? result.properties.Slug.rich_text[0].plain_text
        : '',
    };
  });

  return pages;
};

(async () => {
  const pages = await getAllPages();
  console.log(`Found ${pages.length} pages to process.`);

  // Load cache metadata
  const CACHE_DIR = path.join(__dirname, '../node_modules/.astro/notion-cache');
  const DIST_CACHE_DIR = path.join(__dirname, '../dist/notion-cache');
  const CACHE_META_PATH = path.join(CACHE_DIR, 'notion-cache-meta.json');

  // Restore cache from dist if available (Backup)
  if (fs.existsSync(DIST_CACHE_DIR) && !fs.existsSync(CACHE_DIR)) {
    console.log('Restoring cache from dist/notion-cache...');
    fs.cpSync(DIST_CACHE_DIR, CACHE_DIR, { recursive: true });
  }

  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  let cacheMeta = {};

  if (fs.existsSync(CACHE_META_PATH)) {
    try {
      cacheMeta = JSON.parse(fs.readFileSync(CACHE_META_PATH, 'utf-8'));
    } catch (e) {
      console.warn('Failed to parse cache meta file, starting fresh.');
    }
  }

  const CACHE_VERSION = 1;
  const concurrency = parseInt(process.env.CACHE_CONCURRENCY || '10', 10);

  let processedCount = 0;
  let skippedCount = 0;

  // Invalidate cache if version mismatch
  if (cacheMeta.version !== CACHE_VERSION) {
    console.log(`Cache version mismatch (Current: ${CACHE_VERSION}, Meta: ${cacheMeta.version}). Clearing cache metadata.`);
    cacheMeta = { version: CACHE_VERSION };
  }

  await PromisePool.withConcurrency(concurrency)
    .for(pages)
    .process(async (page) => {
      return new Promise((resolve) => {
        // Check if page needs update
        const cacheFileExists = fs.existsSync(path.join(CACHE_DIR, `${page.id}.json`));
        if (cacheFileExists && cacheMeta[page.id] === page.last_edited_time) {
          skippedCount++;
          // console.log(`[Skip] ${page.slug} (${page.id}) - Up to date`);
          return resolve();
        }

        const command = `NX_BRANCH=main npx nx run astro-notion-blog:_fetch-notion-blocks ${page.id} ${page.last_edited_time}`;
        const options = { timeout: 60000 };

        exec(command, options, (err, stdout, stderr) => {
          processedCount++;
          if (err) {
            console.error(`[Error] Failed to process ${page.slug} (${page.id}): ${err.message}`);
            console.error(stderr);
          } else {
            console.log(`[${processedCount + skippedCount}/${pages.length}] Processed ${page.slug} (${page.id})`);
            // Update cache meta on success
            cacheMeta[page.id] = page.last_edited_time;
          }
          return resolve();
        });
      });
    });

  // Save updated cache metadata
  if (!fs.existsSync(path.dirname(CACHE_META_PATH))) {
    fs.mkdirSync(path.dirname(CACHE_META_PATH), { recursive: true });
  }
  fs.writeFileSync(CACHE_META_PATH, JSON.stringify(cacheMeta, null, 2));

  console.log(`All pages processed. (Processed: ${processedCount}, Skipped: ${skippedCount})`);
})();
