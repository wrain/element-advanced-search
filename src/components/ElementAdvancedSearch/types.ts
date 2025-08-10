/*
 * @Author: WrainCN 123723620@qq.com
 * @Date: 2025-08-09 17:12:23
 * @LastEditors: WrainCN 123723620@qq.com
 * @LastEditTime: 2025-08-10 14:01:31
 * @Description: Advanced Search Component Types
 */
export interface BaseFormItem {
  /**
   * 字段名
   */
  field: string
  /**
   * 标签名
   */
  label: string
  /**
   * 表单类型
   * @default 'input'
   */
  type?: 'input' | 'select' | 'date' | 'daterange' | 'number' | 'custom' | 'radio' | 'checkbox' | 'treeselect' | 'textarea' | 'numberrange'
  /**
   * 占位符
   */
  placeholder?: string
  /**
   * 是否可清空
   * @default true
   */
  clearable?: boolean
  /**
   * 默认值
   */
  default?: any
  /**
   * 是否隐藏
   * @default false
   */
  hidden?: boolean
}

export interface InputFormItem extends BaseFormItem {
  type?: 'input'
}

export interface TextareaFormItem extends BaseFormItem {
  type: 'textarea'
  /**
   * 短文本输入状态的占位符
   */
  shortPlaceholder?: string
  /**
   * 长文本输入状态的占位符
   */
  longPlaceholder?: string
}

export interface SelectOption {
  label: string
  value: any
  children?: SelectOption[]
}

export interface SelectFormItem extends BaseFormItem {
  type: 'select'
  /**
   * 是否多选
   * @default false
   */
  multiple?: boolean
  /**
   * 选项
   */
  options?: SelectOption[]
  /**
   * 是否可过滤
   * @default false
   */
  filterable?: boolean
  /**
   * 远程搜索方法
   * @param query 搜索关键词
   */
  remoteMethod?: (query: string) => Promise<SelectOption[]>
  /**
   * 是否启用远程搜索
   * @default false
   */
  remote?: boolean
  /**
   * 搜索关键词
   */
  remoteSearchKey?: string
  /**
   * 延迟加载数据的方法（用于初始化时异步加载数据）
   */
  loadOptions?: () => Promise<SelectOption[]>
}

export interface RadioFormItem extends BaseFormItem {
  type: 'radio'
  /**
   * 选项
   */
  options?: SelectOption[]
}

export interface CheckboxFormItem extends BaseFormItem {
  type: 'checkbox'
  /**
   * 选项
   */
  options?: SelectOption[]
}

export interface DateFormItem extends BaseFormItem {
  type: 'date'
}

export interface DaterangeFormItem extends BaseFormItem {
  type: 'daterange'
  /**
   * 开始日期占位符
   * @default '开始日期'
   */
  startPlaceholder?: string
  /**
   * 结束日期占位符
   * @default '结束日期'
   */
  endPlaceholder?: string
}

export interface NumberFormItem extends BaseFormItem {
  type: 'number'
  /**
   * 最小值
   */
  min?: number
  /**
   * 最大值
   */
  max?: number
  /**
   * 控制按钮位置
   * @default ''
   */
  controlsPosition?: '' | 'right'
}

export interface NumberrangeFormItem extends BaseFormItem {
  type: 'numberrange'
  /**
   * 最小值
   */
  min?: number
  /**
   * 最大值
   */
  max?: number
  /**
   * 最小值占位符
   */
  minPlaceholder?: string
  /**
   * 最大值占位符
   */
  maxPlaceholder?: string
  /**
   * 控制按钮位置
   * @default ''
   */
  controlsPosition?: '' | 'right'
}

export interface TreeselectFormItem extends BaseFormItem {
  type: 'treeselect'
  /**
   * 是否多选
   * @default false
   */
  multiple?: boolean
  /**
   * 选项
   */
  options?: SelectOption[]
  /**
   * 节点键值
   * @default 'value'
   */
  nodeKey?: string
  /**
   * 标签键值
   */
  props?: {
    value?: string
    label?: string
    children?: string
  }
  /**
   * 是否显示复选框
   * @default false
   */
  showCheckbox?: boolean
  /**
   * 下拉面板最大高度
   * @default 300
   */
  maxDropdownHeight?: number
  /**
   * 是否可过滤
   * @default false
   */
  filterable?: boolean
  /**
   * 远程搜索方法
   * @param query 搜索关键词
   */
  remoteMethod?: (query: string) => Promise<SelectOption[]>
  /**
   * 是否启用远程搜索
   * @default false
   */
  remote?: boolean
  /**
   * 搜索关键词
   */
  remoteSearchKey?: string
  /**
   * 延迟加载数据的方法（用于初始化时异步加载数据）
   */
  loadOptions?: () => Promise<SelectOption[]>
}

export interface CustomFormItem extends BaseFormItem {
  type: 'custom'
  /**
   * 插槽名称
   */
  slotName?: string,
  /**
   * 显示值
   */
  displayValue?: (value: any, model: Record<string, any>) => string
}

export type FormItem = 
  | InputFormItem
  | TextareaFormItem
  | SelectFormItem
  | RadioFormItem
  | CheckboxFormItem
  | DateFormItem
  | DaterangeFormItem
  | NumberFormItem
  | NumberrangeFormItem
  | TreeselectFormItem
  | CustomFormItem

export interface SearchConfig {
  /**
   * 表单项配置
   */
  formItems: FormItem[]
  /**
   * 表单项标签宽度
   * @default '100px'
   */
  labelWidth?: string
  /**
   * 是否行内表单
   * @default true
   */
  inline?: boolean
  /**
   * 每行显示的表单项数量
   * @default 2
   */
  itemsPerRow?: number
  /**
   * 弹出层宽度
   * @default 800
   */
  popoverWidth?: number
}