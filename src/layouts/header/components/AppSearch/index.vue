<template>
  <a-tooltip placement="bottom">
    <template #title>
      <span>搜索</span>
    </template>
    <MyIcon type="icon-search" class="pd15 h-header-action-item" />
  </a-tooltip>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  export default defineComponent({
    name: 'AppSearch',
    components: {
      MyIcon
    }
  })
</script>
