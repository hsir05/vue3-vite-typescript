<template>
  <a-config-provider :locale="getAntdLocale">
    <AppProvider>
      <router-view />
    </AppProvider>
  </a-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { AppProvider } from '/@/components/Application'
  import { useLocale } from '/@/locales/useLocale'
  export default defineComponent({
    name: 'App',
    components: { AppProvider },
    setup() {
      const { getAntdLocale } = useLocale()
      return {
        getAntdLocale
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
