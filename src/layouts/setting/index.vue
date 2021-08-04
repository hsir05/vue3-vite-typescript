<template>
  <span @click="openDrawer(true)">
    <SettingOutlined class="pd15 h-header-action-item" />
    <SettingDrawer />
  </span>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { SettingOutlined } from '@ant-design/icons-vue'
  import SettingDrawer from './SettingDrawer'
  export default defineComponent({
    name: 'SettingButton',
    components: {
      SettingOutlined,
      SettingDrawer
    },
    setup() {
      const visible = ref(true)
      function openDrawer(bool: Boolean) {
        console.log(bool)
      }
      return {
        openDrawer,
        visible
      }
    }
  })
</script>
