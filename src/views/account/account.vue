<template>
  <section class="account flex">
    <Department />
    <DepartmentContent />
  </section>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import Department from './components/departentment.vue'
  import DepartmentContent from './components/departmentContent.vue'
  export default defineComponent({
    name: 'Account',
    components: {
      Department,
      DepartmentContent
    },
    setup() {}
  })
</script>
<style lang="less">
  .account {
    height: 100%;
  }
</style>
