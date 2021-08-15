<template>
  <Result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary"> Back Home </a-button>
    </template>
  </Result>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Result } from 'ant-design-vue'
  import { useRouter } from 'vue-router'
  export default defineComponent({
    name: 'Exception404',
    components: {
      Result
    },
    setup() {
      const router = useRouter()

      const handle = () => {
        router.push('/dashboard/analysis')
      }
      return {
        handle
      }
    }
  })
</script>
