import fs from 'fs';
import path from 'path';

const domain = 'https://scarab-clean.com';

// Список сторінок сайту
const pages = ['/', '/services', '/gallery', '/reviews', '/contacts'];

const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page, i) => `  <url>
    <loc>${domain}${page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${i === 0 ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.resolve('dist', 'sitemap.xml'), sitemap);
console.log('✅ Sitemap generated!');
