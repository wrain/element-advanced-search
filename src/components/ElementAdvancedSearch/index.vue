<template>
  <div class="advanced-search">
    
    <!-- 主搜索栏 -->
    <div class="main-search-bar">
      <el-input
        v-model="quickSearchValue"
        :placeholder="quickSearchPlaceholder"
        class="quick-search-input"
        @keyup.enter="handleQuickSearch"
      />
      <el-button
        type="primary"
        icon="Search"
        @click="handleQuickSearch"
        class="search-button"
      >
        搜索
      </el-button>
      <div class="filter-button-wrapper">
        <!-- 高级搜索表单弹出层 -->
        <el-popover
          v-if="hasAdvancedFields"
          v-model:visible="isAdvancedExpanded"
          placement="bottom-end"
          :width="getPopoverWidth"
          trigger="click"
          popper-class="advanced-search-popover"
          :teleported="true"
          :hide-after="0"
          :persistent="false"
          :show-arrow="false"
        >
          <template #reference>
            <el-button 
              v-if="hasAdvancedFields"
              ref="filterButtonRef"
              @click="toggleAdvancedSearch"
              :icon="isAdvancedExpanded ? 'ArrowUp' : 'ArrowDown'"
              class="filter-button"
            >
              {{ isAdvancedExpanded ? '收起筛选' : '更多筛选' }}
            </el-button>
          </template>
          
          <div class="advanced-search-form-popover">
            <el-form
              ref="advancedFormRef"
              :model="advancedFormData"
              :label-width="searchConfig.labelWidth || '100px'"
              :inline="searchConfig.inline !== false"
              class="advanced-form"
            >
              <el-row :gutter="20">
                <el-col 
                  v-for="item in visibleFormItems"
                  :key="item.field"
                  :span="24 / (searchConfig.itemsPerRow || 2)"
                  class="advanced-form-item-col"
                >
                  <el-form-item
                    :label="item.label"
                    :prop="item.field"
                    class="advanced-form-item"
                  >
                    <!-- 输入框 -->
                    <el-input
                      v-if="item.type === 'input' || !item.type"
                      v-model="advancedFormData[item.field]"
                      :placeholder="item.placeholder || `请输入${item.label}`"
                      :clearable="item.clearable !== false"
                      class="form-item-input"
                      v-bind="getElProps(item, 'input')"
                    />
                    
                     <!-- 文本域 -->
                    <div v-else-if="item.type === 'textarea'" class="textarea-container" :data-field="item.field">
                      <!-- 默认input -->
                      <el-input
                         v-show="!textareaFocusStates[item.field]"
                        v-model="advancedFormData[item.field]"
                        :placeholder="item.shortPlaceholder || item.placeholder || `请输入${item.label}`"
                        :clearable="item.clearable !== false"
                        class="form-item-input"
                        @focus="handleTextareaFocusEvent(item.field)"
                        v-bind="getElProps(item, 'input')"
                      />
                      
                      <!-- 聚焦时显示的textarea -->
                      <el-input
                        v-show="textareaFocusStates[item.field]"
                        v-model="advancedFormData[item.field]"
                        :placeholder="item.longPlaceholder || item.placeholder || `请输入${item.label}`"
                        :clearable="item.clearable !== false"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                        class="form-item-textarea-overlay"
                        :teleported="true"
                        @blur="() => { textareaFocusStates[item.field] = false; }"
                        v-bind="getElProps(item, 'input')"
                      />
                    </div>
                    
                    <!-- 选择框 -->
                    <el-select
                      v-else-if="item.type === 'select'"
                      v-model="advancedFormData[item.field]"
                      :placeholder="item.placeholder || `请选择${item.label}`"
                      :clearable="item.clearable !== false"
                      :multiple="item.multiple"
                      :filterable="item.filterable"
                      :remote="item.remote"
                      :remote-method="item.remote ? getRemoteMethod(item) : undefined"
                      :loading="loadingStates[item.field] || false"
                      class="form-item-select"
                      :teleported="false"
                      reserve-keyword
                      v-bind="getElProps(item, 'select')"
                    >
                      <el-option
                        v-for="option in getSelectOptions(item)"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                        v-bind="getElProps(item, 'option', option)"
                      />
                    </el-select>
                    
                    <!-- 树形选择框 -->
                    <el-tree-select
                      v-else-if="item.type === 'treeselect'"
                      v-model="advancedFormData[item.field]"
                      :placeholder="item.placeholder || `请选择${item.label}`"
                      :clearable="item.clearable !== false"
                      :multiple="item.multiple"
                      :data="getTreeSelectOptions(item)"
                      :node-key="item.nodeKey || 'id'"
                      :props="getTreeSelectProps(item)"
                      :show-checkbox="item.showCheckbox"
                      :filterable="item.filterable"
                      :teleported="false"
                      :popper-options="{ placement: 'bottom-start' }"
                      :style="{ '--el-tree-select-dropdown-max-height': (item.maxDropdownHeight || 300) + 'px' }"
                      :render-after-expand="false"
                      :loading="loadingStates[item.field] || false"
                      v-bind="getElProps(item, 'treeSelect')"
                    />
                    
                    <!-- 单选框 -->
                    <el-radio-group
                      v-else-if="item.type === 'radio'"
                      v-model="advancedFormData[item.field]"
                      class="form-item-radio"
                      v-bind="getElProps(item, 'radioGroup')"
                    >
                      <el-radio
                        v-for="option in item.options"
                        :key="option.value"
                        :value="option.value"
                        class="form-item-radio-option"
                        v-bind="getElProps(item, 'radio', option)"
                      >
                        {{ option.label }}
                      </el-radio>
                    </el-radio-group>
                    
                    <!-- 复选框 -->
                    <el-checkbox-group
                      v-else-if="item.type === 'checkbox'"
                      v-model="advancedFormData[item.field]"
                      class="form-item-checkbox"
                      v-bind="getElProps(item, 'checkboxGroup')"
                    >
                      <el-checkbox
                        v-for="option in item.options"
                        :key="option.value"
                        :value="option.value"
                        class="form-item-checkbox-option"
                        v-bind="getElProps(item, 'checkbox', option)"
                      >
                        {{ option.label }}
                      </el-checkbox>
                    </el-checkbox-group>
                    
                    <!-- 日期选择器 -->
                    <el-date-picker
                      v-else-if="item.type === 'date'"
                      v-model="advancedFormData[item.field]"
                      type="date"
                      :placeholder="item.placeholder || `请选择${item.label}`"
                      :clearable="item.clearable !== false"
                      class="form-item-date"
                      :teleported="false"
                      v-bind="getElProps(item, 'datePicker')"
                    />
                    
                    <!-- 日期范围选择器 -->
                    <el-date-picker
                      v-else-if="item.type === 'daterange'"
                      v-model="advancedFormData[item.field]"
                      type="daterange"
                      :start-placeholder="item.startPlaceholder || '开始日期'"
                      :end-placeholder="item.endPlaceholder || '结束日期'"
                      :clearable="item.clearable !== false"
                      class="form-item-daterange"
                      :teleported="false"
                      range-separator="至"
                      v-bind="getElProps(item, 'datePicker')"
                    />
                    
                    <!-- 数字输入框 -->
                    <el-input-number
                      v-else-if="item.type === 'number'"
                      v-model="advancedFormData[item.field]"
                      :min="item.min"
                      :max="item.max"
                      :placeholder="item.placeholder || `请输入${item.label}`"
                      :controls-position="item.controlsPosition || 'right'"
                      class="form-item-number"
                      v-bind="getElProps(item, 'inputNumber')"
                    />
                    
                    <!-- 数字范围输入框 -->
                    <div v-else-if="item.type === 'numberrange'" class="numberrange-container">
                      <el-input-number
                        :model-value="getNumberRangeValue(item.field, 0)"
                        :min="item.min"
                        :max="item.max"
                        :placeholder="item.minPlaceholder || '最小值'"
                        :controls-position="item.controlsPosition || 'right'"
                        class="form-item-number"
                        @update:model-value="(val: number | null) => updateNumberRangeValue(item.field, 0, val ?? null)"
                        v-bind="getElProps(item, 'inputNumber')"
                      />
                      <span class="range-separator">-</span>
                      <el-input-number
                        :model-value="getNumberRangeValue(item.field, 1)"
                        :min="item.min"
                        :max="item.max"
                        :placeholder="item.maxPlaceholder || '最大值'"
                        :controls-position="item.controlsPosition || 'right'"
                        class="form-item-number"
                        @update:model-value="(val: number | null)  => updateNumberRangeValue(item.field, 1, val ?? null)"
                        v-bind="getElProps(item, 'inputNumber')"
                      />
                    </div>
                    
                    <!-- 时间选择器 -->
                    <el-time-picker
                      v-else-if="item.type === 'time'"
                      v-model="advancedFormData[item.field]"
                      :placeholder="item.placeholder || `请选择${item.label}`"
                      :clearable="item.clearable !== false"
                      :format="item.format"
                      class="form-item-time"
                      :teleported="false"
                      v-bind="getElProps(item, 'timePicker')"
                    />
                    
                    <!-- 时间范围选择器 -->
                    <el-time-picker
                      v-else-if="item.type === 'timerange'"
                      v-model="advancedFormData[item.field]"
                      is-range
                      :start-placeholder="item.startPlaceholder || '开始时间'"
                      :end-placeholder="item.endPlaceholder || '结束时间'"
                      :clearable="item.clearable !== false"
                      :format="item.format"
                      class="form-item-timerange"
                      :teleported="false"
                      range-separator="至"
                      v-bind="getElProps(item, 'timePicker')"
                    />

                    <!-- 自定义插槽 -->
                    <slot 
                      v-else-if="item.type === 'custom'" 
                      :name="item.slotName || item.field" 
                      :model="advancedFormData"
                      :field="item.field"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              
              <!-- 操作按钮 -->
              <el-form-item class="advanced-form-actions"
                :label-width="searchConfig.labelWidth || '100px'" label="&nbsp;">
                <el-button
                  type="primary"
                  icon="Search"
                  @click="handleAdvancedSearch"
                >
                  搜索
                </el-button>
                <el-button
                  @click="resetAdvancedForm"
                  icon="Refresh"
                >
                  重置
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-popover>
      </div>
    </div>
    

    <!-- 搜索标签区域 -->
    <div class="search-tags" v-if="searchTags.length > 0">
            <el-tag
        v-for="tag in searchTags"
        :key="tag.key"
        closable
        @close="removeSearchTag(tag.key)"
        class="search-tag"
      >
        {{ tag.label }}: {{ getDisplayValue(tag) }}
      </el-tag>
      <el-button 
        type="primary"
        link
        @click="clearAllTags" 
        class="clear-all-tags"
      >
        清除所有
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import type { FormItem, SearchConfig, SelectFormItem, SelectOption, TreeselectFormItem } from '../../types'
import { ElForm } from 'element-plus'

// 添加timer变量用于防抖
let updateTagsTimer: number | null = null

interface Props {
  searchConfig: SearchConfig
  quickSearchField?: string // 快速搜索字段名
  quickSearchPlaceholder?: string // 快速搜索占位符
  modelValue?: Record<string, any> // v-model 绑定值
  cacheKey?: string // 缓存键名，用于区分不同页面的搜索条件
}

const props = withDefaults(defineProps<Props>(), {
  quickSearchField: 'keyword',
  quickSearchPlaceholder: '请输入搜索关键词',
  modelValue: () => ({}),
  cacheKey: '' // 默认为空，不启用缓存功能
})

const emit = defineEmits<{
  (e: 'search', value: Record<string, any>): void
  (e: 'update:modelValue', value: Record<string, any>): void
}>()

// 引用模板
const advancedFormRef = ref<InstanceType<typeof ElForm> | null>(null)

// 状态管理
const isAdvancedExpanded = ref(false)
const quickSearchValue = ref('')
const advancedFormData = ref<Record<string, any>>({})
const searchTags = ref<Array<{key: string, label: string, value: any}>>([])
const textareaFocusStates = ref<Record<string, boolean>>({}) // textarea焦点状态

// 远程选项存储
const remoteSelectOptions = ref<Record<string, SelectOption[]>>({})
const loadingStates = ref<Record<string, boolean>>({})

// 获取数字范围值
const getNumberRangeValue = (field: string, index: number): number | null => {
  const value = advancedFormData.value[field]
  if (Array.isArray(value) && value.length > index) {
    return value[index]
  }
  return null
}

// 更新数字范围值
const updateNumberRangeValue = (field: string, index: number, val: number | null): void => {
  // 确保该字段是一个数组
  if (!Array.isArray(advancedFormData.value[field])) {
    advancedFormData.value[field] = [null, null]
  }
  
  // 更新对应索引的值
  advancedFormData.value[field][index] = val
  
  // 触发响应式更新
  advancedFormData.value = { ...advancedFormData.value }
}

watch(() => remoteSelectOptions.value, () => {
  // 如果已经有搜索标签且包含远程选项字段，则更新标签显示
  if (searchTags.value.length > 0) {
    const hasRemoteTags = searchTags.value.some(tag => {
      const formItem = props.searchConfig.formItems.find(item => item.field === tag.key)
      return formItem && ((formItem.type === 'select' || formItem.type === 'treeselect') && 
        ((formItem as SelectFormItem | TreeselectFormItem).remote || (formItem as SelectFormItem | TreeselectFormItem).loadOptions))
    })
    
    if (hasRemoteTags) {
      // 使用防抖机制避免频繁更新导致的闪烁
      if (updateTagsTimer) {
        clearTimeout(updateTagsTimer)
      }
      updateTagsTimer = window.setTimeout(() => {
        nextTick(() => {
          forceUpdateSearchTags()
        })
      }, 100) as any
    }
  }
}, { deep: true })

// 计算属性
const hasAdvancedFields = computed(() => {
  return props.searchConfig.formItems.length > 1
})

const visibleFormItems = computed(() => {
  return props.searchConfig.formItems.filter(item => !item.hidden)
})

// 计算弹出层宽度
const getPopoverWidth = computed(() => {
  // 使用配置的宽度或默认800px
  return props.searchConfig.popoverWidth || 800
})

// 生成缓存键名
const getCacheKey = computed(() => {
  return props.cacheKey ? `advancedSearch@${props.cacheKey}` : ''
})

// 添加处理textarea焦点事件的方法
const handleTextareaFocusEvent = (field: string): void => {
  textareaFocusStates.value[field] = true
  nextTick(() => {
    const textarea = document.querySelector(`[data-field=${field}] .form-item-textarea-overlay textarea`)
    if (textarea) (textarea as HTMLTextAreaElement).focus()
  })
}

// 获取select选项
const getSelectOptions = (item: FormItem): SelectOption[] => {
  try {
    if (item.type === 'select' || item.type === 'treeselect') {
      const selectItem = item as (SelectFormItem | TreeselectFormItem)
      if (selectItem.remote && remoteSelectOptions.value[item.field]) {
        return remoteSelectOptions.value[item.field]
      }
      return selectItem.options || []
    }
    return []
  } catch (e) {
    console.error('Error getting select options:', e)
    return []
  }
}

// 获取TreeSelect选项
const getTreeSelectOptions = (item: FormItem): SelectOption[] => {
  return getSelectOptions(item)
}

// 获取TreeSelect的props配置
const getTreeSelectProps = (item: FormItem): any => {
  if (item.type === 'treeselect') {
    const treeItem = item as TreeselectFormItem
    // 如果有自定义props配置，直接使用
    if (treeItem.props && typeof treeItem.props === 'object') {
      return treeItem.props
    }
    // 否则使用默认配置
    return {
      value: treeItem.nodeKey || 'id',
      label: 'label',
      children: 'children'
    }
  }
  return {}
}

// 获取远程方法
const getRemoteMethod = (item: FormItem) => {
  if (item.type !== 'select' && item.type !== 'treeselect') return undefined
  
  const selectItem = item as (SelectFormItem | TreeselectFormItem)
  return async (query: string) => {
    if (selectItem.remoteMethod) {
      loadingStates.value[item.field] = true
      try {
        const options = await selectItem.remoteMethod(query)
        remoteSelectOptions.value[item.field] = options
      } catch (error) {
        console.error(`Failed to load remote options for ${item.field}:`, error)
      } finally {
        loadingStates.value[item.field] = false
      }
    }
  }
}

// 保存搜索条件到缓存
const saveSearchCache = (params: Record<string, any>): void => {
  // 只有在设置了 cacheKey 时才保存缓存
  if (!getCacheKey.value) return
  
  try {
    localStorage.setItem(getCacheKey.value, JSON.stringify({
      searchParams: params,
      timestamp: Date.now()
    }))
  } catch (e) {
    console.warn('Failed to save search cache:', e)
  }
}

// 从缓存中获取搜索条件
const getSearchCache = (): Record<string, any> | null => {
  // 只有在设置了 cacheKey 时才获取缓存
  if (!getCacheKey.value) return null
  
  try {
    const cached = localStorage.getItem(getCacheKey.value)
    if (cached) {
      const parsed = JSON.parse(cached)
      // 检查缓存是否过期（例如24小时）
      const now = Date.now()
      const oneDay = 24 * 60 * 60 * 1000
      if (now - parsed.timestamp > oneDay) {
        // 缓存过期，清除缓存
        clearSearchCache()
        return null
      }
      return parsed.searchParams || null
    }
  } catch (e) {
    console.warn('Failed to get search cache:', e)
    // 解析失败时清除缓存
    clearSearchCache()
  }
  
  return null
}

// 清除缓存
const clearSearchCache = (): void => {
  // 只有在设置了 cacheKey 时才清除缓存
  if (!getCacheKey.value) return
  
  try {
    localStorage.removeItem(getCacheKey.value)
  } catch (e) {
    console.warn('Failed to clear search cache:', e)
  }
}

// 强制更新搜索标签显示
const forceUpdateSearchTags = (): void => {
  // 重新构建搜索标签
  const currentSearchParams: Record<string, any> = {}
  
  // 添加快速搜索值
  if (quickSearchValue.value) {
    currentSearchParams[props.quickSearchField] = quickSearchValue.value
  }
  
  // 合并当前表单数据
  Object.assign(currentSearchParams, advancedFormData.value)
  
  // 只有当搜索参数发生变化时才更新标签，避免不必要的重渲染
  const currentTags = searchTags.value
  const newTags: Array<{key: string, label: string, value: any}> = []
  
  // 处理快速搜索标签
  if (quickSearchValue.value) {
    newTags.push({
      key: props.quickSearchField,
      label: '关键词',
      value: quickSearchValue.value
    })
  }
  
  // 处理高级搜索标签
  for (const item of props.searchConfig.formItems) {
    const value = currentSearchParams[item.field]
    // 只有当值存在且不为空时才添加标签
    if (value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0)) {
      // 特别处理数字范围类型，只有当两个值都不为空时才添加标签
      if (item.type === 'numberrange') {
        if (Array.isArray(value) && (value[0] !== null || value[1] !== null)) {
          newTags.push({
            key: item.field,
            label: item.label,
            value
          })
        }
      } 
      // 特别处理日期范围类型，只有当两个值都不为空时才添加标签
      else if (item.type === 'daterange') {
        if (Array.isArray(value) && value.length === 2 && (value[0] !== null || value[1] !== null)) {
          newTags.push({
            key: item.field,
            label: item.label,
            value
          })
        }
      } else if (item.field !== props.quickSearchField) {
        // 避免重复添加快速搜索字段
        newTags.push({
          key: item.field,
          label: item.label,
          value
        })
      }
    }
  }
  
  // 比较新旧标签，只有在真正发生变化时才更新
  if (!isTagsEqual(currentTags, newTags)) {
    searchTags.value = newTags
  }
}

// 比较两个标签数组是否相等
const isTagsEqual = (
  tags1: Array<{key: string, label: string, value: any}>, 
  tags2: Array<{key: string, label: string, value: any}>
): boolean => {
  if (tags1.length !== tags2.length) {
    return false
  }
  
  // 使用更高效的比较方式
  return tags1.every((tag1, index) => {
    const tag2 = tags2[index]
    return tag1.key === tag2.key && 
           tag1.label === tag2.label && 
           JSON.stringify(tag1.value) === JSON.stringify(tag2.value)
  })
}

// 方法
const toggleAdvancedSearch = (): void => {
  // 由于使用了Element Plus的popover，点击reference会自动切换显示状态
  // 这里可以根据需要添加额外的逻辑
}

// 关闭弹出层
const closePopover = (): void => {
  isAdvancedExpanded.value = false
}

// 处理快速搜索
const handleQuickSearch = (): void => {
  const searchParams: Record<string, any> = {}
  
  // 添加快速搜索值
  if (quickSearchValue.value) {
    searchParams[props.quickSearchField] = quickSearchValue.value
  }
  
  // 合并高级搜索表单的值
  Object.assign(searchParams, advancedFormData.value)
  
  // 更新搜索标签
  updateSearchTags(searchParams)
  
  // 保存到缓存
  saveSearchCache(searchParams)
  
  // 触发搜索事件
  emit('update:modelValue', searchParams)
  emit('search', searchParams)
}

// 处理高级搜索
const handleAdvancedSearch = (): void => {
  const searchParams: Record<string, any> = {}
  
  // 添加快速搜索值
  if (quickSearchValue.value) {
    searchParams[props.quickSearchField] = quickSearchValue.value
  }
  
  // 合并高级搜索表单的值
  Object.assign(searchParams, advancedFormData.value)
  
  // 更新搜索标签
  updateSearchTags(searchParams)
  
  // 保存到缓存
  saveSearchCache(searchParams)
  
  // 关闭弹出层
  closePopover()
  
  // 触发搜索事件
  emit('update:modelValue', searchParams)
  emit('search', searchParams)
}

// 重置高级表单
const resetAdvancedForm = (): void => {
  // 重置表单数据
  const resetTextareaFocusStates: Record<string, boolean> = {}
  const newData: Record<string, any> = {}
  
  for (const item of props.searchConfig.formItems) {
    if (item.type === 'custom') {
      // 自定义字段重置为默认值或空值
      newData[item.field] = item.default !== undefined ? item.default : ''
    } else if (item.type === 'checkbox') {
      // checkbox必须重置为数组
      newData[item.field] = []
    } else if (item.type === 'daterange' || item.type === 'numberrange') {
      // 日期范围和数字范围重置为空数组
      newData[item.field] = []
    } else if (item.type === 'treeselect') {
      const treeItem = item as TreeselectFormItem
      newData[item.field] = treeItem.multiple ? [] : ''
    } else if (item.type === 'select') {
      const selectItem = item as SelectFormItem
      newData[item.field] = selectItem.multiple ? [] : ''
    } else if (item.type === 'textarea') {
      // textarea重置
      newData[item.field] = item.default ?? ''
      resetTextareaFocusStates[item.field] = false
    } else if (item.type === 'number') {
      // 数字输入框重置为null而不是空字符串
      newData[item.field] = item.default ?? null
    } else {
      newData[item.field] = item.default ?? ''
    }
  }
  
  // 一次性更新表单数据
  advancedFormData.value = newData
  
  // 重置textarea焦点状态
  textareaFocusStates.value = resetTextareaFocusStates
  
  // 清空搜索标签
  searchTags.value = []
  
  // 清除缓存
  clearSearchCache()
  
  // 触发搜索事件（空搜索）
  const searchParams: Record<string, any> = {}
  if (quickSearchValue.value) {
    searchParams[props.quickSearchField] = quickSearchValue.value
  }
  
  emit('update:modelValue', searchParams)
  emit('search', searchParams)
}

// 更新搜索标签
const updateSearchTags = (searchParams: Record<string, any>): void => {
  try {
    const tags: Array<{key: string, label: string, value: any}> = []
    // 处理快速搜索标签
    if (quickSearchValue.value) {
      tags.push({
        key: props.quickSearchField,
        label: '关键词',
        value: quickSearchValue.value
      })
    }
    
    // 处理高级搜索标签
    for (const item of props.searchConfig.formItems) {
      const value = searchParams[item.field]
      // 只有当值存在且不为空时才添加标签
      if (value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0)) {
        // 特别处理数字范围类型，只有当两个值都不为空时才添加标签
        if (item.type === 'numberrange') {
          if (Array.isArray(value) && (value[0] !== null || value[1] !== null)) {
            tags.push({
              key: item.field,
              label: item.label,
              value
            })
          }
        } 
        // 特别处理日期范围类型，只有当两个值都不为空时才添加标签
        else if (item.type === 'daterange') {
          if (Array.isArray(value) && value.length === 2 && (value[0] !== null || value[1] !== null)) {
            tags.push({
              key: item.field,
              label: item.label,
              value
            })
          }
        } else if (item.field !== props.quickSearchField) {
          // 避免重复添加快速搜索字段
          tags.push({
            key: item.field,
            label: item.label,
            value
          })
        }
      }
    }
    
    searchTags.value = tags
  } catch (e) {
    console.error('Error updating search tags:', e)
    searchTags.value = []
  }
}

// 获取TreeSelect选项显示值
const getTreeSelectDisplayValue = (values: any[], options: SelectOption[], propsConfig: any): string => {
  const valueKey = propsConfig.value || 'id'
  const labelKey = propsConfig.label || 'label'
  const labels = []
  
  for (const value of values) {
    const option = findOptionByValue(options, value, valueKey)
    if (option && option.hasOwnProperty(labelKey)) {
      labels.push(option[labelKey as keyof SelectOption])
    } else {
      labels.push(String(value))
    }
  }
  
  return labels.join(', ')
}

// 获取单个TreeSelect选项显示值
const getSingleTreeSelectDisplayValue = (value: any, options: SelectOption[], propsConfig: any): string => {
  const valueKey = propsConfig.value || 'id'
  const labelKey = propsConfig.label || 'label'
  const option = findOptionByValue(options, value, valueKey)
  if (option && option.hasOwnProperty(labelKey)) {
    return option[labelKey as keyof SelectOption]
  }
  return String(value)
}

// 递归查找树形选项
const findOptionByValue = (options: SelectOption[], value: any, valueKey: string): SelectOption | null => {
  for (const option of options) {
    // 检查当前节点
    if (option.hasOwnProperty(valueKey)) {
      const optionValue = option[valueKey as keyof SelectOption]
      if (String(optionValue) === String(value)) {
        return option
      }
    }
    
    // 递归检查子节点
    if (option.children && option.children.length > 0) {
      const found = findOptionByValue(option.children, value, valueKey)
      if (found) {
        return found
      }
    }
  }
  return null
}

// 获取显示值（处理选择框等需要转换显示的值）
const getDisplayValue = (tag: {key: string, label: string, value: any}): string => {
  const formItem = props.searchConfig.formItems.find(item => item.field === tag.key)
  
  // 如果表单项提供了自定义显示函数，则使用该函数
  if (formItem && formItem.displayValue) {
    try {
      return formItem.displayValue(tag.value, advancedFormData.value) || String(tag.value)
    } catch (e) {
      console.error('Error in custom displayValue function:', e)
      return String(tag.value)
    }
  }
  
  // 如果是选择框或树形选择框，查找对应的标签
  if (formItem && (formItem.type === 'select' || formItem.type === 'treeselect') && (formItem.options || remoteSelectOptions.value[formItem.field])) {
    const selectItem = formItem as (SelectFormItem | TreeselectFormItem)
    const options = selectItem.remote ? remoteSelectOptions.value[formItem.field] : selectItem.options
    
    try {
      if (formItem.type === 'treeselect') {
        // 特别处理 treeselect
        const treeProps = getTreeSelectProps(formItem)
        if (Array.isArray(tag.value)) {
          return getTreeSelectDisplayValue(tag.value, options || [], treeProps)
        } else {
          return getSingleTreeSelectDisplayValue(tag.value, options || [], treeProps)
        }
      } else {
        // 处理普通 select
        if (Array.isArray(tag.value)) {
          const labels = tag.value.map(val => {
            const option = findOptionByValue(options || [], val, 'value')
            return option ? option.label : String(val)
          }).filter(label => label !== undefined && label !== 'undefined' && label !== 'null' && label !== '')
          
          const result = labels.join(', ')
          return result || (tag.value.length ? tag.value.join(', ') : '')
        } else {
          const option = findOptionByValue(options || [], tag.value, 'value')
          const result = option ? option.label : String(tag.value)
          return result || String(tag.value)
        }
      }
    } catch (e) {
      console.error('Error processing select/treeselect display value:', e)
      return Array.isArray(tag.value) ? tag.value.join(', ') : String(tag.value)
    }
  }
  
  // 如果是单选框或复选框
  if (formItem && (formItem.type === 'radio' || formItem.type === 'checkbox') && formItem.options) {
    try {
      if (Array.isArray(tag.value)) {
        // 复选框
        return tag.value.map(val => {
          const option = formItem.options?.find(opt => opt.value === val)
          return option ? option.label : val
        }).join(', ')
      } else {
        // 单选框
        const option = formItem.options.find(opt => opt.value === tag.value)
        return option ? option.label : tag.value
      }
    } catch (e) {
      console.error('Error processing radio/checkbox display value:', e)
      return Array.isArray(tag.value) ? tag.value.join(', ') : String(tag.value)
    }
  }
  
  // 如果是日期范围
  if (formItem && formItem.type === 'daterange' && Array.isArray(tag.value)) {
    try {
      // 检查数组长度和元素是否有效
      if (tag.value.length === 2) {
        const [start, end] = tag.value
        if (start !== null && end !== null) {
          return `${formatDate(start)} ~ ${formatDate(end)}`
        } else if (start !== null) {
          return `≥ ${formatDate(start)}`
        } else if (end !== null) {
          return `≤ ${formatDate(end)}`
        }
      }
      return ''
    } catch (e) {
      console.error('Error processing daterange display value:', e)
      return ''
    }
  }
  
  // 如果是日期
  if (formItem && formItem.type === 'date') {
    try {
      if (tag.value) {
        return formatDate(tag.value)
      }
      return ''
    } catch (e) {
      console.error('Error processing date display value:', e)
      return ''
    }
  }
  
  // 如果是数字范围
  if (formItem && formItem.type === 'numberrange' && Array.isArray(tag.value)) {
    try {
      const [min, max] = tag.value
      if (min !== null && max !== null) {
        return `${min} - ${max}`
      } else if (min !== null) {
        return `≥ ${min}`
      } else if (max !== null) {
        return `≤ ${max}`
      }
      return ''
    } catch (e) {
      console.error('Error processing numberrange display value:', e)
      return ''
    }
  }

  // 如果是时间范围
    if (formItem && formItem.type === 'timerange' && Array.isArray(tag.value)) {
      try {
        const [start, end] = tag.value
        if (start && end) {
          return `${start} ~ ${end}`
        } else if (start) {
          return `≥ ${start}`
        } else if (end) {
          return `≤ ${end}`
        }
        return ''
      } catch (e) {
        console.error('Error processing timerange display value:', e)
        return ''
      }
    }
    
    // 如果是时间
    if (formItem && formItem.type === 'time') {
      try {
        if (tag.value) {
          return String(tag.value)
        }
        return ''
      } catch (e) {
        console.error('Error processing time display value:', e)
        return ''
      }
    }
  
  // 默认直接返回值
  return String(tag.value)
}

// 格式化日期显示
const formatDate = (date: any): string => {
  // 确保date是有效的Date对象
  if (date instanceof Date) {
    return date.toLocaleDateString()
  } else if (typeof date === 'string' || typeof date === 'number') {
    const d = new Date(date)
    return isNaN(d.getTime()) ? String(date) : d.toLocaleDateString()
  }
  return String(date)
}

// 移除搜索标签
const removeSearchTag = (key: string): void => {
  // 如果是快速搜索字段
  if (key === props.quickSearchField) {
    quickSearchValue.value = ''
  } else {
    // 清空表单中对应的字段
    const formItem = props.searchConfig.formItems.find(item => item.field === key)
    if (formItem) {
      if (formItem.type === 'checkbox') {
        // checkbox必须设置为空数组
        advancedFormData.value[key] = []
      } else if (formItem.type === 'daterange' || formItem.type === 'numberrange') {
        // 日期范围和数字范围设置为空数组
        advancedFormData.value[key] = []
      } else if (formItem.type === 'select' || formItem.type === 'treeselect') {
        const selectItem = formItem as (SelectFormItem | TreeselectFormItem)
        advancedFormData.value[key] = selectItem.multiple ? [] : ''
      } else if (formItem.type === 'number') {
        // 数字输入框设置为null而不是空字符串
        advancedFormData.value[key] = null
      } else if (formItem.type === 'timerange') {
        // 时间范围设置为空数组
        advancedFormData.value[key] = []
      } else if (formItem.type === 'time') {
        // 时间设置为null
        advancedFormData.value[key] = null
      } else {
        advancedFormData.value[key] = ''
      }
    } else {
      advancedFormData.value[key] = ''
    }
  }
  
  // 重新执行搜索
  handleAdvancedSearch()
}

// 清除所有标签
const clearAllTags = (): void => {
  quickSearchValue.value = ''
  resetAdvancedForm()
}

// 异步加载选项
const loadRemoteOptions = async (): Promise<void> => {
  const loadPromises: Promise<void>[] = []
  
  for (const item of props.searchConfig.formItems) {
    // 如果有loadOptions方法，则异步加载选项
    if ((item.type === 'select' || item.type === 'treeselect') && (item as SelectFormItem | TreeselectFormItem).loadOptions) {
      const selectItem = item as (SelectFormItem | TreeselectFormItem)
      
      const loadPromise = (async () => {
        try {
          const options = await selectItem.loadOptions!()
          remoteSelectOptions.value[item.field] = options
        } catch (error) {
          console.error(`Failed to load options for ${item.field}:`, error)
        }
      })()
      
      loadPromises.push(loadPromise)
    }
  }
  
  // 并行加载所有选项
  if (loadPromises.length > 0) {
    await Promise.all(loadPromises)
    
    // 在所有远程选项加载完成后，如果需要更新标签显示
    if (searchTags.value.length > 0) {
      // 使用防抖机制避免频繁更新导致的闪烁
      if (updateTagsTimer) {
        clearTimeout(updateTagsTimer)
      }
      updateTagsTimer = window.setTimeout(() => {
        nextTick(() => {
          forceUpdateSearchTags()
        })
      }, 100) as any
    }
  }
}

// 获取Element Plus组件的属性
const getElProps = (item: FormItem, elType: string, option?: SelectOption): Record<string, any> => {
  // 通用属性透传
  const elProps: Record<string, any> = {}
  
  // 如果item上定义了elProps属性，则透传给对应组件
  if (item.hasOwnProperty('elProps')) {
    const itemWithProps = item as any
    if (itemWithProps.elProps) {
      // 如果elProps是函数，执行它
      if (typeof itemWithProps.elProps === 'function') {
        Object.assign(elProps, itemWithProps.elProps(elType, option))
      } 
      // 如果elProps是对象且有对应elType的配置
      else if (typeof itemWithProps.elProps === 'object' && itemWithProps.elProps[elType]) {
        Object.assign(elProps, itemWithProps.elProps[elType])
      }
      // 如果elProps是对象但没有对应elType的配置，直接使用整个对象
      else if (typeof itemWithProps.elProps === 'object' && 
               !Array.isArray(itemWithProps.elProps) && 
               Object.keys(itemWithProps.elProps).length > 0) {
        Object.assign(elProps, itemWithProps.elProps)
      }
    }
  }
  
  return elProps
}


// 监听外部传入的值变化
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    // 更新快速搜索值
    quickSearchValue.value = newVal[props.quickSearchField] || ''
    
    // 创建新的表单数据对象
    const newData: Record<string, any> = { ...advancedFormData.value }
    let hasChanges = false
    
    // 更新表单数据
    Object.keys(newVal).forEach(key => {
      if (key !== props.quickSearchField) {
        // 特别处理checkbox类型的数据，确保是数组格式
        const formItem = props.searchConfig.formItems.find(item => item.field === key)
        if (formItem && formItem.type === 'checkbox' && !Array.isArray(newVal[key])) {
          // 如果传入的checkbox数据不是数组格式，转换为数组
          newData[key] = newVal[key] ? [newVal[key]] : []
          hasChanges = true
        } else if (formItem && formItem.type === 'daterange' && newVal[key]) {
          // 特别处理日期范围数据
          if (Array.isArray(newVal[key])) {
            // 确保日期范围中的每个元素都是Date对象
            newData[key] = newVal[key].map((date: any) => {
              if (date instanceof Date) return date
              if (typeof date === 'string' || typeof date === 'number') {
                const d = new Date(date)
                return isNaN(d.getTime()) ? date : d
              }
              return date
            })
            hasChanges = true
          } else {
            newData[key] = []
            hasChanges = true
          }
        } else if (formItem && formItem.type === 'numberrange' && newVal[key]) {
          // 特别处理数字范围数据
          if (Array.isArray(newVal[key])) {
            newData[key] = newVal[key]
            hasChanges = true
          } else {
            newData[key] = [null, null]
            hasChanges = true
          }
        } else if (formItem && formItem.type === 'number') {
          // 特别处理数字类型数据，确保传递给el-input-number的是Number或null
          let newValue = newVal[key];
          // 如果是字符串且可以转换为数字，则转换为数字
          if (typeof newValue === 'string' && newValue !== '' && !isNaN(Number(newValue))) {
            newValue = Number(newValue);
          } else if (newValue === '' || newValue === undefined) {
            // 空字符串或undefined重置为null
            newValue = null;
          }
          
          if (newData[key] !== newValue) {
            newData[key] = newValue;
            hasChanges = true;
          }
        } else if (formItem && formItem.type === 'timerange' && newVal[key]) {
          // 特别处理时间范围数据
          if (Array.isArray(newVal[key])) {
            newData[key] = newVal[key]
            hasChanges = true
          } else {
            newData[key] = []
            hasChanges = true
          }
        } else if (formItem && formItem.type === 'time') {
          // 特别处理时间数据
          if (newData[key] !== newVal[key]) {
            newData[key] = newVal[key]
            hasChanges = true
          }
        } else if (formItem && formItem.type === 'custom') {
          // 特别处理自定义类型的数据，确保数值类型不被转换为字符串
          if (typeof formItem.default === 'number' && newVal[key] === '') {
            // 如果默认值是数字且新值是空字符串，则使用默认值
            newData[key] = formItem.default
            hasChanges = true
          } else if (newData[key] !== newVal[key]) {
            newData[key] = newVal[key]
            hasChanges = true
          }
        } else if (newData[key] !== newVal[key]) {
          // 对于其他类型直接赋值
          newData[key] = newVal[key]
          hasChanges = true
        }
      }
    })
    
    // 只有在有变化时才更新
    if (hasChanges) {
      advancedFormData.value = newData
    }
    
    // 更新搜索标签
    updateSearchTags(newVal)
  }
}, { immediate: true, deep: true })


// 初始化表单数据
onMounted(() => {
  // 初始化表单默认值
  const defaultData: Record<string, any> = {}
  const defaultTextareaFocusStates: Record<string, boolean> = {} // 新增textarea焦点状态默认值

  for (const item of props.searchConfig.formItems) {
    // 添加对自定义类型字段的处理
    if (item.type === 'custom') {
      // 自定义字段使用默认值或空值
      defaultData[item.field] = item.default !== undefined ? item.default : ''
    } else if (item.type === 'checkbox') {
      // checkbox必须初始化为数组
      defaultData[item.field] = Array.isArray(item.default) ? item.default : []
    } else if (item.type === 'treeselect') {
      const treeItem = item as TreeselectFormItem
      // treeselect需要根据multiple属性初始化值
      defaultData[item.field] = treeItem.multiple ? (Array.isArray(item.default) ? item.default : []) : (item.default ?? '')
    } else if (item.type === 'select') {
      const selectItem = item as SelectFormItem
      // 多选select也需要初始化为空数组
      defaultData[item.field] = selectItem.multiple ? (Array.isArray(item.default) ? item.default : []) : (item.default ?? '')
    } else if (item.type === 'daterange') {
      // 日期范围初始化为空数组
      defaultData[item.field] = Array.isArray(item.default) ? item.default : []
    } else if (item.type === 'numberrange') {
      // 数字范围初始化为包含两个null元素的数组
      defaultData[item.field] = Array.isArray(item.default) ? item.default : [null, null]
    } else if (item.type === 'textarea') {
      // textarea初始化
      defaultData[item.field] = item.default ?? ''
      defaultTextareaFocusStates[item.field] = false
    } else if (item.type === 'number') {
      // 数字输入框初始化为null而不是空字符串
      defaultData[item.field] = item.default ?? null
    } else if (item && item.type === 'timerange') {
      // 时间范围初始化为空数组
      defaultData[item.field] = Array.isArray(item.default) ? item.default : []
    } else if (item && item.type === 'time') {
      // 时间初始化为null
      defaultData[item.field] = item.default ?? null
    } else {
      // 其他类型使用默认值或空字符串
      defaultData[item.field] = item.default ?? ''
    }
  }
  
  // 设置表单数据
  advancedFormData.value = defaultData
  textareaFocusStates.value = defaultTextareaFocusStates // 设置textarea焦点状态默认值
  
  // 尝试从缓存中恢复搜索条件
  const cachedParams = getSearchCache()
  if (cachedParams) {
    // 恢复快速搜索值
    quickSearchValue.value = cachedParams[props.quickSearchField] || ''
    
    // 恢复表单数据
    Object.keys(cachedParams).forEach(key => {
      if (key !== props.quickSearchField) {
        // 特别处理checkbox类型的数据，确保是数组格式
        const formItem = props.searchConfig.formItems.find(item => item.field === key)
        if (formItem && formItem.type === 'checkbox' && !Array.isArray(cachedParams[key])) {
          // 如果缓存中的checkbox数据不是数组格式，转换为数组
          defaultData[key] = cachedParams[key] ? [cachedParams[key]] : []
        } else if (formItem && formItem.type === 'date' && cachedParams[key]) {
          // 特别处理日期数据
          if (typeof cachedParams[key] === 'string' || typeof cachedParams[key] === 'number') {
            const d = new Date(cachedParams[key])
            defaultData[key] = isNaN(d.getTime()) ? cachedParams[key] : d
          } else {
            defaultData[key] = cachedParams[key]
          }
        } else if (formItem && formItem.type === 'daterange' && cachedParams[key]) {
          // 特别处理日期范围数据
          if (Array.isArray(cachedParams[key])) {
            // 确保日期范围中的每个元素都是Date对象
            defaultData[key] = cachedParams[key].map((date: any) => {
              if (date instanceof Date) return date
              if (typeof date === 'string' || typeof date === 'number') {
                const d = new Date(date)
                return isNaN(d.getTime()) ? date : d
              }
              return date
            })
          } else {
            defaultData[key] = []
          }
        } else if (formItem && formItem.type === 'numberrange' && cachedParams[key]) {
          // 特别处理数字范围数据
          if (Array.isArray(cachedParams[key])) {
            defaultData[key] = cachedParams[key]
          } else {
            defaultData[key] = [null, null]
          }
        } else if (formItem && formItem.type === 'timerange' && cachedParams[key]) {
          // 特别处理时间范围数据
          if (Array.isArray(cachedParams[key])) {
            defaultData[key] = cachedParams[key]
          } else {
            defaultData[key] = []
          }
        } else if (formItem && formItem.type === 'time' && cachedParams[key]) {
          // 特别处理时间数据
          defaultData[key] = cachedParams[key]
        } else {
          defaultData[key] = cachedParams[key]
        }
      }
    })
    
    // 设置表单数据
    advancedFormData.value = defaultData
    
    // 更新搜索标签
    const searchParams: Record<string, any> = {}
    if (quickSearchValue.value) {
      searchParams[props.quickSearchField] = quickSearchValue.value
    }
    Object.assign(searchParams, advancedFormData.value)
    updateSearchTags(searchParams)
    
    // 如果有缓存数据，触发一次搜索
    emit('update:modelValue', searchParams)
    emit('search', searchParams)
  }
  
  // 异步加载远程选项，不阻塞页面渲染
  loadRemoteOptions()
})
</script>

<style lang="scss">
// popover 样式需要放在全局作用域中，因为 teleported=true 时元素会被移动到 body 下
.advanced-search-popover {
  padding: 0;
  max-height: 70vh;
  
  .advanced-search-form-popover {
    padding: 20px;
  }
  
  .el-row {
    flex-wrap: wrap;
    margin-left: -10px;
    margin-right: -10px;
  }
  
  .advanced-form-item-col {
    padding-left: 10px;
    padding-right: 10px;

    .el-form-item {
      width: 100%;
      margin-bottom: 18px;
    }
    
    .el-form-item__content {
      width: 100%;
    }
    
    .form-item-input,
    .form-item-select,
    .form-item-treeselect,
    .form-item-date,
    .form-item-daterange,
    .form-item-time,
    .form-item-timerange,
    .form-item-number,
    .form-item-radio,
    .form-item-checkbox {
      width: 100%;
    }
    
    // 特别处理日期范围选择器的内部组件
    .form-item-daterange,
    .form-item-timerange {      
      .el-date-editor.el-range-editor {
        width: 100%;
      }
    }
    
    .el-select,
    .el-tree-select {
      width: 100%;
    }
    
    .el-date-editor.el-range-editor {
      width: calc(100% - 20px);
    }
    
    .el-input-number {
      width: 100%;
    }
    
    .form-item-radio-option {
      margin-right: 15px;
    }
    
    .form-item-checkbox-option {
      margin-right: 15px;
    }
    
    // 添加 numberrange-container 样式
    .numberrange-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
      
      .range-separator {
        margin: 0 4px;
        color: var(--el-text-color-regular);
      }
      
      .el-input-number {
        flex: 1;
      }
    }
  }
  
  // 统一表单控件高度
  .form-item-input,
  .form-item-select,
  .form-item-date,
  .form-item-daterange,
  .form-item-time,
  .form-item-timerange,
  .form-item-number {
    height: 32px;
    width: 100%;
    // 特殊处理内部元素的高度
    .el-input__inner {
      height: 32px;
    }
    
    .el-input__wrapper {
      height: 32px;
    }
    
    .el-range-input {
      height: 30px;
    }
  }
  
  .el-select,
  .el-tree-select {
    .el-select__wrapper,
    .el-tree-select__wrapper {
      height: 32px;
    }
  }
  
  // TreeSelect下拉内容样式
  .el-tree-select__popper {
    .el-tree {
      max-height: 300px;
      overflow-y: auto;
      padding: 5px 0;
    }
    
    .el-scrollbar {
      max-height: 310px;
    }
    
    .el-scrollbar__wrap {
      max-height: 300px;
    }
  }

  // textarea样式
  .form-item-textarea {
    width: 100%;
    min-height: 32px;
    
    .el-textarea__inner {
      max-height: 120px;
      resize: vertical;
      padding: 6px 11px;
    }
    
    &:not(.textarea-focused) {
      .el-textarea__inner {
        height: 32px;
        max-height: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  
  // textarea容器样式
  .textarea-container {
    position: relative;
    width: 100%;
    height: 32px;
    
    .form-item-textarea-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 99;
      .el-textarea__inner {
        max-height: 120px;
        resize: vertical;
      }
    }
  }
}

// 暗色主题支持
html.dark {
  .advanced-search-popover {
    background-color: var(--el-bg-color);
    border-color: var(--el-border-color-light);
    
    .advanced-search-form-popover {
      background-color: var(--el-bg-color);
    }
    
    .el-tree-select__popper {
      background-color: var(--el-bg-color-overlay);
      border-color: var(--el-border-color-light);
      
      .el-tree {
        background-color: var(--el-bg-color-overlay);
        
        .el-tree-node.is-current > .el-tree-node__content {
          background-color: var(--el-color-primary-light-9);
        }
        
        .el-tree-node__content:hover {
          background-color: var(--el-fill-color-light);
        }
        
        .el-tree-node:focus > .el-tree-node__content {
          background-color: var(--el-color-primary-light-9);
        }
      }
    }
  }
}
</style>

<style scoped lang="scss">
.advanced-search {
  width: 100%;
  border-bottom: none;
  padding: 16px;
  font-size: 14px;
  position: relative;

  .search-tags {
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    
    .search-tag {
      background-color: var(--el-color-primary-light-9);
      border-color: var(--el-color-primary-light-5);
      color: var(--el-color-primary);
      border-radius: 2px;
      
      :deep(.el-tag__close) {
        color: var(--el-color-primary);
        
        &:hover {
          background-color: var(--el-color-primary);
          color: #fff;
        }
      }
    }
    
    .clear-all-tags {
      margin-left: 8px;
      padding: 0;
      height: auto;
      
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
  
  .main-search-bar {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;
    
    .quick-search-input {
      flex: 1;
      min-width: 200px;
      max-width: 400px;
    }
    
    .search-button,
    .filter-button {
      height: 32px;
    }
    
    .filter-button-wrapper {
      position: relative;
    }
  }
  
  // 移除 scoped 中的 numberrange-container 样式，因为已经移到全局样式中
}

// 暗色主题支持
html.dark {
  .advanced-search {
    background-color: var(--el-bg-color);
    border-color: var(--el-border-color-light);
  }
  
  .form-item-textarea-overlay {
    background-color: var(--el-bg-color);
  }

  .search-tags {
    .search-tag {
      background-color: var(--el-color-primary-light-9);
      border-color: var(--el-color-primary-light-5);
      color: var(--el-color-primary);
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .advanced-search {
    padding: 12px;
    
    .main-search-bar {
      .quick-search-input {
        min-width: 150px;
      }
    }
    
    // 在移动端调整 numberrange 容器样式
    :deep(.numberrange-container) {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      
      .range-separator {
        margin: 0;
      }
    }
  }
  
  // 全局样式中的移动端适配
  .advanced-search-popover {
    .advanced-form-item-col {
      .numberrange-container {
        @media (max-width: 768px) {
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          
          .range-separator {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>