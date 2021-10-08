<template>
  <Modal
    width="800px"
    :destroyOnClose="true"
    :confirmLoading="loading"
    v-model:visible="visible"
    :title="t('comp.cropperImage')"
    :okText="t('cropper.okText')"
    :cancelText="t('cancelText')"
    :maskClosable="false"
    @ok="handleOk"
  >
    <HCropper ref="hCropperRef" @handleCropper="handleChancel" />
  </Modal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Modal } from 'ant-design-vue'
  import HCropper from './index.vue'
  import { useI18n } from '/@/hooks/web/useI18n'
  export default defineComponent({
    name: 'HCropperModal',
    components: {
      Modal,
      HCropper
    },
    setup() {
      const visible = ref(false)
      const loading = ref(false)
      const hCropperRef = ref()
      const { t } = useI18n()

      function handleOk() {
        loading.value = true
        hCropperRef.value.finish('blob')
      }
      function handleChancel() {
        loading.value = false
        visible.value = false
      }

      return {
        visible,
        loading,
        hCropperRef,

        handleOk,
        handleChancel,
        t
      }
    }
  })
</script>
