<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <router-view />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts">
  import { ConfigProvider } from 'ant-design-vue'
  import { defineComponent } from 'vue'
  import { AppProvider } from '/@/components/Application'
  import { useLocale } from '/@/locales/useLocale'
  export default defineComponent({
    name: 'App',
    components: { ConfigProvider, AppProvider },
    setup() {
      const { getAntdLocale } = useLocale()
      return {
        getAntdLocale
      }
    }
  })
</script>
