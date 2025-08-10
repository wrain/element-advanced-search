import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: '/index.html' // 启动时自动打开带 index.html 的地址
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/ElementAdvancedSearch/index.vue'),
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
    }
  }
})