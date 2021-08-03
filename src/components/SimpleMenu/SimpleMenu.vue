<template>
  <div>33</div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import type { Menu as MenuType } from '/@/router/types'
  export default defineComponent({
    name: 'SimpleMenu',
    props: {
      items: {
        type: Array as PropType<MenuType[]>,
        default: () => []
      }
    },
    setup() {}
  })
</script>
