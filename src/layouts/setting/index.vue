<template>
  <span @click="openDrawer(true)">
    <SettingOutlined class="pd15 h-header-action-item" />
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { SettingOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    name: 'SettingButton',
    components: {
      SettingOutlined
    },
    setup() {
      function openDrawer(bool: Boolean) {
        console.log(bool)
      }
      return {
        openDrawer
      }
    }
  })
</script>
