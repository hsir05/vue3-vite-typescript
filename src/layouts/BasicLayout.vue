<template>
  <Layout style="min-height: 100vh">
    <Layout>
      <LayoutHeader />
      <Layout>
        <Sider v-model:collapsed="getCollapsed" collapsible>
          <AppLogo />
          <LayoutMenu :isHorizontal="false" />
        </Sider>
        <LayoutContent>
          <LayoutMultipleHeader />
        </LayoutContent>
      </Layout>
      <LayoutFooter />
    </Layout>
  </Layout>

  <!-- <Layout style="min-height: 100vh">
        <Sider v-model:collapsed="getCollapsed" collapsible>
            <AppLogo />
            <LayoutMenu :isHorizontal="false" />
        </Sider>
        <Layout>
            <Layout>
                <LayoutHeader />
                <LayoutContent>
                    <LayoutMultipleHeader />
                </LayoutContent>
            </Layout>
            <LayoutFooter />
        </Layout>
    </Layout> -->

  <!-- <Layout style="min-height: 100vh">
        <Layout>
            <Layout>
                <LayoutHeader >
                    <template v-slot:appLogo>
                        <AppLogo  />
                    </template>
                    <template v-slot:layoutMenu>
                        <LayoutMenu  :isHorizontal="true"  />
                    </template>
                </LayoutHeader>
                <LayoutContent>
                    <LayoutMultipleHeader />
                </LayoutContent>
            </Layout>
            <LayoutFooter />
        </Layout>
    </Layout> -->
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue'
  import LayoutMultipleHeader from './MultipleHeader.vue'
  import LayoutHeader from './Header.vue'
  import { Layout } from 'ant-design-vue'

  import AppLogo from './AppLogo.vue'
  import LayoutMenu from './Menu.vue'

  import LayoutContent from './Content.vue'
  import LayoutFooter from './Footer.vue'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'

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
      const { getLayoutMode } = useHeaderSetting()
      console.log(unref(getLayoutMode))
      const { getCollapsed } = useMenuSetting()

      return {
        getCollapsed
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
