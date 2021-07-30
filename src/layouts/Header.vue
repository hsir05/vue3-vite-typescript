<template>
  <a-layout-header class="h-header bb">
    <div class="h-header-top">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="() => (collapsed = !collapsed)"
      />
      <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />

      <a-breadcrumb>
        <a-breadcrumb-item>User</a-breadcrumb-item>
        <a-breadcrumb-item>Bill</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </a-layout-header>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'Header',
    components: {
      MenuUnfoldOutlined,
      MenuFoldOutlined
    },
    setup() {
      const state = reactive({
        collapsed: false,
        selectedKeys: [1]
      })
      return {
        ...toRefs(state)
      }
    }
  })
</script>
<style lang="less" scoped>
  .trigger {
    font-size: 18px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
  .h-header {
    background: @white;
    padding: 0;
    height: 45px;
    .flexed();
    .h-header-top {
      @a: flex-start;
      .flexed();
    }
  }
</style>
