<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :media-query="query"
    :is-mobile="isMobile"
    :handle-media-query="handleMediaQuery"
    :handle-collapse="handleCollapse"
    :i18n-render="i18nRender"
    v-bind="settings"
  >
    <router-view />
  </pro-layout>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import defaultSettings from '/@/config/defaultSettings'
  import { CONTENT_WIDTH_TYPE } from '/@/store/mutation-types'
  export default defineComponent({
    name: 'BaseLayout',
    setup() {
      let state = reactive({
        menus: [],
        collapsed: false,
        query: {},
        isMobile: false,
        settings: {
          // 布局类型
          layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
          // CONTENT_WIDTH_TYPE
          contentWidth:
            defaultSettings.layout === 'sidemenu'
              ? CONTENT_WIDTH_TYPE.Fluid
              : defaultSettings.contentWidth,
          // 主题 'dark' | 'light'
          theme: defaultSettings.navTheme,
          // 主色调
          primaryColor: defaultSettings.primaryColor,
          fixedHeader: defaultSettings.fixedHeader,
          fixSiderbar: defaultSettings.fixSiderbar,
          colorWeak: defaultSettings.colorWeak,

          hideHintAlert: false,
          hideCopyButton: false
        }
      })
      const handleMediaQuery = () => {}
      const handleCollapse = () => {}
      const i18nRender = () => {}

      return {
        ...toRefs(state),
        handleMediaQuery,
        handleCollapse,
        i18nRender
      }
    }
  })
</script>
<style lang="scss"></style>
