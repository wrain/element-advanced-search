<template>
  <div id="app">
    <header class="header">
      <h1>ElementAdvancedSearch 示例</h1>
      <p>一个功能强大的Vue 3高级搜索组件，基于Element Plus构建</p>
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
import Demo from './components/Demo.vue'
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
  padding: 2rem 1rem;
  text-align: center;
}

.header h1 {
  margin: 0 0 0.5rem 0;
}

.header p {
  margin: 0;
  opacity: 0.9;
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
</style>