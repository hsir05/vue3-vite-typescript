<template>
  <span @click="openDrawer(true)">
    <MyIcon type="icon-setting" class="pd15 h-header-action-item" style="font-size: 20px" />

    <BasicDrawer :visible="visible" @handleClose="handleClose" />
  </span>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import BasicDrawer from './BasicDrawer.vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  export default defineComponent({
    name: 'SettingButton',
    components: {
      BasicDrawer,
      MyIcon
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
