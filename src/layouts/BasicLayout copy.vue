<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <AppLogo />

      <LayoutMenu :isHorizontal="true" />
    </a-layout-sider>

    <a-layout>
      <Header />

      <MultipleHeader />

      <Content />

      <Footer />
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import MultipleHeader from './MultipleHeader.vue'
  import Header from './Header.vue'
  import LayoutMenu from './Menu.vue'
  import Content from './Content.vue'
  import Footer from './Footer.vue'
  import AppLogo from './AppLogo.vue'
  export default defineComponent({
    name: 'BaicLayout',
    components: {
      MultipleHeader,
      AppLogo,
      LayoutMenu,
      Content,
      Footer,
      Header
    },
    setup() {
      const state = reactive({
        collapsed: false
      })
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
