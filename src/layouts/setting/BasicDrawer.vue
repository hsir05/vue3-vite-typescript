<template>
  <a-drawer
    title="Basic Drawer"
    placement="right"
    :closable="false"
    v-model:visible="visible"
    :after-visible-change="afterVisibleChange"
  >
    <div>333333</div>
  </a-drawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    name: 'SettingDrawer',
    setup() {
      const visible = ref<boolean>(true)
      const afterVisibleChange = (bool: boolean) => {
        console.log('visible', bool)
      }

      const showDrawer = () => {
        // visible.value = true;
      }

      return {
        afterVisibleChange,
        showDrawer,
        visible
      }
    }
  })
</script>
