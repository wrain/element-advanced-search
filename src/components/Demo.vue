<template>
  <div class="demo">
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>完整功能演示</span>
          <el-button size="small" @click="showSource('full')">查看源码</el-button>
        </div>
      </template>
      
      <ElementAdvancedSearch
        v-model="fullSearchParams"
        :search-config="fullSearchConfig"
        cache-key="full-demo"
        quick-search-field="keywords"
        quick-search-placeholder="请输入用户名或邮箱"
        @search="handleFullSearch"
      />
      
      <div class="result">
        <h3>搜索结果:</h3>
        <pre>{{ fullSearchParams }}</pre>
      </div>
    </el-card>

    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>基础用法</span>
          <el-button size="small" @click="showSource('basic')">查看源码</el-button>
        </div>
      </template>
      
      <ElementAdvancedSearch
        v-model="basicSearchParams"
        :search-config="basicSearchConfig"
        @search="handleBasicSearch"
      />
      
      <div class="result">
        <h3>搜索结果:</h3>
        <pre>{{ basicSearchParams }}</pre>
      </div>
    </el-card>
    
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>带缓存功能</span>
          <el-button size="small" @click="showSource('cache')">查看源码</el-button>
        </div>
      </template>
      
      <ElementAdvancedSearch
        v-model="cacheSearchParams"
        :search-config="cacheSearchConfig"
        cache-key="user-management-demo"
        quick-search-field="keywords"
        @search="handleCacheSearch"
      >
        <template #status="{ model, field }">
          <el-switch
            v-model="model[field]"
            active-text="启用"
            inactive-text="禁用"
          />
        </template>
      </ElementAdvancedSearch>
      
      <div class="result">
        <h3>搜索结果:</h3>
        <pre>{{ cacheSearchParams }}</pre>
      </div>
    </el-card>
    
    <!-- 源码展示对话框 -->
    <el-dialog
      v-model="sourceDialogVisible"
      :title="sourceDialogTitle"
      width="60%"
      top="50px"
      class="source-dialog"
    >
      <el-tabs v-model="activeSourceTab" class="source-tabs">
        <el-tab-pane label="配置代码" name="config">
          <pre class="source-code">{{ currentSource.config }}</pre>
        </el-tab-pane>
        <el-tab-pane label="模板代码" name="template">
          <pre class="source-code">{{ currentSource.template }}</pre>
        </el-tab-pane>
        <el-tab-pane label="处理函数" name="handler">
          <pre class="source-code">{{ currentSource.handler }}</pre>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <el-button @click="sourceDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ElementAdvancedSearch from './ElementAdvancedSearch/index.vue'

// 源码展示相关
const sourceDialogVisible = ref(false)
const sourceDialogTitle = ref('')
const activeSourceTab = ref('config')
const currentSource = ref({})

const showSource = (type) => {
  sourceDialogVisible.value = true
  activeSourceTab.value = 'config'
  
  switch(type) {
        case 'basic':
      sourceDialogTitle.value = '基础用法源码'
      currentSource.value = {
        config: `const basicSearchConfig = ${JSON.stringify(Object.assign({}, basicSearchConfig), null, 2)}`,
        template: `<ElementAdvancedSearch
  v-model="basicSearchParams"
  :search-config="basicSearchConfig"
  @search="handleBasicSearch"
/>`,
        handler: `const basicSearchParams = ref({})
const handleBasicSearch = (params) => {
  console.log('基础搜索:', params)
}`
      }
      break
      
        case 'cache':
      sourceDialogTitle.value = '带缓存功能源码'
      currentSource.value = {
        config: `const cacheSearchConfig = ${JSON.stringify(Object.assign({}, cacheSearchConfig), null, 2)}`,
        template: `<ElementAdvancedSearch
  v-model="cacheSearchParams"
  :search-config="cacheSearchConfig"
  cache-key="user-management-demo"
  quick-search-field="keywords"
  @search="handleCacheSearch"
>
  <template #status="{ model, field }">
    <el-switch
      v-model="model[field]"
      active-text="启用"
      inactive-text="禁用"
    />
  </template>
</ElementAdvancedSearch>`,
        handler: `const cacheSearchParams = ref({})
const handleCacheSearch = (params) => {
  console.log('缓存搜索:', params)
}`
      }
      break
      
        case 'full':
      sourceDialogTitle.value = '完整功能演示源码'
      currentSource.value = {
        config: `const fullSearchConfig = ${JSON.stringify(Object.assign({}, fullSearchConfig), null, 2)}`,
        template: `<ElementAdvancedSearch
  v-model="fullSearchParams"
  :search-config="fullSearchConfig"
  cache-key="full-demo"
  quick-search-field="keywords"
  @search="handleFullSearch"
/>`,
        handler: `const fullSearchParams = ref({})
const handleFullSearch = (params) => {
  console.log('完整搜索:', params)
}`
      }
      break
  }
}

// 完整功能演示
const fullSearchParams = ref({})
const fullSearchConfig = {
  itemsPerRow: 2,
  popoverWidth: 800,
  labelWidth: '100px',
  inline: true,
  formItems: [
    {
      field: 'name',
      label: '姓名',
      type: 'input',
      placeholder: '请输入姓名'
    },
    {
      field: 'age',
      label: '年龄',
      type: 'numberrange',
      min: 0,
      max: 150,
      minPlaceholder: '最小年龄',
      maxPlaceholder: '最大年龄'
    },
    {
      field: 'status',
      label: '状态',
      type: 'select',
      placeholder: '请选择状态',
      multiple: true,
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
        { label: '待审核', value: '2' }
      ]
    },
    {
      field: 'gender',
      label: '性别',
      type: 'radio',
      options: [
        { label: '男', value: '1' },
        { label: '女', value: '2' }
      ]
    },
    {
      field: 'hobby',
      label: '爱好',
      type: 'checkbox',
      options: [
        { label: '读书', value: '1' },
        { label: '游泳', value: '2' },
        { label: '跑步', value: '3' }
      ]
    },
    {
      field: 'birthday',
      label: '生日',
      type: 'date',
      placeholder: '请选择生日',
      // 添加自定义显示函数
      displayValue: (value) => {
        if (value instanceof Date) {
          return value.toLocaleDateString('zh-CN')
        }
        return value
      }
    },
    {
      field: 'registerTime',
      label: '注册时间',
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    },
    {
      field: 'department',
      label: '部门',
      type: 'treeselect',
      placeholder: '请选择部门',
      multiple: true,
      nodeKey: 'id',
      props: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      options: [
        {
          id: '1',
          name: '技术部',
          children: [
            { id: '1-1', name: '前端组' },
            { id: '1-2', name: '后端组' },
            { id: '1-3', name: '测试组' }
          ]
        },
        {
          id: '2',
          name: '销售部',
          children: [
            { id: '2-1', name: '国内销售' },
            { id: '2-2', name: '海外销售' }
          ]
        },
        {
          id: '3',
          name: '人事部'
        }
      ]
    },
    {
      field: 'description',
      label: '描述',
      type: 'textarea',
      placeholder: '请输入描述',
      shortPlaceholder: '简短描述',
      longPlaceholder: '详细描述'
    },
    {
      field: 'salary',
      label: '薪资',
      type: 'number',
      min: 0,
      controlsPosition: 'right',
      placeholder: '请输入薪资'
    }
  ]
}

const handleFullSearch = (params) => {
  fullSearchParams.value = params
  console.log('完整搜索:', params)
}

// 基础用法
const basicSearchParams = ref({})
const basicSearchConfig = {
  formItems: [
    {
      field: 'name',
      label: '姓名',
      type: 'input',
      placeholder: '请输入姓名'
    },
    {
      field: 'status',
      label: '状态',
      type: 'select',
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' }
      ]
    }
  ]
}

const handleBasicSearch = (params) => {
  basicSearchParams.value = params
  console.log('基础搜索:', params)
}

// 带缓存功能
const cacheSearchParams = ref({})
const cacheSearchConfig = {
  itemsPerRow: 2,
  popoverWidth: 800,
  labelWidth: '100px',
  inline: true,
  formItems: [
    {
      field: 'userName',
      label: '用户名称',
      type: 'input',
      placeholder: '请输入用户名称'
    },
    {
      field: 'status',
      label: '状态',
      type: 'custom',
      slotName: 'status',
      default: false,
      // 添加自定义显示函数
      displayValue: (value) => {
        return value ? '启用' : '禁用'
      }
    }
  ]
}

const handleCacheSearch = (params) => {
  cacheSearchParams.value = params
  console.log('缓存搜索:', params)
}
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result {
  margin-top: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.result h3 {
  margin-top: 0;
  color: #333;
}

.result pre {
  margin: 0;
  padding: 12px;
  background-color: #fff;
  border-radius: 4px;
  overflow: auto;
  max-height: 200px;
  white-space: pre-wrap;
  color: #333;
  font-family: 'Courier New', monospace;
}

.source-dialog {
  border-radius: 8px;
}

.source-tabs {
  margin-top: 20px;
}

.source-code {
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
  overflow: auto;
  max-height: 500px;
  white-space: pre-wrap;
  margin: 0;
  color: #333;
  font-family: 'Courier New', monospace;
}

/* 暗色主题样式 */
html.dark .result,
:deep(.dark) .result {
  background-color: var(--el-fill-color-light);
  border: 1px solid var(--el-border-color-light);
}

html.dark .result h3,
:deep(.dark) .result h3 {
  color: var(--el-text-color-primary);
}

html.dark .result pre,
:deep(.dark) .result pre {
  background-color: var(--el-bg-color-page);
  color: var(--el-text-color-primary);
  border: 1px solid var(--el-border-color-light);
}

html.dark .source-code,
:deep(.dark) .source-code {
  background-color: var(--el-fill-color-light);
  color: var(--el-text-color-primary);
  border: 1px solid var(--el-border-color-light);
}

/* 特殊优化：为代码区域提供更好的暗色主题体验 */
html.dark .result pre,
html.dark .source-code,
:deep(.dark) .result pre,
:deep(.dark) .source-code {
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--el-border-color-light);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background-color: var(--el-fill-color-light);
  }
}
</style>