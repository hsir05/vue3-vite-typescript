<template>
  <Layout style="min-height: 100vh">
    <LayoutSider v-if="getLayoutMode === 'sidebar'" />
    <LayoutHeader v-if="getLayoutMode === 'mix-sidebar'" />

    <Layout :class="[getHeaderFixed ? '' : `${getLayoutMode}-layout`]">
      <LayoutHeader v-if="getLayoutMode !== 'mix-sidebar' && getShowFold" />

      <LayoutContent v-if="getLayoutMode === 'mix' && getShowFold" />
      <Layout v-else>
        <LayoutSider v-if="getLayoutMode === 'mix-sidebar'" />
        <LayoutContent />
      </Layout>
      <LayoutFooter v-if="getLayoutMode === 'mix'" />
    </Layout>
  </Layout>
</template>
<script lang="ts">
  import { defineComponent, defineAsyncComponent } from 'vue'
  import LayoutHeader from './header/index.vue'
  import { Layout } from 'ant-design-vue'

  import LayoutSider from './LayoutSider.vue'
  import LayoutContent from './Content.vue'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting'

  export default defineComponent({
    name: 'BaicLayout',
    components: {
      Layout,
      LayoutSider,
      LayoutContent,
      LayoutFooter: defineAsyncComponent({
        loader: () => import('./Footer.vue')
      }),
      LayoutHeader
    },
    setup() {
      const { getLayoutMode, getHeaderFixed } = useHeaderSetting()
      const { getShowFold } = useMultipleTabSetting()

      return {
        getLayoutMode,
        getShowFold,
        getHeaderFixed
      }
    }
  })
</script>
<style lang="less" scoped>
  .sidebar-layout {
    overflow-y: scroll;
    height: 100vh;
  }
  .mix-layout {
    overflow-y: scroll;
    height: 100vh;
  }
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
      background: @white;
    }
  }
</style>
