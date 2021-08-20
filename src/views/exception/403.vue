<template>
  <Result status="403" title="403" sub-title="Sorry, you don't have access to this page.">
    <template #extra>
      <a-button type="primary" @click="handle">Back Home</a-button>
    </template>
  </Result>
</template>

<script>
  import { Result } from 'ant-design-vue'
  import { useRouter } from 'vue-router'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Exception403',
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
