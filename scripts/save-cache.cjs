const fs = require('fs');
const path = require('path');

const CACHE_DIR = path.join(__dirname, '../.notion-cache');
const DIST_CACHE_DIR = path.join(__dirname, '../dist/notion-cache');
const NM_CACHE_DIR = path.join(__dirname, '../node_modules/.cache/astro-notion-blog');

if (fs.existsSync(CACHE_DIR)) {
    console.log('Saving cache to dist/notion-cache...');
    if (!fs.existsSync(DIST_CACHE_DIR)) {
        fs.mkdirSync(DIST_CACHE_DIR, { recursive: true });
    }
    fs.cpSync(CACHE_DIR, DIST_CACHE_DIR, { recursive: true });

    console.log('Saving cache to node_modules/.cache/astro-notion-blog...');
    if (!fs.existsSync(NM_CACHE_DIR)) {
        fs.mkdirSync(NM_CACHE_DIR, { recursive: true });
    }
    fs.cpSync(CACHE_DIR, NM_CACHE_DIR, { recursive: true });

    console.log('Cache saved successfully to both locations.');
} else {
    console.log('No cache found to save.');
}
