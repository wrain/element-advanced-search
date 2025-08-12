<template>
  <div id="app">
    <div class="header-section">
      <div class="header-content">
        <h1 class="main-title">
          Element Advanced Search
        </h1>
        <p class="subtitle">一个功能强大的 Vue 3 搜索组件，基于 Element Plus 构建</p>
        <div class="header-actions">
          <el-button type="primary" size="large" @click="goToGitHub">
            <el-icon><Star /></el-icon>
            GitHub 项目
          </el-button>
          <el-button type="success" size="large" @click="goToDocs">
            <el-icon><Document /></el-icon>
            查看文档
          </el-button>
        </div>
        <div class="features-tags">
          <el-tag v-for="feature in features" :key="feature" type="info" effect="dark" size="small">
            {{ feature }}
          </el-tag>
        </div>
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
    
    <div class="content-container">
      <Demo />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Demo from './components/Demo.vue'
import { Star, Document, Sunny, Moon } from '@element-plus/icons-vue'

// 暗色主题相关
const isDark = ref(false)

// 切换主题
const toggleTheme = (val) => {
  if (val) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  // 保存用户偏好到 localStorage
  localStorage.setItem('element-advanced-search-theme', val ? 'dark' : 'light')
}

// 初始化主题
onMounted(() => {
  // 检查用户偏好设置
  const savedTheme = localStorage.getItem('element-advanced-search-theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
    toggleTheme(isDark.value)
  } else {
    // 检查系统主题
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = prefersDark
    toggleTheme(prefersDark)
  }
})

// 特性标签
const features = ref([
  'Vue 3',
  'Element Plus',
  'TypeScript',
  '响应式设计',
  '多种表单控件',
  '搜索缓存',
  '自定义插槽'
])

// 跳转到GitHub
const goToGitHub = () => {
  window.open('https://github.com/wrain/element-advanced-search', '_blank')
}

// 跳转到文档
const goToDocs = () => {
  window.open('https://github.com/wrain/element-advanced-search#readme', '_blank')
}
</script>

<style scoped lang="scss">
#app {
  min-height: 100vh;
}

.header-section {
  background: linear-gradient(135deg, #409eff 0%, #2d8cf0 100%);
  padding: 20px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    animation: rotate 10s linear infinite;
    z-index: 0;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.main-title {
  font-size: 3rem;
  margin-bottom: 15px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.header-actions {
  margin-bottom: 25px;
  animation: fadeInUp 1s ease-out 0.4s both;
  
  .el-button {
    margin: 0 10px;
    transition: all 0.3s ease;
    
    &:first-child {
      background-color: white;
      color: #409eff;
      border-color: white;
      
      &:hover {
        background-color: #f0f9ff;
        border-color: #f0f9ff;
      }
    }
    
    &:last-child {
      background-color: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
      color: white;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.7);
      }
    }
  }
}

.features-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  animation: fadeInUp 1s ease-out 0.6s both;
  
  .el-tag {
    margin: 0;
    animation: fadeIn 0.5s ease-out;
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    color: white;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    
    @for $i from 1 through 7 {
      &:nth-child(#{$i}) { 
        animation-delay: #{$i * 0.1}s; 
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.theme-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 4px 8px;
  backdrop-filter: blur(10px);
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 暗黑模式样式 */
html.dark,
:deep(.dark) {
  .header-section {
    background: #000000;
    
    &::before {
      background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 70%);
    }
  }
  
  .header-actions {
    .el-button {
      &:first-child {
        background-color: var(--el-color-primary);
        color: #FFFFFF;
        border-color: var(--el-color-primary);
        
        &:hover {
          background-color: #144787;
          border-color: #1d579c;
        }
      }
      
      &:last-child {
        background-color: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.15);
        color: #c6e2ff;
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.25);
        }
      }
    }
  }
  
  .features-tags {
    .el-tag {
      background-color: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
      color: #c6e2ff;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.25);
      }
    }
  }
  
  .theme-toggle {
    background: rgba(0, 0, 0, 0.3);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-section {
    padding: 40px 15px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .header-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    .el-button {
      margin: 0;
      width: 100%;
    }
  }
  
  .features-tags {
    justify-content: center;
    
    .el-tag {
      margin: 3px;
    }
  }
  
  .content-container {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
  }
}
</style>