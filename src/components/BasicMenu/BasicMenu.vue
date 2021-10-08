<template>
  <a-menu
    :selectedKeys="selectedKeys"
    :defaultSelectedKeys="defaultSelectedKeys"
    :theme="getMenuTheme"
    mode="inline"
    :openKeys="openKeys"
    @openChange="onOpenChange"
  >
    <template v-for="menu in menuData">
      <a-menu-item v-if="!menu.children || menu.children.length === 0" :key="menu.path">
        <router-link :to="menu.path" @click="handleMenu(menu.path)">
          <MyIcon :type="menu.icon" v-if="menu.icon" />
          <span calss="menu-text">{{ t(menu.name) }}</span>
        </router-link>
      </a-menu-item>

      <a-sub-menu v-else :key="menu.name">
        <template #title>
          <span>
            <MyIcon :type="menu.icon" v-if="menu.icon" />
            <span calss="menu-text">{{ t(menu.name) }}</span>
          </span>
        </template>
        <a-menu-item :key="item.path" v-for="item in menu.children">
          <router-link :to="item.path" @click="handleMenu(item.path)" calss="menu-text">{{
            t(item.name)
          }}</router-link>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRefs, PropType } from 'vue'
  import type { Menu as MenuType } from '/@/router/types'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { REDIRECT_NAME } from '/@/router/constant'
  import { listenerRouteChange } from '/@/router/routeChange'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { subMenuEmitter } from '/@/layouts/menuChange'
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
      },
      spliteMenu: {
        type: Boolean,
        default: () => false
      }
    },
    setup(props) {
      const { t } = useI18n()
      const menuData = ref(props.items)

      const menuState: menuStateFace = reactive({
        defaultSelectedKeys: ['/dashboard'],
        openKeys: [],
        selectedKeys: ['/dashboard']
      })

      subMenuEmitter.on('listenMenuData', (childrenMenuData) => {
        menuData.value = childrenMenuData
      })

      const { getMenuTheme } = useMenuSetting()

      const onOpenChange = (openKeys: string[]) => {
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
        menuData,
        handleMenu,
        onOpenChange
      }
    }
  })
</script>
