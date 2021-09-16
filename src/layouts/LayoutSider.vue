<template>
  <Sider v-model:collapsed="getCollapsed" class="h-sider-bg">
    <AppLogo v-if="getLayoutMode === 'sidebar'" class="sidebar" />
    <HMenu :isHorizontal="false" :theme="getMenuTheme" />
  </Sider>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue'
  import { Layout } from 'ant-design-vue'
  import AppLogo from './AppLogo.vue'
  import HMenu from './HMenu.vue'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'

  export default defineComponent({
    name: 'LayoutSider',
    components: {
      AppLogo,
      HMenu,
      Sider: Layout.Sider
    },
    setup() {
      const { getCollapsed, getMenuBgColor, getMenuTheme, setMenuSetting } = useMenuSetting()
      const { getLayoutMode } = useHeaderSetting()

      const handleCollapsed = () => {
        setMenuSetting({ collapsed: !unref(getCollapsed) })
      }
      return {
        getCollapsed,
        handleCollapsed,
        getLayoutMode,
        getMenuBgColor,
        getMenuTheme
      }
    }
  })
</script>
<style lang="less">
  .h-sider-bg.ant-layout-sider {
    background-color: var(--sider-dark-bg-color);
  }
  .h-sider-bg {
    .ant-menu.ant-menu-dark {
      // background-color: var(--sider-dark-darken-bg-color);
      background-color: var(--sider-dark-bg-color);
    }
    .ant-menu-dark .ant-menu-inline.ant-menu-sub {
      //  background-color: var(--sider-dark-bg-color);
      background-color: var(--sider-dark-darken-bg-color);
    }
  }
  //  左侧导航菜单收缩后hover菜单样式
  .ant-menu-dark .ant-menu-sub,
  .ant-menu.ant-menu-dark .ant-menu-sub.ant-menu-vertical {
    background-color: var(--sider-dark-darken-bg-color);
  }

  .ant-tooltip-inner {
    background-color: var(--sider-dark-darken-bg-color);
  }
</style>
