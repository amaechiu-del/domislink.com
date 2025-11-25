/**
 * Domislink Search & Retrieve Utility
 * -----------------------------------
 * Modernized for Node 20+ and Render deployment.
 * Scans the local repo or connected directories for matching content.
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Recursively searches files for a given query string.
 * @param {string} dir - Directory path to search.
 * @param {string} query - Text to find.
 * @param {string[]} extensions - File extensions to include.
 * @returns {Promise<string[]>} - Matching file paths.
 */
async function searchFiles(dir, query, extensions = ['.js', '.jsx', '.json', '.md', '.yaml', '.yml']) {
  const results = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subResults = await searchFiles(filePath, query, extensions);
      results.push(...subResults);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.includes(ext)) {
        const content = await fs.promises.readFile(filePath, 'utf8');
        if (content.toLowerCase().includes(query.toLowerCase())) {
          results.push(filePath);
        }
      }
    }
  }

  return results;
}

/**
 * Runs the search interactively (local or CLI mode).
 */
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (q) => new Promise((res) => rl.question(q, res));
  const query = (await ask('🔍 Enter search query: ')).trim();
  rl.close();

  if (!query) {
    console.log('❌ No search term provided.');
    process.exit(1);
  }

  const basePath = path.resolve(__dirname, '../../');
  console.log(`\n📁 Searching in: ${basePath}`);
  const hits = await searchFiles(basePath, query);

  if (hits.length === 0) {
    console.log('⚠️ No matches found.');
  } else {
    console.log(`✅ Found ${hits.length} matches:\n`);
    hits.forEach((f, i) => console.log(`${i + 1}. ${f}`));
  }
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error('❌ Search error:', err);
    process.exit(1);
  });
}

export { searchFiles };
