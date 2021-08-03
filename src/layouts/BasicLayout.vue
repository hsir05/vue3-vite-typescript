<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo"> <img src="../assets/logo.png" alt="logo" height="100%" /> vite-admin </div>

      <LayoutMenu :is-horizontal="true" />
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
  export default defineComponent({
    name: 'BaicLayout',
    components: {
      MultipleHeader,
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
  .logo {
    height: 32px;
    margin: 16px;
    font-weight: 600;
    font-size: 18px;
    color: @white;
    text-align: left;
    img {
      height: 100%;
    }
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
      background: #fff;
    }
  }
</style>
