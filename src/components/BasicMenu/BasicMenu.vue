<template>
  <a-menu
    :selectedKeys="selectedKeys"
    :defaultSelectedKeys="defaultSelectedKeys"
    :theme="getMenuTheme"
    mode="inline"
    :openKeys="openKeys"
    @openChange="onOpenChange"
  >
    <template v-for="menu in items">
      <a-sub-menu v-if="menu.children && menu.children.length !== 0" :key="menu.path">
        <template #title>
          <span>
            <MyIcon :type="menu.icon" /> <span calss="menu-text">{{ t(menu.name) }}</span>
          </span>
        </template>
        <a-menu-item :key="item.path" v-for="item in menu.children">
          <router-link :to="item.path" @click="handleMenu(item.path)" calss="menu-text">
            {{ t(item.name) }}
          </router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-menu-item v-else :key="menu.path + 1">
        <router-link :to="menu.path" @click="handleMenu(menu.path)">
          <MyIcon :type="menu.icon" />
          <span calss="menu-text">{{ t(menu.name) }}</span>
        </router-link>
      </a-menu-item>
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
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'

  interface menuStateFace {
    defaultSelectedKeys: string[]
    openKeys: string[]
    selectedKeys: string[]
  }

  export default defineComponent({
    name: 'BasicMenu',
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

      const menuState: menuStateFace = reactive({
        defaultSelectedKeys: ['/dashboard'],
        openKeys: [],
        selectedKeys: ['/dashboard']
      })

      const { getMenuTheme } = useMenuSetting()

      const onOpenChange = (openKeys) => {
        menuState.openKeys = []
        if (openKeys.length === 0 || openKeys.length === 1) {
          menuState.openKeys = openKeys
        } else {
          menuState.openKeys.push(openKeys[openKeys.length - 1])
        }
      }

      // 注释代码存在优化
      listenerRouteChange((route) => {
        if (route.name === REDIRECT_NAME) return
        menuState.selectedKeys = [route.path]
      })

      function handleMenu(path: string) {
        menuState.selectedKeys = [path]
      }

      return {
        t,
        ...toRefs(menuState),
        getMenuTheme,
        handleMenu,
        onOpenChange
      }
    }
  })
</script>
