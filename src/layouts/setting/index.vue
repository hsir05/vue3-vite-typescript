<template>
  <span @click="openDrawer(true)">
    <SettingOutlined class="pd15 h-header-action-item" />
    <BasicDrawer :visible="visible" @handleClose="handleClose" />
  </span>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { SettingOutlined } from '@ant-design/icons-vue'
  import BasicDrawer from './BasicDrawer.vue'
  export default defineComponent({
    name: 'SettingButton',
    components: {
      SettingOutlined,
      BasicDrawer
    },
    setup() {
      const visible = ref<boolean>(false)

      function openDrawer(value: boolean) {
        visible.value = value
      }
      const handleClose = (value: boolean) => {
        visible.value = value
      }

      return {
        openDrawer,
        handleClose,
        visible
      }
    }
  })
</script>
