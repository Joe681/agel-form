# 序言

## 介绍

[agel-form](https://github.com/agrass-GitHub/agel-form) 是基于 [element-ui form](https://element.eleme.cn/#/zh-CN/component/form) 的二次封装，极简的思想，完全的数据驱动，拥有绝对的灵活性，可以帮助你更快速的开发！up! up! up!
[![npm](https://img.shields.io/npm/v/agel-form.svg)](https://www.npmjs.com/package/agel-form)
[![download](https://img.shields.io/npm/dt/agel-form)](https://npmcharts.com/compare/agel-form?minimal=true)

## 特性

该组件的思想就是以一个 form 对象来做所有的操作，它做了如下事情：

- 支持 element-ui 所有表单组件 attributes 配置
- 支持 element-ui 所有表单组件 events 事件
- 支持 element-ui 所有表单组件 slots 插槽
- 支持 element-ui Row Col 组件布局
- 支持 element-ui Descriptions 组件布局
- 响应式布局
- 联动显示隐藏禁用
- 智能回填 form.data，placeholder，rules
- 全局配置
- 数据化的基础组件
- 灵活自定义组件 / 搭配第三方组件


### 单组件

为了更好的搭配 agel-form，将 `element-ui` 其中几个常见的组件进行了数据化，在使用方式上同原组件保持一致，没有任何的破坏性，并且额外添加了扩展功能，完全可以代替原组件进行开发使用。

另外添加了一些其他单组件，你可以按需使用。

- [agel-select](https://agrass.gitee.io/agel-form/component/agel-select.html) 
- [agel-checkbox](https://agrass.gitee.io/agel-form/component/agel-checkbox-radio.html) 
- [agel-radio](https://agrass.gitee.io/agel-form/component/agel-checkbox-radio.html) 
- [agel-upload](https://agrass.gitee.io/agel-form/component/agel-upload.html) 
- [agel-tree-select](https://agrass.gitee.io/agel-form/component/agel-tree-select.html) 
- [agel-search-panel](https://agrass.gitee.io/agel-form/component/agel-search-panel.html) 
- [agel-form-dialog](https://agrass.gitee.io/agel-form/component/agel-form-dialog.html) 

### 例子

<ClientOnly><basics-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/basics-form.vue
:::