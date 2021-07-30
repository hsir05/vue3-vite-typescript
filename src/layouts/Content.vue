<template>
  <a-layout-content style="margin: 15px; text-align: left">
    <div :style="{ padding: '10px', background: '#fff', minHeight: 'calc(100vh - 155px)' }">
      <router-view />
    </div>
  </a-layout-content>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Content',
    setup() {}
  })
</script>
