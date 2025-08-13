<template>
  <div class="demo-container">
    <!-- 左侧导航区域 -->
    <el-affix class="sidebar-affix">
      <div class="sidebar">
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          @select="handleMenuSelect"
        >
          <el-menu-item index="demos">
            <el-icon><Monitor /></el-icon>
            <span>功能演示</span>
          </el-menu-item>
          <el-menu-item index="full-demo" class="submenu-item">
            <span>完整功能演示</span>
          </el-menu-item>
          <el-menu-item index="basic-demo" class="submenu-item">
            <span>基础用法</span>
          </el-menu-item>
          <el-menu-item index="cache-demo" class="submenu-item">
            <span>带缓存功能</span>
          </el-menu-item>
          <el-menu-item index="custom-tags-demo" class="submenu-item">
            <span>自定义搜索结果显示位置</span>
          </el-menu-item>
          <el-menu-item index="api">
            <el-icon><Document /></el-icon>
            <span>API 文档</span>
          </el-menu-item>
          <el-menu-item index="props" class="submenu-item">
            <span>Props 属性</span>
          </el-menu-item>
          <el-menu-item index="events" class="submenu-item">
            <span>Events 事件</span>
          </el-menu-item>
          <el-menu-item index="search-config" class="submenu-item">
            <span>SearchConfig 配置</span>
          </el-menu-item>
          <el-menu-item index="form-item" class="submenu-item">
            <span>FormItem 配置</span>
          </el-menu-item>
          <el-menu-item index="select-option" class="submenu-item">
            <span>SelectOption 配置</span>
          </el-menu-item>
          <el-menu-item index="slots">
            <el-icon><Grid /></el-icon>
            <span>Slots 插槽</span>
          </el-menu-item>
          <el-menu-item index="usage">
            <el-icon><Operation /></el-icon>
            <span>使用说明</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-affix>

    <!-- 右侧内容区域 -->
    <div class="main-content">
      <!-- 功能演示部分 -->
      <div v-if="activeMenu === 'full-demo' || activeMenu === 'demos'" class="content-section">
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
            quick-search-placeholder="请输入用户名或邮箱"
            @search="handleFullSearch"
          />
          
          <el-tabs v-model="activeFullDemoTab" class="demo-tabs">
            <el-tab-pane label="搜索结果" name="result">
              <pre class="source-code">{{ formatSearchParams(fullSearchParams) }}</pre>
            </el-tab-pane>
            <el-tab-pane label="配置代码" name="config">
              <pre class="source-code">{{ fullSource.config }}</pre>
            </el-tab-pane>
            <el-tab-pane label="模板代码" name="template">
              <pre class="source-code">{{ fullSource.template }}</pre>
            </el-tab-pane>
            <el-tab-pane label="处理函数" name="handler">
              <pre class="source-code">{{ fullSource.handler }}</pre>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>

      <div v-if="activeMenu === 'basic-demo' || activeMenu === 'demos'" class="content-section">
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
          
          <el-tabs v-model="activeBasicDemoTab" class="demo-tabs">
            <el-tab-pane label="搜索结果" name="result">
              <pre class="source-code">{{ formatSearchParams(basicSearchParams) }}</pre>
            </el-tab-pane>
            <el-tab-pane label="配置代码" name="config">
              <pre class="source-code">{{ basicSource.config }}</pre>
            </el-tab-pane>
            <el-tab-pane label="模板代码" name="template">
              <pre class="source-code">{{ basicSource.template }}</pre>
            </el-tab-pane>
            <el-tab-pane label="处理函数" name="handler">
              <pre class="source-code">{{ basicSource.handler }}</pre>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>

            <div v-if="activeMenu === 'cache-demo' || activeMenu === 'demos'" class="content-section">
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
              <el-rate
                v-model="model[field]"
                :max="5"
                :allow-half="true"
                :show-text="true"
                :texts="['极差', '失望', '一般', '满意', '惊喜']"
              />
            </template>
          </ElementAdvancedSearch>
          
          <el-tabs v-model="activeCacheDemoTab" class="demo-tabs">
            <el-tab-pane label="搜索结果" name="result">
              <pre class="source-code">{{ formatSearchParams(cacheSearchParams) }}</pre>
            </el-tab-pane>
            <el-tab-pane label="配置代码" name="config">
              <pre class="source-code">{{ cacheSource.config }}</pre>
            </el-tab-pane>
            <el-tab-pane label="模板代码" name="template">
              <pre class="source-code">{{ cacheSource.template }}</pre>
            </el-tab-pane>
            <el-tab-pane label="处理函数" name="handler">
              <pre class="source-code">{{ cacheSource.handler }}</pre>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>

            <!-- 自定义标签显示位置示例 -->
      <div v-if="activeMenu === 'custom-tags-demo' || activeMenu === 'demos'" class="content-section">
        <el-card class="demo-card">
          <template #header>
            <div class="card-header">
              <span>自定义搜索结果显示位置</span>
            </div>
          </template>

          <el-alert
            type="info"
            :closable="false"
            style="margin-bottom: 20px;"
          >
            通过设置 <code>teleport-to</code> 属性，可以将搜索结果显示在页面任意位置，这样你可以更加自由的布局页面。
          </el-alert>

          <!-- 外部容器用于显示搜索标签 - 这是真正的自定义位置 -->
          <div id="custom-tags-container">
            <div style="min-height: 40px;">
              <!-- 标签将通过 Teleport 显示在此处 -->
            </div>
          </div>

          <!-- 搜索组件，使用 teleportTo 属性 -->
          <ElementAdvancedSearch
            v-model="customTagsSearchParams"
            :search-config="customTagsSearchConfig"
            teleport-to="#custom-tags-container div"
            @search="handleCustomTagsSearch"
          />
          
          <el-tabs v-model="activeCustomTagsDemoTab" class="demo-tabs">
            <el-tab-pane label="搜索结果" name="result">
              <pre class="source-code">{{ formatSearchParams(customTagsSearchParams) }}</pre>
            </el-tab-pane>
            <el-tab-pane label="配置代码" name="config">
              <pre class="source-code">{{ customTagsSource.config }}</pre>
            </el-tab-pane>
            <el-tab-pane label="模板代码" name="template">
              <pre class="source-code">{{ customTagsSource.template }}</pre>
            </el-tab-pane>
            <el-tab-pane label="处理函数" name="handler">
              <pre class="source-code">{{ customTagsSource.handler }}</pre>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>

      <!-- API 文档部分 -->
      <div v-if="activeMenu === 'api' || activeMenu === 'props'" class="content-section">
        <el-card class="doc-card">
          <template #header>
            <div class="card-header">
              <span>Props 属性</span>
            </div>
          </template>
          
          <div class="doc-content">
            <el-table :data="propsData" stripe style="width: 100%">
              <el-table-column prop="name" label="属性名" width="180" />
              <el-table-column prop="type" label="类型" width="150" />
              <el-table-column prop="default" label="默认值" width="120" />
              <el-table-column prop="required" label="是否必填" width="100">
                <template #default="scope">
                  <el-tag :type="scope.row.required ? 'danger' : 'success'">
                    {{ scope.row.required ? '是' : '否' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="description" label="说明" />
            </el-table>
          </div>
        </el-card>
      </div>

      <div v-if="activeMenu === 'events'" class="content-section">
        <el-card class="doc-card">
          <template #header>
            <div class="card-header">
              <span>Events 事件</span>
            </div>
          </template>
          
          <div class="doc-content">
            <el-table :data="eventsData" stripe style="width: 100%">
              <el-table-column prop="name" label="事件名" width="180" />
              <el-table-column prop="params" label="参数" width="200" />
              <el-table-column prop="description" label="说明" />
            </el-table>
          </div>
        </el-card>
      </div>

      <div v-if="activeMenu === 'search-config'" class="content-section">
        <el-card class="doc-card">
          <template #header>
            <div class="card-header">
              <span>SearchConfig 配置项</span>
            </div>
          </template>
          
          <div class="doc-content">
            <h3>基础配置</h3>
            <el-table :data="searchConfigData" stripe style="width: 100%">
              <el-table-column prop="name" label="属性名" width="180" />
              <el-table-column prop="type" label="类型" width="150" />
              <el-table-column prop="default" label="默认值" width="120" />
              <el-table-column prop="description" label="说明" />
            </el-table>
            
            <h3 style="margin-top: 30px;">示例</h3>
            <pre class="code-block">{{ searchConfigExample }}</pre>
          </div>
        </el-card>
      </div>

      <div v-if="activeMenu === 'form-item'" class="content-section">
        <el-card class="doc-card">
          <template #header>
            <div class="card-header">
              <span>FormItem 配置项</span>
            </div>
          </template>
          
          <div class="doc-content">
            <h3>基础属性</h3>
            <el-table :data="formItemBaseData" stripe style="width: 100%">
              <el-table-column prop="name" label="属性名" width="180" />
              <el-table-column prop="type" label="类型" width="150" />
              <el-table-column prop="required" label="是否必填" width="100">
                <template #default="scope">
                  <el-tag :type="scope.row.required ? 'danger' : 'success'">
                    {{ scope.row.required ? '是' : '否' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="description" label="说明" />
            </el-table>
            
            <h3 style="margin-top: 30px;">各类型特定属性</h3>
            <div class="type-props">
              <el-collapse>
                <el-collapse-item title="Input 类型 (type: 'input')" name="input">
                  <el-table :data="inputPropsData" stripe style="width: 100%">
                    <el-table-column prop="name" label="属性名" width="180" />
                    <el-table-column prop="type" label="类型" width="150" />
                    <el-table-column prop="default" label="默认值" width="120" />
                    <el-table-column prop="description" label="说明" />
                  </el-table>
                </el-collapse-item>
                <el-collapse-item title="Select 类型 (type: 'select')" name="select">
                  <el-table :data="selectPropsData" stripe style="width: 100%">
                    <el-table-column prop="name" label="属性名" width="180" />
                    <el-table-column prop="type" label="类型" width="150" />
                    <el-table-column prop="default" label="默认值" width="120" />
                    <el-table-column prop="description" label="说明" />
                  </el-table>
                </el-collapse-item>
                <el-collapse-item title="Date 类型 (type: 'date')" name="date">
                  <el-table :data="datePropsData" stripe style="width: 100%">
                    <el-table-column prop="name" label="属性名" width="180" />
                    <el-table-column prop="type" label="类型" width="150" />
                    <el-table-column prop="default" label="默认值" width="120" />
                    <el-table-column prop="description" label="说明" />
                  </el-table>
                </el-collapse-item>
                <el-collapse-item title="其他类型" name="other">
                  <p>组件支持多种表单类型，包括: input, textarea, select, treeselect, radio, checkbox, date, daterange, time, timerange, number, numberrange, custom</p>
                  <p>每种类型都有其特定的配置属性，具体可参考使用说明部分的详细文档。</p>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </el-card>
      </div>

      <div v-if="activeMenu === 'select-option'" class="content-section">
        <el-card class="doc-card">
          <template #header>
            <div class="card-header">
              <span>SelectOption 配置项</span>
            </div>
          </template>
          
          <div class="doc-content">
            <el-table :data="selectOptionData" stripe style="width: 100%">
              <el-table-column prop="name" label="属性名" width="180" />
              <el-table-column prop="type" label="类型" width="150" />
              <el-table-column prop="required" label="是否必填" width="100">
                <template #default="scope">
                  <el-tag :type="scope.row.required ? 'danger' : 'success'">
                    {{ scope.row.required ? '是' : '否' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="description" label="说明" />
            </el-table>
            
            <h3 style="margin-top: 30px;">示例</h3>
            <pre class="code-block">{{ selectOptionExample }}</pre>
          </div>
        </el-card>
      </div>

      <div v-if="activeMenu === 'slots'" class="content-section">
        <el-card class="doc-card">
          <template #header>
            <div class="card-header">
              <span>Slots 插槽</span>
            </div>
          </template>
          
          <div class="doc-content">
            <el-table :data="slotsData" stripe style="width: 100%">
              <el-table-column prop="name" label="插槽名" width="180" />
              <el-table-column prop="description" label="说明" />
              <el-table-column prop="scope" label="作用域参数" width="200" />
            </el-table>
            
            <h3 style="margin-top: 30px;">使用示例</h3>
            <pre class="code-block">{{ slotsExample }}</pre>
          </div>
        </el-card>
      </div>

      <div v-if="activeMenu === 'usage'" class="content-section">
        <el-card class="doc-card">
          <template #header>
            <div class="card-header">
              <span>使用说明</span>
            </div>
          </template>
          
          <div class="instructions">
            <h3>组件特性</h3>
            <ul>
              <li><strong>🚀 快速搜索</strong>：提供简单的关键词搜索功能</li>
              <li><strong>🎛️ 高级筛选</strong>：支持多种表单控件的复杂筛选条件</li>
              <li><strong>💾 搜索条件缓存</strong>：可将搜索条件保存到 localStorage 中</li>
              <li><strong>🧩 自定义插槽</strong>：支持完全自定义的表单控件</li>
              <li><strong>🏷️ 搜索标签显示</strong>：自动显示当前搜索条件的标签</li>
              <li><strong>📱 响应式布局</strong>：支持多种屏幕尺寸的自适应显示</li>
              <li><strong>🌐 远程数据支持</strong>：支持远程搜索和异步数据加载</li>
              <li><strong>📝 多种表单控件</strong>：支持输入框、选择框、日期选择器、数字输入框等多种表单控件</li>
              <li><strong>⚙️ Element Plus 属性透传</strong>：可通过 elProps 属性为不同组件类型传递特定属性</li>
            </ul>
            
            <h3>使用方法</h3>
            <ol>
              <li>安装组件：<code>npm install element-advanced-search</code></li>
              <li>引入组件：<code>import ElementAdvancedSearch from 'element-advanced-search'</code></li>
              <li>导入样式：<code>import 'element-advanced-search/dist/style.css'</code></li>
              <li>定义配置：<code>const searchConfig = { formItems: [...] }</code></li>
              <li>使用组件：
                <pre><code>&lt;ElementAdvancedSearch
  v-model="searchParams"
  :search-config="searchConfig"
  cache-key="user-search"
  quick-search-field="keywords"
  @search="handleSearch"
/&gt;</code></pre>
              </li>
            </ol>
            
            <h3>关键配置项</h3>
            <ul>
              <li><strong>searchConfig</strong>：搜索配置对象，包含formItems等配置</li>
              <li><strong>formItems</strong>：定义表单项，支持多种类型（input、select、date、daterange、number、numberrange、time、timerange、radio、checkbox、treeselect、textarea、custom）</li>
              <li><strong>elProps</strong>：透传Element Plus组件的原生属性，可以是对象或函数</li>
              <li><strong>displayValue</strong>：自定义搜索标签的显示值</li>
              <li><strong>cache-key</strong>：设置缓存键名，启用搜索条件缓存</li>
              <li><strong>quick-search-field</strong>：快速搜索字段名</li>
            </ul>
            
            <h3>支持的表单控件类型</h3>
            <ul>
              <li><strong>input</strong>：文本输入框</li>
              <li><strong>textarea</strong>：文本域，支持自动扩展</li>
              <li><strong>select</strong>：下拉选择框，支持单选/多选、远程搜索</li>
              <li><strong>treeselect</strong>：树形选择框</li>
              <li><strong>radio</strong>：单选框</li>
              <li><strong>checkbox</strong>：复选框</li>
              <li><strong>date</strong>：日期选择器</li>
              <li><strong>daterange</strong>：日期范围选择器</li>
              <li><strong>time</strong>：时间选择器</li>
              <li><strong>timerange</strong>：时间范围选择器</li>
              <li><strong>number</strong>：数字输入框</li>
              <li><strong>numberrange</strong>：数字范围输入框</li>
              <li><strong>custom</strong>：自定义插槽类型</li>
            </ul>
            
            <h3>TypeScript 支持</h3>
            <p>组件提供完整的 TypeScript 类型支持：</p>
            <pre><code>import type { SearchConfig } from 'element-advanced-search'

const searchConfig: SearchConfig = {
  itemsPerRow: 2,
  popoverWidth: 800,
  labelWidth: '100px',
  inline: true,
  formItems: [
    // 表单配置项
  ]
}</code></pre>
            
            <h3>项目链接</h3>
            <p>在 GitHub 上查看项目源码和详细文档：</p>
            <p>
              <el-link type="primary" href="https://github.com/wrain/element-advanced-search" target="_blank">
                GitHub 项目地址
              </el-link>
            </p>
          </div>
        </el-card>
      </div>
    </div>

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
import { ref, reactive } from 'vue'
import ElementAdvancedSearch from './ElementAdvancedSearch/index.vue'
import { Monitor, Document, Grid, Operation } from '@element-plus/icons-vue'

// 菜单激活项
const activeMenu = ref('demos')

// 处理菜单选择
const handleMenuSelect = (index) => {
  activeMenu.value = index
}

// 源码展示相关
const sourceDialogVisible = ref(false)
const sourceDialogTitle = ref('')
const activeSourceTab = ref('config')
const currentSource = ref({})

// 格式化搜索参数显示
const formatSearchParams = (params) => {
  try {
    return JSON.stringify(params, null, 2)
  } catch (e) {
    return String(params)
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
      placeholder: '请输入姓名',
      // 示例：为input组件添加Element Plus原生属性
      elProps: {
        prefixIcon: 'User',
        clearable: true,
        maxlength: 20,
        showWordLimit: true
      }
    },
    {
      field: 'age',
      label: '年龄',
      type: 'numberrange',
      min: 0,
      max: 150,
      minPlaceholder: '最小年龄',
      maxPlaceholder: '最大年龄',
      // 示例：为input-number组件添加原生属性
      elProps: {
        step: 1,
        controlsPosition: 'right'
      }
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
      ],
      // 示例：为select组件添加原生属性
      elProps: {
        filterable: true,
        clearable: true,
        collapseTags: true,
        maxCollapseTags: 2,
        onChange: (value) => {
          alert('触发了select的change事件')
        }
      }
    },
    {
      field: 'gender',
      label: '性别',
      type: 'radio',
      options: [
        { label: '男', value: '1' },
        { label: '女', value: '2' }
      ],
      // 示例：为radio组件添加原生属性
      elProps: (elType) => {
        if (elType === 'radioGroup') {
          return {
            size: 'small'
          }
        } else if (elType === 'radio') {
          return {
            border: true
          }
        }
        return {}
      }
    },
    {
      field: 'hobby',
      label: '爱好',
      type: 'checkbox',
      options: [
        { label: '读书', value: '1' },
        { label: '游泳', value: '2' },
        { label: '跑步', value: '3' }
      ],
      // 示例：为checkbox组件添加原生属性
      elProps: (elType) => {
        if (elType === 'checkboxGroup') {
          return {
            size: 'small'
          }
        } else if (elType === 'checkbox') {
          return {
            border: true
          }
        }
        return {}
      }
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
      },
      // 示例：为date-picker组件添加原生属性
      elProps: {
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
        editable: false
      }
    },
    {
      field: 'registerTime',
      label: '注册时间',
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      // 示例：为date-picker组件添加原生属性
      elProps: {
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
        editable: false,
        unlinkPanels: true
      }
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
      ],
      // 示例：为tree-select组件添加原生属性
      elProps: {
        filterable: true,
        checkStrictly: true,
        renderAfterExpand: false,
        collapseTags: true,
        maxCollapseTags: 2
      }
    },
    {
      field: 'description',
      label: '描述',
      type: 'textarea',
      placeholder: '请输入描述',
      shortPlaceholder: '简短描述',
      longPlaceholder: '详细描述',
      // 示例：为textarea组件添加原生属性
      elProps: {
        maxlength: 200,
        showWordLimit: true,
        resize: 'vertical'
      }
    },
    {
      field: 'salary',
      label: '薪资',
      type: 'number',
      min: 0,
      controlsPosition: 'right',
      placeholder: '请输入薪资',
      // 示例：为input-number组件添加原生属性
      elProps: {
        step: 1000,
        precision: 2
      }
    },
    {
      field: 'workTime',
      label: '工作时间',
      type: 'time',
      placeholder: '请选择工作时间',
      // 示例：为time-picker组件添加原生属性
      elProps: {
        format: 'HH:mm',
        'value-format': 'HH:mm',
        clearable: true,
        editable: false
      }
    },
    {
      field: 'workTimeRange',
      label: '工作时间段',
      type: 'timerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      // 示例：为time-picker组件添加原生属性
      elProps: {
        format: 'HH:mm',
        'value-format': 'HH:mm',
        clearable: true,
        editable: false,
        unlinkPanels: true
      }
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
      placeholder: '请输入姓名',
      // 示例：为input组件添加Element Plus原生属性
      elProps: {
        prefixIcon: 'User',
        clearable: true
      }
    },
    {
      field: 'status',
      label: '状态',
      type: 'select',
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' }
      ],
      // 示例：为select组件添加原生属性
      elProps: {
        filterable: true,
        clearable: true
      }
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
      placeholder: '请输入用户名称',
      // 示例：为input组件添加Element Plus原生属性
      elProps: {
        prefixIcon: 'User',
        clearable: true
      }
    },
    {
      field: 'status',
      label: '用户满意度',
      type: 'custom',
      slotName: 'status',
      default: 0,
      // 添加自定义显示函数
      displayValue: (value) => {
        const texts = ['极差', '失望', '一般', '满意', '惊喜']
        const index = Math.floor(value) - 1
        return value > 0 ? `${value}星(${texts[index] || '未知'})` : '未评分'
      }
    }
  ]
}

const handleCacheSearch = (params) => {
  cacheSearchParams.value = params
  console.log('缓存搜索:', params)
}

// 自定义标签显示位置
const customTagsSearchParams = ref({})
const customTagsDisplay = ref([]) // 用于在自定义位置显示的标签

const customTagsSearchConfig = {
  itemsPerRow: 2,
  popoverWidth: 800,
  labelWidth: '100px',
  inline: true,
  formItems: [
    {
      field: 'productName',
      label: '产品名称',
      type: 'input',
      placeholder: '请输入产品名称',
      elProps: {
        prefixIcon: 'Search',
        clearable: true
      }
    },
    {
      field: 'category',
      label: '产品分类',
      type: 'select',
      placeholder: '请选择产品分类',
      multiple: true,
      options: [
        { label: '电子产品', value: '1' },
        { label: '家居用品', value: '2' },
        { label: '服装鞋帽', value: '3' },
        { label: '食品饮料', value: '4' }
      ],
      elProps: {
        filterable: true,
        clearable: true
      }
    },
    {
      field: 'priceRange',
      label: '价格区间',
      type: 'numberrange',
      min: 0,
      max: 99999,
      minPlaceholder: '最低价',
      maxPlaceholder: '最高价',
      elProps: {
        step: 10,
        controlsPosition: 'right'
      }
    },
    {
      field: 'onSale',
      label: '是否促销',
      type: 'radio',
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '0' }
      ]
    }
  ]
}

const handleCustomTagsSearch = (params) => {
  customTagsSearchParams.value = params
  console.log('自定义标签位置搜索:', params)
  
  // 更新自定义位置显示的标签
  updateCustomTagsDisplay(params)
}

// 更新自定义位置的标签显示
const updateCustomTagsDisplay = (searchParams) => {
  try {
    const tags = []
    
    // 处理各个搜索字段
    for (const item of customTagsSearchConfig.formItems) {
      const value = searchParams[item.field]
      // 只有当值存在且不为空时才添加标签
      if (value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0)) {
        // 特别处理数字范围类型
        if (item.type === 'numberrange') {
          if (Array.isArray(value) && (value[0] !== null || value[1] !== null)) {
            tags.push({
              key: item.field,
              label: item.label,
              value
            })
          }
        } else {
          tags.push({
            key: item.field,
            label: item.label,
            value
          })
        }
      }
    }
    
    customTagsDisplay.value = tags
  } catch (e) {
    console.error('Error updating custom tags display:', e)
    customTagsDisplay.value = []
  }
}

// 处理自定义标签关闭
const handleCustomTagClose = (key) => {
  // 创建新的搜索参数，移除指定的键
  const newParams = { ...customTagsSearchParams.value }
  delete newParams[key]
  
  // 更新搜索参数和显示标签
  customTagsSearchParams.value = newParams
  updateCustomTagsDisplay(newParams)
  
  // 如果使用了缓存功能，还需要更新缓存
  // 这里为了简化示例没有实现缓存逻辑
}

// 处理清除所有标签
const handleCustomClearAll = () => {
  customTagsSearchParams.value = {}
  customTagsDisplay.value = []
}


// API 文档数据
const propsData = ref([
  { name: 'searchConfig', type: 'SearchConfig', default: '-', required: true, description: '搜索配置对象' },
  { name: 'quickSearchField', type: 'string', default: 'keyword', required: false, description: '快速搜索字段名' },
  { name: 'quickSearchPlaceholder', type: 'string', default: '请输入搜索关键词', required: false, description: '快速搜索占位符' },
  { name: 'modelValue', type: 'Record<string, any>', default: '{}', required: false, description: 'v-model 绑定值' },
  { name: 'cacheKey', type: 'string', default: '', required: false, description: '缓存键名，用于区分不同页面的搜索条件' }
])

const eventsData = ref([
  { name: 'search', params: '(value: Record<string, any>)', description: '搜索事件，返回搜索参数' },
  { name: 'update:modelValue', params: '(value: Record<string, any>)', description: 'v-model 更新事件' }
])

const searchConfigData = ref([
  { name: 'itemsPerRow', type: 'number', default: '2', description: '每行显示的表单项数量' },
  { name: 'popoverWidth', type: 'number', default: '800', description: '高级搜索弹出层宽度' },
  { name: 'labelWidth', type: 'string', default: '100px', description: '表单项标签宽度' },
  { name: 'inline', type: 'boolean', default: 'true', description: '是否使用内联表单布局' },
  { name: 'formItems', type: 'FormItem[]', default: '[]', description: '表单项配置数组' }
])

const searchConfigExample = ref(`const searchConfig = {
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
    }
  ]
}`)

const formItemBaseData = ref([
  { name: 'field', type: 'string', required: true, description: '字段名' },
  { name: 'label', type: 'string', required: true, description: '标签名' },
  { name: 'type', type: 'string', required: false, description: '表单控件类型，默认为 \'input\'' },
  { name: 'default', type: 'any', required: false, description: '默认值' },
  { name: 'hidden', type: 'boolean', required: false, description: '是否隐藏该表单项' },
  { name: 'displayValue', type: 'Function', required: false, description: '自定义标签显示函数' },
  { name: 'elProps', type: 'Object/Function', required: false, description: '透传给 Element Plus 组件的属性，可为对象或函数' }
])

const inputPropsData = ref([
  { name: 'placeholder', type: 'string', default: '请输入${label}', description: '占位符文本' },
  { name: 'clearable', type: 'boolean', default: 'true', description: '是否可清空' }
])

const selectPropsData = ref([
  { name: 'placeholder', type: 'string', default: '请选择${label}', description: '占位符文本' },
  { name: 'clearable', type: 'boolean', default: 'true', description: '是否可清空' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否多选' },
  { name: 'filterable', type: 'boolean', default: 'false', description: '是否可过滤' },
  { name: 'remote', type: 'boolean', default: 'false', description: '是否远程搜索' },
  { name: 'remoteMethod', type: 'Function', default: 'undefined', description: '远程搜索方法' },
  { name: 'loadOptions', type: 'Function', default: 'undefined', description: '异步加载选项方法' },
  { name: 'options', type: 'SelectOption[]', default: '[]', description: '选项列表' }
])

const datePropsData = ref([
  { name: 'placeholder', type: 'string', default: '请选择${label}', description: '占位符文本' },
  { name: 'clearable', type: 'boolean', default: 'true', description: '是否可清空' }
])

const selectOptionData = ref([
  { name: 'label', type: 'string', required: true, description: '选项标签' },
  { name: 'value', type: 'any', required: true, description: '选项值' },
  { name: 'children', type: 'SelectOption[]', required: false, description: '子选项（用于树形结构）' }
])

const selectOptionExample = ref(`const options = [
  { label: '启用', value: '0' },
  { label: '禁用', value: '1' },
  {
    label: '技术部',
    value: 'tech',
    children: [
      { label: '前端组', value: 'frontend' },
      { label: '后端组', value: 'backend' }
    ]
  }
]`)

const slotsData = ref([
  { name: 'default', description: '自定义表单项插槽', scope: '{ model, field }' }
])

const slotsExample = ref(`<ElementAdvancedSearch
  v-model="searchParams"
  :search-config="searchConfig"
>
  <template #status="{ model, field }">
    <el-switch
      v-model="model[field]"
      active-text="启用"
      inactive-text="禁用"
    />
  </template>
</ElementAdvancedSearch>`)


// Tab切换控制
const activeFullDemoTab = ref('result')
const activeBasicDemoTab = ref('result')
const activeCacheDemoTab = ref('result')
const activeCustomTagsDemoTab = ref('result') // 添加这一行

const activeFullSourceTab = ref('config')
const activeBasicSourceTab = ref('config')
const activeCacheSourceTab = ref('config')
const activeCustomTagsSourceTab = ref('config') // 添加这一行

// 源码数据
const fullSource = reactive({
  config: `const fullSearchConfig = {
  itemsPerRow: 2,
  popoverWidth: 800,
  labelWidth: '100px',
  inline: true,
  formItems: [
    {
      field: 'name',
      label: '姓名',
      type: 'input',
      placeholder: '请输入姓名',
      // 示例：为input组件添加Element Plus原生属性
      elProps: {
        prefixIcon: 'User',
        clearable: true,
        maxlength: 20,
        showWordLimit: true
      }
    },
    {
      field: 'age',
      label: '年龄',
      type: 'numberrange',
      min: 0,
      max: 150,
      minPlaceholder: '最小年龄',
      maxPlaceholder: '最大年龄',
      // 示例：为input-number组件添加原生属性
      elProps: {
        step: 1,
        controlsPosition: 'right'
      }
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
      ],
      // 示例：为select组件添加原生属性
      elProps: {
        filterable: true,
        clearable: true,
        collapseTags: true,
        maxCollapseTags: 2,
        onChange: (value) => {
          alert('触发了select的change事件')
        }
      }
    },
    {
      field: 'gender',
      label: '性别',
      type: 'radio',
      options: [
        { label: '男', value: '1' },
        { label: '女', value: '2' }
      ],
      // 示例：为radio组件添加原生属性
      elProps: (elType) => {
        if (elType === 'radioGroup') {
          return {
            size: 'small'
          }
        } else if (elType === 'radio') {
          return {
            border: true
          }
        }
        return {}
      }
    },
    {
      field: 'hobby',
      label: '爱好',
      type: 'checkbox',
      options: [
        { label: '读书', value: '1' },
        { label: '游泳', value: '2' },
        { label: '跑步', value: '3' }
      ],
      // 示例：为checkbox组件添加原生属性
      elProps: (elType) => {
        if (elType === 'checkboxGroup') {
          return {
            size: 'small'
          }
        } else if (elType === 'checkbox') {
          return {
            border: true
          }
        }
        return {}
      }
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
      },
      // 示例：为date-picker组件添加原生属性
      elProps: {
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
        editable: false
      }
    },
    {
      field: 'registerTime',
      label: '注册时间',
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      // 示例：为date-picker组件添加原生属性
      elProps: {
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
        editable: false,
        unlinkPanels: true
      }
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
      ],
      // 示例：为tree-select组件添加原生属性
      elProps: {
        filterable: true,
        checkStrictly: true,
        renderAfterExpand: false,
        collapseTags: true,
        maxCollapseTags: 2
      }
    },
    {
      field: 'description',
      label: '描述',
      type: 'textarea',
      placeholder: '请输入描述',
      shortPlaceholder: '简短描述',
      longPlaceholder: '详细描述',
      // 示例：为textarea组件添加原生属性
      elProps: {
        maxlength: 200,
        showWordLimit: true,
        resize: 'vertical'
      }
    },
    {
      field: 'salary',
      label: '薪资',
      type: 'number',
      min: 0,
      controlsPosition: 'right',
      placeholder: '请输入薪资',
      // 示例：为input-number组件添加原生属性
      elProps: {
        step: 1000,
        precision: 2
      }
    },
    {
      field: 'workTime',
      label: '工作时间',
      type: 'time',
      placeholder: '请选择工作时间',
      // 示例：为time-picker组件添加原生属性
      elProps: {
        format: 'HH:mm',
        'value-format': 'HH:mm',
        clearable: true,
        editable: false
      }
    },
    {
      field: 'workTimeRange',
      label: '工作时间段',
      type: 'timerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      // 示例：为time-picker组件添加原生属性
      elProps: {
        format: 'HH:mm',
        'value-format': 'HH:mm',
        clearable: true,
        editable: false,
        unlinkPanels: true
      }
    }
  ]
}`,
  template: `<ElementAdvancedSearch
  v-model="fullSearchParams"
  :search-config="fullSearchConfig"
  cache-key="full-demo"
  quick-search-field="keywords"
  quick-search-placeholder="请输入用户名或邮箱"
  @search="handleFullSearch"
/>`,
  handler: `const fullSearchParams = ref({})
const handleFullSearch = (params) => {
  fullSearchParams.value = params
  console.log('完整搜索:', params)
}`
})

const basicSource = reactive({
  config: `const basicSearchConfig = {
  formItems: [
    {
      field: 'name',
      label: '姓名',
      type: 'input',
      placeholder: '请输入姓名',
      // 示例：为input组件添加Element Plus原生属性
      elProps: {
        prefixIcon: 'User',
        clearable: true
      }
    },
    {
      field: 'status',
      label: '状态',
      type: 'select',
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' }
      ],
      // 示例：为select组件添加原生属性
      elProps: {
        filterable: true,
        clearable: true
      }
    }
  ]
}`,
  template: `<ElementAdvancedSearch
  v-model="basicSearchParams"
  :search-config="basicSearchConfig"
  @search="handleBasicSearch"
/>`,
  handler: `const basicSearchParams = ref({})
const handleBasicSearch = (params) => {
  basicSearchParams.value = params
  console.log('基础搜索:', params)
}`
})

const cacheSource = reactive({
  config: `const cacheSearchConfig = {
  itemsPerRow: 2,
  popoverWidth: 800,
  labelWidth: '100px',
  inline: true,
  formItems: [
    {
      field: 'userName',
      label: '用户名称',
      type: 'input',
      placeholder: '请输入用户名称',
      // 示例：为input组件添加Element Plus原生属性
      elProps: {
        prefixIcon: 'User',
        clearable: true
      }
    },
    {
      field: 'status',
      label: '用户满意度',
      type: 'custom',
      slotName: 'status',
      default: 0,
      // 添加自定义显示函数
      displayValue: (value) => {
        const texts = ['极差', '失望', '一般', '满意', '惊喜']
        const index = Math.floor(value) - 1
        return value > 0 ? \`\${value}星(\${texts[index] || '未知'})\` : '未评分'
      }
    }
  ]
}`,
  template: `<ElementAdvancedSearch
  v-model="cacheSearchParams"
  :search-config="cacheSearchConfig"
  cache-key="user-management-demo"
  quick-search-field="keywords"
  @search="handleCacheSearch"
>
  <template #status="{ model, field }">
    <el-rate
      v-model="model[field]"
      :max="5"
      :allow-half="true"
      :show-text="true"
      :texts="['极差', '失望', '一般', '满意', '惊喜']"
    />
  </template>
</ElementAdvancedSearch>`,
  handler: `const cacheSearchParams = ref({})
const handleCacheSearch = (params) => {
  cacheSearchParams.value = params
  console.log('缓存搜索:', params)
}`
})

// 添加自定义标签示例的源码数据
const customTagsSource = reactive({
  config: `const customTagsSearchConfig = {
  itemsPerRow: 2,
  popoverWidth: 800,
  labelWidth: '100px',
  inline: true,
  formItems: [
    {
      field: 'productName',
      label: '产品名称',
      type: 'input',
      placeholder: '请输入产品名称',
      elProps: {
        prefixIcon: 'Search',
        clearable: true
      }
    },
    {
      field: 'category',
      label: '产品分类',
      type: 'select',
      placeholder: '请选择产品分类',
      multiple: true,
      options: [
        { label: '电子产品', value: '1' },
        { label: '家居用品', value: '2' },
        { label: '服装鞋帽', value: '3' },
        { label: '食品饮料', value: '4' }
      ],
      elProps: {
        filterable: true,
        clearable: true
      }
    },
    {
      field: 'priceRange',
      label: '价格区间',
      type: 'numberrange',
      min: 0,
      max: 99999,
      minPlaceholder: '最低价',
      maxPlaceholder: '最高价',
      elProps: {
        step: 10,
        controlsPosition: 'right'
      }
    },
    {
      field: 'onSale',
      label: '是否促销',
      type: 'radio',
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '0' }
      ]
    }
  ]
}`,
  template: `<!-- 外部容器用于显示搜索标签 - 这是真正的自定义位置 -->
<div id="custom-tags-container">
  <div style="min-height: 40px;">
    <!-- 标签将通过 Teleport 显示在此处 -->
  </div>
</div>

<!-- 搜索组件，使用 teleportTo 属性 -->
<ElementAdvancedSearch
  v-model="customTagsSearchParams"
  :search-config="customTagsSearchConfig"
  teleport-to="#custom-tags-container div"
  @search="handleCustomTagsSearch"
/>`,
  handler: `const customTagsSearchParams = ref({})
const handleCustomTagsSearch = (params) => {
  customTagsSearchParams.value = params
  console.log('自定义标签位置搜索:', params)
}`
})
</script>

<style scoped lang="scss">
.demo-container {
  display: flex;
  gap: 20px;
}

.sidebar-affix {
  width: 250px;
  flex-shrink: 0;
}

.sidebar {
  width: 250px;
  background-color: var(--el-bg-color-overlay);
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  &-menu {
    border: none;
    min-height: 100%;
  }
}

.submenu-item {
  padding-left: 40px !important;
  height: 40px;
  line-height: 40px;
  
  &:hover {
    background-color: var(--el-menu-hover-bg-color);
  }
}

.main-content {
  flex: 1;
  overflow-y: auto;
}

.content-section {
  margin-bottom: 20px;
}

.demo-card,
.doc-card {
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
  
  h3 {
    margin-top: 0;
    color: #333;
  }
  
  pre {
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
}

.doc-content {
  line-height: 1.6;
  
  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    color: #333;
  }
}

.code-block {
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  overflow: auto;
  font-family: 'Courier New', monospace;
  margin: 10px 0;
}

.type-props {
  margin-top: 20px;
}

.source-dialog {
  border-radius: 8px;
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

.instructions {
  line-height: 1.6;
  
  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    color: #333;
  }
  
  ul,
  ol {
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 8px;
  }
  
  code {
    background-color: #f5f5f5;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
  }
  
  pre {
    background-color: #f5f5f5;
    padding: 12px;
    border-radius: 4px;
    overflow: auto;
    
    code {
      background-color: transparent;
      padding: 0;
    }
  }
}

/* 暗色主题样式 */
html.dark,
:deep(.dark) {
  .result,
  .source-code,
  .code-block,
  .instructions code,
  .instructions pre {
    background-color: var(--el-fill-color-light);
    color: var(--el-text-color-primary);
    border: 1px solid var(--el-border-color-light);
  }
  
  .result h3,
  .doc-content h3 {
    color: var(--el-text-color-primary);
  }
  
  .result pre {
    background-color: var(--el-bg-color-page);
  }
  
  /* 特殊优化：为代码区域提供更好的暗色主题体验 */
  .result pre,
  .source-code,
  .code-block {
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      
      &-thumb {
        background-color: var(--el-border-color-light);
        border-radius: 3px;
      }
      
      &-track {
        background-color: var(--el-fill-color-light);
      }
    }
  }
}

/* 响应式设计 */
@media (max-width: 992px) {
  .demo-container {
    flex-direction: column;
    height: auto;
  }
  
  .sidebar {
    width: 100%;
  }
}
</style>