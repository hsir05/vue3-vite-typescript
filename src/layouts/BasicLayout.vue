<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo"> <img src="../assets/logo.png" alt="logo" height="100%" /> vite-admin </div>

      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <file-outlined />
          <span>File</span>
        </a-menu-item>
      </a-menu>
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
  import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined
  } from '@ant-design/icons-vue'
  import { defineComponent, reactive, toRefs } from 'vue'
  import MultipleHeader from './MultipleHeader.vue'
  import Header from './Header.vue'
  import Content from './Content.vue'
  import Footer from './Footer.vue'
  export default defineComponent({
    name: 'BaicLayout',
    components: {
      PieChartOutlined,
      DesktopOutlined,
      UserOutlined,
      MultipleHeader,
      TeamOutlined,
      Content,
      Footer,
      Header,
      FileOutlined
    },
    setup() {
      const state = reactive({
        collapsed: false,
        selectedKeys: [1]
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
