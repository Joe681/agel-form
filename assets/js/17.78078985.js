(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{362:function(e,l,a){"use strict";a.r(l);var n=[{label:"一级 1",value:"1",children:[{label:"二级 1-1",value:"1-1",children:[{label:"三级 1-1-1",value:"1-1-1"}]}]},{label:"一级 2",value:"2",children:[{label:"二级 2-1",value:"2-1",children:[{label:"三级 2-1-1",value:"2-1-1"}]},{label:"二级 2-2",value:"2-2",children:[{label:"三级 2-2-1",value:"2-2-1"}]}]}],t={data:function(){return{form:{"label-position":"right","label-width":"80px",span:18,data:{tree1:"2",tree2:["1-1-1","2-1-1"]},items:{tree1:{label:"普通树形",component:"el-input-tree",nodeKey:"value",data:n},tree2:{label:"多选树形",component:"el-input-tree",nodeKey:"value",showCheckbox:!0,leafOnly:!0,data:n},tree3:{label:"过滤树形",component:"el-input-tree",nodeKey:"value",filter:!0,data:n},tree4:{label:"懒加载树",component:"el-input-tree",nodeKey:"name",lazy:!0,props:{label:"name",children:"zones",isLeaf:"leaf"},load:function(e,l){return 0===e.level?l([{name:"region"}]):e.level>1?l([]):void setTimeout((function(){l([{name:"leaf",leaf:!0},{name:"zone"}])}),500)}}}}}},methods:{getRef:function(){console.log(this.form.getRef("tree1"))}}},o=a(15),r=Object(o.a)(t,(function(){var e=this,l=e.$createElement,a=e._self._c||l;return a("div",{staticClass:"demo"},[a("agel-form",{model:{value:e.form,callback:function(l){e.form=l},expression:"form"}}),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.getRef}},[e._v("获取组件实例（控制台）")])],1)}),[],!1,null,null,null);l.default=r.exports}}]);