<template>
  <el-select
    class="agel-tree-select agel-item-loading"
    v-loading="optionsLoading"
    :popper-class="treePopperClass"
    ref="select"
    :value="selectValue"
    :multiple="multiple"
    :disabled="disabled"
    :collapseTags="collapseTags"
    :clearable="clearable"
    :loading="optionsLoading"
    :placeholder="placeholder"
    :loading-text="loadingText"
    v-on="$listeners"
    @click.native="initScroll"
    @clear="handleClear"
  >
    <template v-slot:prefix>
      <slot name="prefix"></slot>
    </template>
    <div class="filter-item" v-if="filter">
      <el-input
        v-model="filterText"
        placeholder="输入关键字进行过滤"
        size="mini"
      ></el-input>
    </div>
    <el-option value="" disabled>
      <!-- :data="lazy?undefined:treeData" -->
      <el-tree
        ref="ref"
        class="tree-option"
        :data="treeData"
        :lazy="lazy"
        :load="loadNode"
        :props="props"
        :show-checkbox="multiple"
        :highlight-current="!multiple"
        :node-key="nodeKey"
        :expand-on-click-node="expandOnClickNode"
        :filter-node-method="handleFilterNode"
        v-bind="$attrs"
        v-on="$listeners"
        @current-change="handleCurrentChange"
        @check="handleCheck"
      >
        <slot name="option" slot-scope="scope" v-bind="scope">
          <span
            class="el-tree-node__label"
            :style="scope.data.style"
            :class="scope.data.class"
            >{{ scope.node.label }}</span
          >
        </slot>
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
import optionsMinxin from "../utils/optionsMinxin";
import { getProp } from "../utils/utils";
import { isEmpty } from "element-ui/src/utils/util";

export default {
  name: "agel-tree-select",
  inheritAttrs: false,
  mixins: [optionsMinxin],
  props: {
    value: [String, Number, Array],
    filter: Boolean,
    leafOnly: Boolean,
    includeHalfChecked: Boolean,
    lazy: Boolean,
    load: Function,
    props: Object, // 使用 el-tree 的 props 解析， 覆盖 optionsMinxin 默认函数
    multiple: Boolean,
    placeholder: String,
    disabled: Boolean,
    clearable: Boolean,
    collapseTags: Boolean,
    popperClass: String,
    loadingText: {
      type: String,
      default: "加载中...",
    },
    expandOnClickNode: {
      type: Boolean,
      defalult: false,
    },
  },
  data() {
    return {
      proxyInputing: false,
      filterText: "",
      checkedNodes: [],
      currentNode: null,
    };
  },
  computed: {
    labelKey() {
      let props = this.props || {};
      return props.label || "label";
    },
    nodeKey() {
      return this.lazy
        ? this.labelKey
        : getProp(this.$attrs, "nodeKey") || this.labelKey;
    },
    treeData() {
      if (this.lazy) {
        return undefined;
      } else {
        return !isEmpty(this.proxyOptions)
          ? this.proxyOptions
          : this.$attrs.data || [];
      }
    },
    selectValue() {
      if (this.lazy && this.checkedNodes.length == 0 && !this.currentNode) {
        return this.proxyValue;
      } else {
        return this.multiple
          ? this.checkedNodes.map((node) => node[this.labelKey])
          : this.currentNode
          ? this.currentNode[this.labelKey]
          : "";
      }
    },
    treePopperClass() {
      return `agel-tree-select-popper ${this.popperClass || ""}`;
    },
  },
  watch: {
    filterText(val) {
      this.$refs.ref.filter(val);
    },
    proxyValue() {
      if (this.proxyInputing) return;
      this.setSelected(); // 由组件外部修改 value 时触发
    },
  },
  mounted() {
    this.setSelected();
  },
  methods: {
    handleCurrentChange(nodeData, treeNode) {
      if (treeNode.disabled) return;
      this.currentNode = this.getValueOption();
      this.emitInput(this.currentNode[this.nodeKey]);
      this.blur();
    },
    handleCheck() {
      this.checkedNodes = this.getValueOption();
      this.emitInput(this.checkedNodes.map((v) => v[this.nodeKey]));
    },
    handleFilterNode(filterText, data) {
      let value = filterText.trim();
      if (value === "") return true;
      let filterNodeMethod = getProp(this.$attrs, "filterNode");
      if (filterNodeMethod) {
        return filterNodeMethod(value, data);
      } else {
        return String(data[this.labelKey]).indexOf(value) !== -1;
      }
    },
    handleClear() {
      let tree = this.$refs.ref;
      if (this.multiple) {
        let nodes = this.getValueOption();
        nodes.forEach((node) => tree.setChecked(node, false));
        this.checkedNodes = [];
        this.emitInput([]);
      } else {
        tree.setCurrentKey(null);
        this.currentNode = null;
        this.emitInput("");
      }
    },
    loadNode(node, resolve) {
      if (!this.load) return;
      this.load(node, (nodes) => {
        resolve(nodes);
        this.$nextTick(() => {
          this.setSelected();
          let equal = Array.isArray(this.selectValue)
            ? this.selectValue.join() == this.proxyValue.join()
            : this.selectValue == this.proxyValue;
          if (!equal) this.emitInput(this.selectValue);
        });
      });
    },
    // 代理掉 el-select 的 input 事件
    emitInput(value) {
      if (value === this.value) return;
      this.proxyInputing = true;
      this.proxyInput(value);
      this.proxyChange();
      this.$nextTick(() => (this.proxyInputing = false));
    },
    initScroll() {
      let classname =
        ".agel-tree-select-popper .el-scrollbar .el-select-dropdown__wrap";
      setTimeout(() => {
        this.$nextTick(() => {
          document
            .querySelectorAll(classname)
            .forEach((el) => (el.scrollTop = 0));
        });
      }, 0);
    },
    // 使用 el-tree 的 props 解析， 覆盖 optionsMinxin 默认函数
    transformOptions(options) {
      return options;
    },
    // 暴露出去的功能函数
    // 根据 value 选中 高亮 树节点
    setSelected() {
      let tree = this.$refs.ref;
      if (!tree) return;
      if (isEmpty(this.proxyValue)) {
        this.handleClear();
      } else if (this.multiple) {
        tree.setCheckedKeys(this.proxyValue);
        this.checkedNodes = this.getValueOption();
      } else {
        tree.setCurrentKey(this.proxyValue);
        this.currentNode = this.getValueOption();
      }
    },
    getValueOption() {
      let tree = this.$refs.ref;
      if (!tree) return null;
      return this.multiple
        ? tree.getCheckedNodes(this.leafOnly, this.includeHalfChecked)
        : tree.getCurrentNode();
    },
    focus() {
      this.$refs.select.focus();
    },
    blur() {
      this.$refs.select.blur();
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>

<style>
.agel-tree-select .el-tag__close {
  display: none;
}

.agel-tree-select-popper .filter-item {
  padding: 0px 10px;
  margin-bottom: 10px;
}

.agel-tree-select-popper
  .el-scrollbar
  .el-scrollbar__view
  .el-select-dropdown__item {
  height: auto;
  padding: 0;
}

.agel-tree-select-popper .selected {
  font-weight: inherit;
}
</style>
