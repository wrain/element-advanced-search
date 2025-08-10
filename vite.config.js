/*
 * @Author: WrainCN 123723620@qq.com
 * @Date: 2025-08-10 18:24:54
 * @LastEditors: WrainCN 123723620@qq.com
 * @LastEditTime: 2025-08-10 19:37:05
 * @FilePath: \element-advanced-search\vite.config.js
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/element-advanced-search/', // 这里需要与你的仓库名一致
  build: {
    outDir: 'docs',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})