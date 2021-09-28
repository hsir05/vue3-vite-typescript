<template>
  <Modal
    width="750px"
    v-model:visible="visible"
    title="头像裁剪"
    :maskClosable="false"
    @ok="handleOk"
  >
    <HCropper />
  </Modal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Modal } from 'ant-design-vue'
  import HCropper from './index.vue'
  export default defineComponent({
    name: 'HCropperModal',
    components: {
      Modal,
      HCropper
    },
    setup() {
      const visible = ref(false)

      function handleOk() {}

      return {
        visible,

        handleOk
      }
    }
  })
</script>
<style lang="less"></style>
