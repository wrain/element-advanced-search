<template>
  <div class="demo">
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>完整功能演示</span>
        </div>
      </template>
      
      <ElementAdvancedSearch
        v-model="fullSearchParams"
        :search-config="fullSearchConfig"
        cache-key="full-demo"
        quick-search-field="keywords"
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
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ElementAdvancedSearch from './ElementAdvancedSearch/index.vue'

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
  console.log('缓存搜索:', params)
}

// 完整功能演示
const fullSearchParams = ref({})

// 模拟远程数据
const loadUserOptions = async () => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
    { label: '用户A', value: 'user_a' },
    { label: '用户B', value: 'user_b' },
    { label: '用户C', value: 'user_c' }
  ]
}

const searchUsers = async (query) => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 模拟搜索结果
  const allUsers = [
    { label: '用户A', value: 'user_a' },
    { label: '用户B', value: 'user_b' },
    { label: '用户C', value: 'user_c' },
    { label: '管理员A', value: 'admin_a' },
    { label: '管理员B', value: 'admin_b' }
  ]
  
  if (!query) {
    return allUsers
  }
  
  return allUsers.filter(user => user.label.includes(query))
}

const fullSearchConfig = {
  itemsPerRow: 2,
  popoverWidth: 800,
  labelWidth: '80px',
  inline: true,
  formItems: [
    {
      field: 'userName',
      label: '用户名称',
      type: 'input',
      placeholder: '请输入用户名称'
    },
    {
      field: 'userIds',
      label: '用户ID',
      type: 'textarea',
      shortPlaceholder: '请输入用户ID,回车可换行',
      longPlaceholder: '请输入用户ID,支持多个值，请回车分隔，可输入多行文本'
    },
    {
      field: 'phone',
      label: '手机号码',
      type: 'input',
      placeholder: '请输入手机号码'
    },
    {
      field: 'status',
      label: '用户状态',
      type: 'select',
      placeholder: '请选择用户状态',
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' }
      ]
    },
    {
      field: 'assignUser',
      label: '指派用户',
      type: 'select',
      placeholder: '请选择指派用户',
      filterable: true,
      remote: true,
      remoteMethod: searchUsers,
      loadOptions: loadUserOptions
    },
    {
      field: 'gender',
      label: '性别',
      type: 'radio',
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
        { label: '未知', value: 'unknown' }
      ]
    },
    {
      field: 'hobbies',
      label: '爱好',
      type: 'checkbox',
      default: [],
      options: [
        { label: '读书', value: 'reading' },
        { label: '游泳', value: 'swimming' },
        { label: '跑步', value: 'running' }
      ]
    },
    {
      field: 'department',
      label: '部门',
      type: 'treeselect',
      placeholder: '请选择部门',
      multiple: true,
      showCheckbox: true,
      maxDropdownHeight: 400,
      filterable: true,
      options: [
        {
          value: 'dept_1',
          label: '技术部',
          children: [
            { value: 'dept_1_1', label: '前端组' },
            { value: 'dept_1_2', label: '后端组' },
            { value: 'dept_1_3', label: '测试组' }
          ]
        },
        {
          value: 'dept_2',
          label: '销售部',
          children: [
            { value: 'dept_2_1', label: '国内销售' },
            { value: 'dept_2_2', label: '国际销售' }
          ]
        },
        {
          value: 'dept_3',
          label: '人事部'
        }
      ]
    },
    {
      field: 'createTime',
      label: '创建时间',
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期'
    },
    {
      field: 'userType',
      label: '用户类型',
      type: 'select',
      multiple: true,
      placeholder: '请选择用户类型',
      options: [
        { label: '管理员', value: 'admin' },
        { label: '普通用户', value: 'user' },
        { label: '访客', value: 'guest' }
      ]
    },
    {
      field: 'age',
      label: '年龄范围',
      type: 'numberrange',
      min: 0,
      max: 150,
      minPlaceholder: '最小年龄',
      maxPlaceholder: '最大年龄'
    }
  ]
}

const handleFullSearch = (params) => {
  console.log('完整搜索:', params)
}
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-card {
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.result h3 {
  margin-top: 0;
}

.result pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>