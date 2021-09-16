<template>
  <Sider v-model:collapsed="getCollapsed">
    <AppLogo v-if="getLayoutMode === 'sidebar'" class="sidebar" />
    <HMenu :isHorizontal="false" />
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
      const { getCollapsed, setMenuSetting } = useMenuSetting()
      const { getLayoutMode } = useHeaderSetting()

      const handleCollapsed = () => {
        setMenuSetting({ collapsed: !unref(getCollapsed) })
      }
      return {
        getCollapsed,
        handleCollapsed,
        getLayoutMode
      }
    }
  })
</script>
