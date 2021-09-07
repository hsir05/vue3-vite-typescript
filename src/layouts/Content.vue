<template>
  <div class style="width: 100%">
    <LayoutMultipleHeader />
    <a-layout-content style="margin: 15px 10px 0; text-align: left">
      <div :style="{ padding: '10px', background: '#fff', minHeight: 'calc(100vh - 160px)' }">
        <router-view :key="routerViewKey" v-slot="{ Component }">
          <transition name="fade" mode="out-in" :appear="true">
            <keep-alive v-if="openCache" :include="getCaches">
              <component :is="Component" />
            </keep-alive>
            <component v-else :is="Component" />
          </transition>
        </router-view>
      </div>
    </a-layout-content>
    <slot name="footer"></slot>
    <LayoutFooter v-if="getLayoutMode !== 'mix'" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import LayoutMultipleHeader from './tabs/index.vue'
  import LayoutFooter from './Footer.vue'
  export default defineComponent({
    name: 'Content',
    components: {
      LayoutMultipleHeader,
      LayoutFooter
    },
    setup() {
      const { getLayoutMode } = useHeaderSetting()
      return {
        getLayoutMode,
        routerViewKey: new Date().getTime(),
        openCache: true,
        getCaches: []
      }
    }
  })
</script>
