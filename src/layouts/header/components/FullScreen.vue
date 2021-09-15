<template>
  <a-tooltip :title="getTitle" placement="bottom" :mouse-enter-delay="0.5">
    <span @click="toggle">
      <MyIcon
        type="icon-full-screen"
        v-if="!isFullscreen"
        class="pd15 h-header-action-item"
        style="font-size: 18px"
      />
      <MyIcon
        type="icon-fullscreenexit1"
        v-else
        class="pd15 h-header-action-item"
        style="font-size: 18px"
      />
    </span>
  </a-tooltip>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { useFullscreen } from '@vueuse/core'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useI18n } from '/@/hooks/web/useI18n'
  export default defineComponent({
    name: 'FullScreen',
    components: {
      MyIcon
    },
    setup() {
      const { t } = useI18n()
      const { toggle, isFullscreen } = useFullscreen()
      const getTitle = computed(() => {
        return unref(isFullscreen) ? t('tooltipExitFull') : t('tooltipEntryFull')
      })
      return {
        toggle,
        getTitle,
        isFullscreen
      }
    }
  })
</script>
