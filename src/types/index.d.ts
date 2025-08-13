/*
 * @Author: WrainCN 123723620@qq.com
 * @Date: 2025-08-09 17:12:23
 * @LastEditors: wrainCN 123723620@qq.com
 * @LastEditTime: 2025-08-13 16:23:27
 * @Description: Advanced Search Component Types
 */
// 确保所有接口都是 export 的
export interface BaseFormItem {
  field: string
  label: string
  type?: 'input' | 'select' | 'date' | 'daterange' | 'number' | 'custom' | 'radio' | 'checkbox' | 'treeselect' | 'textarea' | 'numberrange' | 'time' | 'timerange'
  placeholder?: string
  clearable?: boolean
  default?: any
  hidden?: boolean
  displayValue?: (value: any, model: Record<string, any>) => string
  /**
   * 透传给Element Plus组件的属性
   * 可以是对象或函数，函数接收(elType, option)参数
   * elType: 组件类型，如 'input', 'select', 'datePicker' 等
   * option: 选项对象，仅对option组件有效
   */
  elProps?: Record<string, any> | ((elType: string, option?: SelectOption) => Record<string, any>)
}

export interface InputFormItem extends BaseFormItem {
  type?: 'input'
}

export interface TextareaFormItem extends BaseFormItem {
  type: 'textarea'
  shortPlaceholder?: string
  longPlaceholder?: string
}

export interface SelectOption {
  label: string
  value: any
  children?: SelectOption[]
}

export interface SelectFormItem extends BaseFormItem {
  type: 'select'
  multiple?: boolean
  options?: SelectOption[]
  filterable?: boolean
  remoteMethod?: (query: string) => Promise<SelectOption[]>
  remote?: boolean
  remoteSearchKey?: string
  loadOptions?: () => Promise<SelectOption[]>
}

export interface RadioFormItem extends BaseFormItem {
  type: 'radio'
  options?: SelectOption[]
}

export interface CheckboxFormItem extends BaseFormItem {
  type: 'checkbox'
  options?: SelectOption[]
}

export interface DateFormItem extends BaseFormItem {
  type: 'date'
}

export interface DaterangeFormItem extends BaseFormItem {
  type: 'daterange'
  startPlaceholder?: string
  endPlaceholder?: string
}

export interface TimeFormItem extends BaseFormItem {
  type: 'time'
  format?: string
  placeholder?: string
}

export interface TimerangeFormItem extends BaseFormItem {
  type: 'timerange'
  format?: string
  startPlaceholder?: string
  endPlaceholder?: string
}

export interface NumberFormItem extends BaseFormItem {
  type: 'number'
  min?: number
  max?: number
  controlsPosition?: '' | 'right'
}

export interface NumberrangeFormItem extends BaseFormItem {
  type: 'numberrange'
  min?: number
  max?: number
  minPlaceholder?: string
  maxPlaceholder?: string
  controlsPosition?: '' | 'right'
}

export interface TreeselectFormItem extends BaseFormItem {
  type: 'treeselect'
  multiple?: boolean
  options?: SelectOption[]
  nodeKey?: string
  props?: {
    value?: string
    label?: string
    children?: string
  }
  showCheckbox?: boolean
  maxDropdownHeight?: number
  filterable?: boolean
  remoteMethod?: (query: string) => Promise<SelectOption[]>
  remote?: boolean
  remoteSearchKey?: string
  loadOptions?: () => Promise<SelectOption[]>
}

export interface CustomFormItem extends BaseFormItem {
  type: 'custom'
  slotName?: string
}

export type FormItem = 
  | InputFormItem
  | TextareaFormItem
  | SelectFormItem
  | RadioFormItem
  | CheckboxFormItem
  | DateFormItem
  | DaterangeFormItem
  | TimeFormItem
  | TimerangeFormItem
  | NumberFormItem
  | NumberrangeFormItem
  | TreeselectFormItem
  | CustomFormItem

export interface SearchConfig {
  formItems: FormItem[]
  labelWidth?: string
  inline?: boolean
  itemsPerRow?: number
  popoverWidth?: number
}

// 添加默认导出声明
declare const ElementAdvancedSearch: import('vue').DefineComponent<{}, {}, any>
export default ElementAdvancedSearch