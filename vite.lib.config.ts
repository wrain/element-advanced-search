/*
 * @Author: WrainCN 123723620@qq.com
 * @Date: 2025-08-10 19:34:19
 * @LastEditors: WrainCN 123723620@qq.com
 * @LastEditTime: 2025-08-11 02:30:56
 * @FilePath: \element-advanced-search\vite.lib.config.js
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'), // 指向库入口文件
      name: 'ElementAdvancedSearch',
      fileName: (format) => `element-advanced-search.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        }
      }
    },
    outDir: 'dist',
  }
})