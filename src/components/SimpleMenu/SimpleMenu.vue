<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    :defaultSelectedKeys="defaultSelectedKeys"
    :theme="theme"
    mode="horizontal"
    class="horizontal-menu"
  >
    <template v-for="menu in items">
      <a-menu-item :key="menu.path" v-if="!menu.children || menu.children.length === 0">
        <router-link :to="menu.path" @click="handleMenu(menu.path)">
          <MyIcon :type="menu.icon" />
          <span>{{ t(menu.name) }}</span>
        </router-link>
      </a-menu-item>
      <a-sub-menu :key="menu.path + 1" v-else>
        <template #title>
          <span>
            <MyIcon :type="menu.icon" />
            <span>{{ t(menu.name) }}</span>
          </span>
        </template>
        <a-menu-item :key="item.path" v-for="item in menu.children">
          <router-link :to="item.path" @click="handleMenu(item.path)">{{
            t(item.name)
          }}</router-link>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script lang="ts">
  import { defineComponent, toRefs, reactive, unref, computed, PropType } from 'vue'
  import type { Menu as MenuType } from '/@/router/types'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { REDIRECT_NAME } from '/@/router/constant'
  import { listenerRouteChange } from '/@/router/routeChange'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  export default defineComponent({
    name: 'SimpleMenu',
    components: {
      MyIcon
    },
    props: {
      items: {
        type: Array as PropType<MenuType[]>,
        default: () => []
      }
    },
    setup() {
      const { t } = useI18n()
      const menuState = reactive({
        defaultSelectedKeys: ['/dashboard'],
        selectedKeys: ['/dashboard']
      })
      const { getHeaderBgColor } = useHeaderSetting()

      listenerRouteChange((route) => {
        if (route.name === REDIRECT_NAME) return
        menuState.selectedKeys = [route.path]
      })

      const theme = computed(() => (unref(getHeaderBgColor) === '#fffffe' ? 'light' : 'dark'))

      function handleMenu(path: string) {
        menuState.selectedKeys = [path]
      }
      return {
        t,
        theme,
        handleMenu,
        ...toRefs(menuState)
      }
    }
  })
</script>
<style lang="less">
  .mw {
    min-width: 440px;
  }
  .horizontal-menu.ant-menu.ant-menu-dark {
    background-color: var(--header-bg-color);
  }
</style>
