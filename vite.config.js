import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { resolve } from 'path'  // for rollup multi-page

import injectHTML from 'vite-plugin-html-inject';                  // component approach in html 
import { ViteMinifyPlugin } from 'vite-plugin-minify';             // minify html in build
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';  // optimize images requires plugins svgo and sharp
import FullReload from 'vite-plugin-full-reload'                   // auto reload on changes

function createAlias(relativePath) {
  return fileURLToPath(new URL(relativePath, import.meta.url))
}

export default defineConfig({
  build: {
    minify       : 'esbuild',
    cssMinify    : 'lightningcss',   // if there is any conflicts just remove it (but it's very fast)
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
              // add pages here if it's no SPA  
              // about: resolve(__dirname, 'about.html'),
      }
    },
  },
  plugins: [ 
  injectHTML(), 
  FullReload(['./scr/**/*']),
  ViteImageOptimizer({
    exclude: /^sprite.svg$/,   // if you need to exclude favicons: ['apple-touch-icon.png', 'web-app-manifest-192x192.png', 'web-app-manifest-512x512.png', 'favicon-48x48.png', 'favicon.svg']
    png    : {
      quality: 60,
    },
    jpeg: {
      quality: 60,
    },
    jpg: {
      quality: 60,
    },
    webp: {
      lossless: true,
    },
    avif: {
      lossless: true,
    },
    cache: false,
  }),
	ViteMinifyPlugin({})
  ],
  resolve: {
    alias: {
      '@'       : createAlias('src'),
      '@scripts': createAlias('src/scripts'),

                  // styles
      '@styles'           : createAlias('src/styles'),
      '@abstracts'        : createAlias('src/styles/abstracts'),
      '@scss-components': createAlias('src/styles/components'),
      '@base': createAlias('src/styles/base'),

                  // components
      '@components': createAlias('src/components'),
                  // '@molecules': createAlias('./src/components/molecules'),
                  // '@organisms': createAlias('./src/components/organisms'),
                  // '@templates': createAlias('./src/components/templates'),

                  // assets
      '@assets': createAlias('src/assets'),
      '@images': createAlias('src/assets/images'),
      '@fonts' : createAlias('src/assets/fonts'),
      '@logos' : createAlias('src/assets/logos'),
      '@icons' : createAlias('src/assets/icons'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``,   // global styles
      },
    },
  },
})

