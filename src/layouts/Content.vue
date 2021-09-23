<template>
  <div :class="`${getLayoutMode}-content`">
    <LayoutMultipleHeader />
    <a-layout-content class="h-layout-content">
      <router-view :key="routerViewKey" v-slot="{ Component }">
        <transition :name="getBasicTransition" mode="out-in" :appear="true">
          <keep-alive v-if="openCache" :include="getCaches">
            <component :is="Component" />
          </keep-alive>
          <component v-else :is="Component" />
        </transition>
      </router-view>
    </a-layout-content>
    <slot name="footer"></slot>
    <LayoutFooter v-if="getLayoutMode !== 'mix'" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting'
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
      const { getBasicTransition } = useTransitionSetting()
      const prefixCls = `${getLayoutMode.value}-content`

      return {
        getLayoutMode,
        routerViewKey: new Date().getTime(),
        openCache: true,
        getBasicTransition,
        prefixCls,
        getCaches: []
      }
    }
  })
</script>
<style lang="less">
  .mix-sidebar-content {
    width: 100%;
    overflow-y: scroll;
    height: 100vh;
  }
  .h-layout-content {
    margin: 15px 10px 0;
    text-align: left;
    padding: 10px;
    background: var(--main-bg-color);
    min-height: calc(100vh - 160px);
  }
</style>
