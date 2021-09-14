<template>
  <a-menu
    :selectedKeys="selectedKeys"
    :defaultSelectedKeys="defaultSelectedKeys"
    theme="dark"
    mode="inline"
    :openKeys="openKeys"
  >
    <template v-for="menu in items">
      <a-menu-item :key="menu.path" v-if="!menu.children || menu.children.length === 0">
        <router-link :to="menu.path" @click="handleMenu(menu.path)">
          <MyIcon :type="menu.icon" />
          <span>{{ t(menu.name) }}</span>
        </router-link>
      </a-menu-item>
      <a-sub-menu v-else :key="menu.path + 1">
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
  import { defineComponent, reactive, toRefs, PropType } from 'vue'
  import type { Menu as MenuType } from '/@/router/types'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { REDIRECT_NAME } from '/@/router/constant'
  import { listenerRouteChange } from '/@/router/routeChange'
  export default defineComponent({
    name: 'Menu',
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
        openKeys: [],
        selectedKeys: ['/dashboard']
      })

      // const currentActiveMenu = ref('')
      // 注释代码存在优化
      listenerRouteChange((route) => {
        if (route.name === REDIRECT_NAME) return

        // currentActiveMenu.value = route.meta?.currentActiveMenu as string
        menuState.selectedKeys = [route.path]
        // if (unref(currentActiveMenu)) {
        //     menuState.selectedKeys = [unref(currentActiveMenu)]
        // }
      })

      function handleMenu(path: string) {
        menuState.selectedKeys = [path]
      }
      return {
        t,
        ...toRefs(menuState),
        handleMenu
      }
    }
  })
</script>
