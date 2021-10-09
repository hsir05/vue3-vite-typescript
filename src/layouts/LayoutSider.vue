<template>
  <Sider v-model:collapsed="getCollapsed" :class="['h-sider-bg', active ? 'h-sider-active' : '']">
    <AppLogo v-if="getLayoutMode === 'sidebar'" />
    <HMenu :isHorizontal="false" />
  </Sider>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Layout } from 'ant-design-vue'
  import AppLogo from './AppLogo.vue'
  import HMenu from './HMenu.vue'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { subMenuEmitter } from '/@/layouts/menuChange'

  export default defineComponent({
    name: 'LayoutSider',
    components: {
      AppLogo,
      HMenu,
      Sider: Layout.Sider
    },
    setup() {
      const { getCollapsed } = useMenuSetting()
      const { getLayoutMode } = useHeaderSetting()

      // 函数待优化
      const active = ref(false)
      if (getLayoutMode.value === 'mix-sidebar') {
        active.value = true
      }

      subMenuEmitter.on('listenMenuData', (childrenMenuData) => {
        active.value = childrenMenuData.length > 0 ? false : true
      })

      return {
        getCollapsed,
        getLayoutMode,
        active
      }
    }
  })
</script>
<style lang="less">
  .h-sider-bg.ant-layout-sider {
    background-color: var(--sider-dark-bg-color);
  }
  .h-sider-active.ant-layout-sider {
    flex: 0 0 0 !important;
    max-width: 200px;
    min-width: 0 !important;
  }
  .ant-menu-vertical .ant-menu-item:not(:last-child) {
    margin-top: 0;
  }

  .h-sider-bg {
    .ant-menu.ant-menu-dark {
      background-color: var(--sider-dark-bg-color);
    }
    .ant-menu-dark .ant-menu-inline.ant-menu-sub {
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
