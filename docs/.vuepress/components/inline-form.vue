<template>
  <agel-form class="demo" v-model="form"></agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        inline: true,
        data: {},
        items: [
          // component 该属性不填写将默认为 el-input
          { prop: "user", label: "审批人", style: "width:120px" },
          {
            prop: "region",
            component: "el-select",
            label: "活动区域",
            options: ["区域一", "区域二"],
          },
          {
            component: "el-button",
            type: "primary",
            icon: "el-icon-search",
            slots: "查询", // 按钮插槽
            on: {
              click: () => this.$message.info("查询"),
            },
          },
        ],
      },
    };
  },
};
</script>