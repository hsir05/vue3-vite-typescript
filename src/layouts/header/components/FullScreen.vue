<template>
  <a-tooltip :title="getTitle" placement="bottom" :mouse-enter-delay="0.5">
    <span @click="toggle">
      <MyIcon type="icon-fullscreen" v-if="!isFullscreen" class="pd15 h-header-action-item" />
      <MyIcon type="icon-fullscreen-exit" v-else class="pd15 h-header-action-item" />
    </span>
  </a-tooltip>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { useFullscreen } from '@vueuse/core'
  import MyIcon from '/@/components/MyIcon/index.vue'

  export default defineComponent({
    name: 'FullScreen',
    components: {
      MyIcon
    },
    setup() {
      const { toggle, isFullscreen } = useFullscreen()
      const getTitle = computed(() => {
        return unref(isFullscreen) ? '退出全屏' : '全屏'
      })
      return {
        toggle,
        getTitle,
        isFullscreen
      }
    }
  })
</script>
