<template>
  <a-tooltip placement="bottom">
    <template #title>
      <span>消息</span>
    </template>
    <BellOutlined class="pd15 h-header-action-item" />
  </a-tooltip>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { BellOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    name: 'Notify',
    components: {
      BellOutlined
    }
  })
</script>
