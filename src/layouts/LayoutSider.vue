<template>
  <Sider v-model:collapsed="getCollapsed" collapsible>
    <AppLogo v-if="getLayoutMode === 'sidebar'" />
    <LayoutMenu :isHorizontal="false" />
  </Sider>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { Layout } from 'ant-design-vue'
  import AppLogo from './AppLogo.vue'
  import LayoutMenu from './Menu.vue'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'

  export default defineComponent({
    name: 'LayoutSider',
    components: {
      AppLogo,
      LayoutMenu,
      Sider: Layout.Sider
    },
    setup() {
      const { getCollapsed } = useMenuSetting()
      const { getLayoutMode } = useHeaderSetting()

      return {
        getCollapsed,
        getLayoutMode
      }
    }
  })
</script>
