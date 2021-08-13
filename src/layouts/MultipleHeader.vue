<template>
  <div class="multiple-header pt5 pb5">
    <div class="ml10">
      <a-button type="primary" size="small">分析页</a-button>
    </div>
    <div class="mr10 multiple-header-icon">
      <a-divider type="vertical" />
      <RedoOutlined class="multiple-icon-item" />
      <a-divider type="vertical" />
      <DownOutlined class="multiple-icon-item" />
      <a-divider type="vertical" />
      <FullscreenExitOutlined v-if="isTabsExtra" />
      <FullscreenOutlined v-else class="multiple-icon-item" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import {
    RedoOutlined,
    DownOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined
  } from '@ant-design/icons-vue'
  export default defineComponent({
    name: 'MultipleHeader',
    components: {
      RedoOutlined,
      FullscreenOutlined,
      DownOutlined,
      FullscreenExitOutlined
    },
    setup() {
      const isTabsExtra = ref(false)
      return {
        isTabsExtra
      }
    }
  })
</script>
<style lang="less">
  .multiple-header {
    .flexed();
    cursor: pointer;
    background-color: @white;
    .multiple-header-icon {
      color: @iconColor;
    }
    .multiple-icon-item {
      &:hover {
        color: @iconHoverColor;
      }
    }
  }
</style>
