# Select 选择器

`agel-select` 组件是基于 `el-select` 组件的二次封装组件。

## 搭配表单使用

`options` 属性支持多种数据类型，`String`，`Array[String]`，`Array[Object]`，`Promise`，`Function`，若是 `Function` 类型，可以通过 `getRef` 获取组件实例调用 `getOptions` 进行主动刷新。

多选时 `value` 属性可以设置为数组 `[xx1,xx2]` 或者字符串 `xx1,xx2`，逗号间隔，默认为字符串。

`filter` 属性可以开启关键字过滤，和 `filterable` 功能类似。

<ClientOnly><select-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/select-form.vue
:::

## 单独引入使用

<ClientOnly><select-demo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/select-demo.vue
:::

## Select Attributes

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......        | .........   | 支持 [el-select 属性](https://element.eleme.cn/#/zh-CN/component/select#select-attributes)      | 
| filter      | Boolean       | false       | 是否开启过滤查询                | 
| options     | String/Array/Function/Promise    |  -     | option 配置项         | 
| props       | Object        |  {label,value}     | 数据配置选项          |

## Select Option

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......        | .........   | 支持 [el-select option group  属性](https://element.eleme.cn/#/zh-CN/component/select#option-attributes)      | 
| class       | Boolean       |  -                 | class名称    |
| style       | Object/String        | -           | 内联样式     |  

## Select Slots

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| default        |  默认插槽           |
| prefix         |  Select 组件头部内容                        |
| empty          |  无选项时的列表                        | 
| option         |  每一个选择项插槽，参数 {option,index,group} |

## Select Methods

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| focus         | -             |  聚焦                        |
| blur          | -             |  失焦            | 
| setSelected      | -          |  刷新选中状态          |
| getOptions    | -             |  刷新数据， options 为 Function 时可调用           |
| getValueOption  | -           |  返回 value 所对应的 option 对象，多选时为数组 |

## Select Events

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| ......        | ......        | 支持 [el-select 事件](https://element.eleme.cn/#/zh-CN/component/select#tree-events)      | 

