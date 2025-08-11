<template>
  <div id="app">
    <header class="header">
      <div class="header-content">
        <div class="header-info">
          <h1>ElementAdvancedSearch 示例</h1>
          <p>一个功能强大的Vue 3高级搜索组件，基于Element Plus构建</p>
        </div>
        <div class="theme-toggle">
          <el-switch
            v-model="isDark"
            inline-prompt
            :active-icon="Moon"
            :inactive-icon="Sunny"
            @change="toggleTheme"
          />
        </div>
      </div>
    </header>
    
    <main class="main">
      <Demo />
    </main>
    
    <footer class="footer">
      <p>© 2025 ElementAdvancedSearch - 基于Element Plus的高级搜索组件</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Moon, Sunny } from '@element-plus/icons-vue'
import Demo from './components/Demo.vue'

const isDark = ref(false)

// 切换主题
const toggleTheme = (dark) => {
  isDark.value = dark
  if (dark) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// 检查本地存储的主题设置
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else if (savedTheme === 'light') {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  } else {
    // 根据系统偏好设置
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = prefersDark
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    }
  }
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #409eff;
  color: white;
  padding: 1rem;
  text-align: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-info {
  flex: 1;
  text-align: left;
}

.header-info h1 {
  margin: 0 0 0.5rem 0;
}

.header-info p {
  margin: 0;
  opacity: 0.9;
}

.theme-toggle {
  display: flex;
  align-items: center;
}

.main {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
}

/* 暗色主题样式 */
html.dark {
  .header {
    background-color: #1d2939;
  }
  
  .footer {
    background-color: #1d2939;
    color: var(--el-text-color-primary);
  }
}
</style>