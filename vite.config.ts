/*
 * @Author: WrainCN 123723620@qq.com
 * @Date: 2025-08-10 18:24:54
 * @LastEditors: WrainCN 123723620@qq.com
 * @LastEditTime: 2025-08-11 02:18:32
 * @FilePath: \element-advanced-search\vite.config.js
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [vue(), vueJsx()],
  base: '/element-advanced-search/', // 这里需要与你的仓库名一致
  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})