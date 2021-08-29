<template>
  <div class="" style="width: 100%">
    <slot></slot>
    <a-layout-content style="margin: 15px 10px 0; text-align: left">
      <div :style="{ padding: '10px', background: '#fff', minHeight: 'calc(100vh - 140px)' }">
        <router-view />
      </div>
    </a-layout-content>
    <slot name="footer"></slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Content',
    components: {},
    setup() {
      return {}
    }
  })
</script>
