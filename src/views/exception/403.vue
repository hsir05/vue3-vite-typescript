<template>
  <Result status="403" title="403" sub-title="Sorry, you don't have access to this page.">
    <template #extra>
      <a-button type="primary" @click="handle">{{ t('backToHome') }}</a-button>
    </template>
  </Result>
</template>

<script>
  import { Result } from 'ant-design-vue'
  import { useRouter } from 'vue-router'
  import { defineComponent } from 'vue'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { defaultHomePath } from '/@/config/router.config'
  export default defineComponent({
    name: 'Exception403',
    components: {
      Result
    },
    setup() {
      const router = useRouter()
      const { t } = useI18n()
      const handle = () => {
        router.push(defaultHomePath)
      }
      return {
        handle,
        t
      }
    }
  })
</script>
