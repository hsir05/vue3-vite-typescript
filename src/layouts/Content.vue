<template
  >,
  <div class style="width: 100%">
    <slot></slot>
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
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Content',
    components: {},
    setup() {
      return {
        routerViewKey: new Date().getTime(),
        openCache: true,
        getCaches: []
      }
    }
  })
</script>
