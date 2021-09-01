<template>
  <a-tooltip :title="getTitle" placement="bottom" :mouse-enter-delay="0.5">
    <span @click="toggle">
      <FullscreenOutlined v-if="!isFullscreen" class="pd15 h-header-action-item" />
      <FullscreenExitOutlined v-else class="pd15 h-header-action-item" />
    </span>
  </a-tooltip>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { useFullscreen } from '@vueuse/core'
  import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    name: 'FullScreen',
    components: {
      FullscreenOutlined,
      FullscreenExitOutlined
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
