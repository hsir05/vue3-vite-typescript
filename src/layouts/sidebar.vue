<template>
  <Layout style="min-height: 100vh">
    <LayoutSider />
    <Layout>
      <LayoutHeader />
      <LayoutContent />
      <LayoutFooter />
    </Layout>
  </Layout>
</template>
<script lang="ts">
  //   import { defineComponent, defineAsyncComponent } from 'vue'
  import { defineComponent } from 'vue'
  import LayoutHeader from './header/index.vue'
  import { Layout } from 'ant-design-vue'

  import LayoutSider from './LayoutSider.vue'
  import LayoutFooter from './Footer.vue'
  import LayoutContent from './Content.vue'
  export default defineComponent({
    name: 'Sidebar',
    components: {
      Layout,

      LayoutSider,

      LayoutContent,
      //   LayoutFooter: defineAsyncComponent({
      //     loader: () => import('./Footer.vue')
      //   }),
      LayoutFooter,
      LayoutHeader
    }
  })
</script>
