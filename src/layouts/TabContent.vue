<template>
  <router-link to="/dashboard/analysis" class="tab-content">分析页</router-link>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'TabContent'
  })
</script>
<style lang="less">
  .tab-content {
    color: #666;
    font-weight: 500;
  }
</style>
