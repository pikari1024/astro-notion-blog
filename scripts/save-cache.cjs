const fs = require('fs');
const path = require('path');

const CACHE_DIR = path.join(__dirname, '../node_modules/.astro/notion-cache');
const DIST_CACHE_DIR = path.join(__dirname, '../dist/notion-cache');

if (fs.existsSync(CACHE_DIR)) {
    console.log('Saving cache to dist/notion-cache...');
    if (!fs.existsSync(DIST_CACHE_DIR)) {
        fs.mkdirSync(DIST_CACHE_DIR, { recursive: true });
    }
    fs.cpSync(CACHE_DIR, DIST_CACHE_DIR, { recursive: true });
    console.log('Cache saved successfully to dist.');
} else {
    console.log('No cache found to save.');
}
