<template>
  <a-config-provider :locale="locale === 'en' ? enUS : zhCN">
    <AppProvider>
      <router-view />
    </AppProvider>
  </a-config-provider>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { AppProvider } from '/@/components/Application'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import enUS from 'ant-design-vue/es/locale/en_US'
  export default defineComponent({
    name: 'App',
    components: { AppProvider },
    setup() {
      const locale = ref(zhCN.locale)
      return {
        locale,
        zhCN,
        enUS
      }
    }
  })
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
  }
</style>
