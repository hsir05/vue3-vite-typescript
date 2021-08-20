<template>
  <router-link to="/dashboard/analysis" class="tab-content">{{ getTitle }}</router-link>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import type { PropType } from 'vue'
  import type { RouteLocationNormalized } from 'vue-router'

  export default defineComponent({
    name: 'TabContent',
    props: {
      tabItem: {
        type: Object as PropType<RouteLocationNormalized>,
        default: null
      },
      isExtra: Boolean
    },
    setup(props) {
      const getTitle = computed(() => {
        const { tabItem: { meta } = {} } = props
        return meta && (meta.title as string)
      })
      return {
        getTitle
      }
    }
  })
</script>
<style lang="less">
  .tab-content {
    color: #666;
    font-weight: 500;
  }
</style>
