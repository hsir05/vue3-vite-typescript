<template>
  <Result status="500" title="500" sub-title="Sorry, the server is reporting an error.">
    <template #extra>
      <a-button type="primary" @click="handle">{{ t('backToHome') }}</a-button>
    </template>
  </Result>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Result } from 'ant-design-vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { defaultHomePath } from '/@/config/router.config'

  export default defineComponent({
    name: 'Exception500',
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
