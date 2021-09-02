<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" />
    <LineChart :loading="loading" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import GrowCard from './components/GrowCard.vue'
  import LineChart from './components/LineChart.vue'
  export default defineComponent({
    name: 'Dashboard',
    components: {
      GrowCard,
      LineChart
    },
    setup() {
      const loading = ref(true)
      setTimeout(() => {
        loading.value = false
      }, 1500)
      return {
        loading
      }
    }
  })
</script>
<style lang="less">
  .enter-y {
    display: flex;
  }
  .md:w {
    width: 25%;
  }
</style>
