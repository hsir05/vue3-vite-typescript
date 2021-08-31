<template>
  <div class style="width: 100%">
    <slot></slot>
    <a-layout-content style="margin: 15px 10px 0; text-align: left">
      <div :style="{ padding: '10px', background: '#fff', minHeight: 'calc(100vh - 140px)' }">
        <router-view :key="routerViewKey">
          <template #default="{ Component, route }">
            <transition
              :name="
                getTransitionName({
                  route,
                  openCache,
                  enableTransition: getEnableTransition,
                  cacheTabs: getCaches,
                  def: getBasicTransition
                })
              "
              mode="out-in"
              appear
            >
              <keep-alive v-if="openCache" :include="getCaches">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
              <component v-else :is="Component" :key="route.fullPath" />
            </transition>
          </template>
        </router-view>
      </div>
    </a-layout-content>
    <slot name="footer"></slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { getTransitionName } from './transition'
  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting'
  export default defineComponent({
    name: 'Content',
    components: {},
    setup() {
      const { getBasicTransition, getEnableTransition } = useTransitionSetting()
      return {
        routerViewKey: new Date().getTime(),
        getTransitionName,
        getCaches: [],
        openCache: true,
        getBasicTransition,
        getEnableTransition
      }
    }
  })
</script>
