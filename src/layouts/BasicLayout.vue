<template>
  <Layout style="min-height: 100vh">
    <LayoutSider v-if="getLayoutMode === 'sidebar'" />

    <LayoutHeader v-if="getLayoutMode === 'mix-sidebar'" />

    <Layout>
      <LayoutHeader v-if="getLayoutMode !== 'mix-sidebar'">
        <template #layoutMenu v-if="getLayoutMode === 'mix'">
          <LayoutMenu :isHorizontal="true" />
        </template>
      </LayoutHeader>

      <LayoutContent v-if="getLayoutMode === 'mix'">
        <LayoutMultipleHeader />
      </LayoutContent>

      <Layout v-else>
        <LayoutSider v-if="getLayoutMode === 'mix-sidebar'" />

        <LayoutContent>
          <LayoutMultipleHeader />
          <template #footer> <LayoutFooter /></template>
        </LayoutContent>
      </Layout>

      <LayoutFooter v-if="getLayoutMode === 'mix'" />
    </Layout>
  </Layout>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import LayoutMultipleHeader from './tabs/MultipleHeader.vue'
  import LayoutHeader from './Header.vue'
  import { Layout } from 'ant-design-vue'

  import LayoutMenu from './Menu.vue'
  import LayoutSider from './LayoutSider.vue'
  import LayoutContent from './Content.vue'
  import LayoutFooter from './Footer.vue'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'

  export default defineComponent({
    name: 'BaicLayout',
    components: {
      Layout,
      LayoutMultipleHeader,

      LayoutMenu,
      LayoutSider,

      LayoutContent,
      LayoutFooter,
      LayoutHeader
    },
    setup() {
      const { getLayoutMode } = useHeaderSetting()
      const { getCollapsed } = useMenuSetting()

      return {
        getCollapsed,
        getLayoutMode
      }
    }
  })
</script>
<style lang="less" scoped>
  .site-layout {
    .site-layout-background {
      background: @white;
    }
  }
  [data-theme='dark'] .site-layout .site-layout-background {
    background: @menuBgColor;
  }

  .site-layout {
    .site-layout-background {
      background: #fff;
    }
  }
</style>
