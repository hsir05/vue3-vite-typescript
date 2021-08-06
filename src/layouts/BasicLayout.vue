<template>
  <Layout style="min-height: 100vh">
    <LayoutHeader />
    <LayoutMultipleHeader />

    <Layout>
      <Layout>
        <Sider v-model:collapsed="collapsed" collapsible>
          <AppLogo />
          <LayoutMenu :isHorizontal="false" />
        </Sider>
        <LayoutContent />
      </Layout>
      <LayoutFooter />
    </Layout>
  </Layout>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, unref } from 'vue'
  import LayoutMultipleHeader from './MultipleHeader.vue'
  import LayoutHeader from './Header.vue'
  import { Layout } from 'ant-design-vue'

  import AppLogo from './AppLogo.vue'
  import LayoutMenu from './Menu.vue'

  import LayoutContent from './Content.vue'
  import LayoutFooter from './Footer.vue'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'

  export default defineComponent({
    name: 'BaicLayout',
    components: {
      Layout,
      Sider: Layout.Sider,
      LayoutMultipleHeader,

      AppLogo,
      LayoutMenu,

      LayoutContent,
      LayoutFooter,
      LayoutHeader
    },
    setup() {
      const state = reactive({
        collapsed: false
      })

      const { getLayoutMode } = useHeaderSetting()
      console.log(unref(getLayoutMode))

      return {
        ...toRefs(state)
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
