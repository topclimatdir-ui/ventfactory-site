// Генератор статичного сайту: data/*.json + templates/*.mjs -> dist/
// Запуск: node build.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { homePage } from './templates/home.mjs';

const read = f => JSON.parse(readFileSync(new URL(`./data/${f}.json`, import.meta.url), 'utf8'));
const data = {
  site: read('site'),
  home: read('home'),
  products: read('products'),
  services: read('services'),
  objects: read('objects')
};

const OUT = new URL('./dist/', import.meta.url).pathname;
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const pages = []; // { path, html }
pages.push({ path: '/', html: homePage(data) });

for (const p of pages) {
  const file = join(OUT, p.path, p.path.endsWith('.html') ? '' : 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, p.html);
}

// Статика: css, js, images, CNAME
cpSync(new URL('./src/', import.meta.url).pathname, OUT, { recursive: true });
if (existsSync('CNAME')) cpSync('CNAME', join(OUT, 'CNAME'));
console.log(`Зібрано сторінок: ${pages.length} -> dist/`);
