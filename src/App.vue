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
