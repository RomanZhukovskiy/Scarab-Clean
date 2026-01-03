import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import compression from 'vite-plugin-compression';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  root: '.',
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser',
    manifest: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },

  plugins: [
    injectHTML({
      injectData: {
        title: 'Scarab Clean — Прибирання у Львові',
        description:
          'Scarab Clean — професійне прибирання у Львові для дому та бізнесу. Надійно, швидко, якісно.',
        keywords:
  'прибирання Львів, клінінг Львів, професійний клінінг Львів, клінінгова компанія Львів, ' +
  'миття вікон Львів, миття фасадів Львів, ' +
  'хімчистка Львів, хімчистка диванів Львів, хімчистка коврів Львів, ' +
  'хімчистка крісел Львів, хімчистка матраців Львів, ' +
  'видалення запахів Львів, ' +
  'прибирання після ремонту Львів, післяремонтне прибирання Львів, ' +
  'генеральне прибирання Львів, підтримуюче прибирання Львів, ' +
  'прибирання квартир Львів, прибирання будинків Львів, прибирання офісів Львів, ' +
  'миття кухні Львів, прибирання санвузла Львів, ' +
  'дешевий клінінг Львів, доступний клінінг Львів, ' +
  'Scarab Clean'        css: '/assets/index.[hash].css',
      },
    }),

    FullReload(['./html/**/*.html']),

    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress' }),

    {
      name: 'copy-public-files',
      closeBundle() {
        const files = ['robots.txt', 'sitemap.xml'];
        const srcDir = path.resolve(__dirname, 'src/public');
        const distDir = path.resolve(__dirname, 'dist');

        files.forEach(file => {
          const srcPath = path.join(srcDir, file);
          const distPath = path.join(distDir, file);

          if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, distPath);
            console.log(`Copied ${file} to dist/`);
          } else {
            console.warn(`File not found: ${srcPath}`);
          }
        });
      },
    },
  ],
});
