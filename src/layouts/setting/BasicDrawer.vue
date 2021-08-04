<template>
  <Drawer
    title="项目配置"
    placement="right"
    :closable="true"
    :destroyOnClose="true"
    :maskClosable="false"
    v-model:visible="visible"
    :after-visible-change="afterVisibleChange"
  >
    <div>333333</div>
  </Drawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Drawer } from 'ant-design-vue'
  export default defineComponent({
    name: 'SettingDrawer',
    components: {
      Drawer
    },
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
