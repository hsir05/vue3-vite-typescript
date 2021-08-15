<template>
  <Result status="500" title="500" sub-title="Sorry, the server is reporting an error.">
    <template #extra>
      <a-button type="primary" @click="handle"> Back Home </a-button>
    </template>
  </Result>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Result } from 'ant-design-vue'
  import { useRouter } from 'vue-router'
  export default defineComponent({
    name: 'Exception500',
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
