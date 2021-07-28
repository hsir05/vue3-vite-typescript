<template>
  <a-result status="500" title="500" sub-title="Sorry, the server is reporting an error.">
    <template #extra>
      <a-button type="primary"> Back Home </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Exception500'
  })
</script>
