<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    :defaultSelectedKeys="defaultSelectedKeys"
    :theme="theme"
    mode="horizontal"
    class="horizontal-menu"
  >
    <template v-if="spliteMenu">
      <a-menu-item :key="menu.path" v-for="menu in items">
        <router-link :to="menu.path" v-if="!menu.children" @click="handleMenu(menu.path)">
          <MyIcon :iconName="menu.icon" v-if="menu.icon" />
          <span>{{ t(menu.name) }}</span>
        </router-link>

        <span v-else @click="handleMenu(menu.path)">
          <MyIcon :iconName="menu.icon" v-if="menu.icon" />
          <span>{{ t(menu.name) }}</span>
        </span>
      </a-menu-item>
    </template>

    <template v-else>
      <template v-for="menu in items">
        <a-menu-item :key="menu.path" v-if="!menu.children || menu.children.length === 0">
          <router-link :to="menu.path" @click="handleMenu(menu.path)">
            <MyIcon :iconName="menu.icon" v-if="menu.icon" />
            <span>{{ t(menu.name) }}</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu :key="menu.path + 1" v-else>
          <template #title>
            <span>
              <MyIcon :iconName="menu.icon" v-if="menu.icon" />
              <span>{{ t(menu.name) }}</span>
            </span>
          </template>
          <a-menu-item :key="item.path" v-for="item in menu.children">
            <router-link :to="item.path" @click="handleMenu(item.path)">
              {{ t(item.name) }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts">
  import { defineComponent, toRefs, reactive, unref, computed, PropType, onMounted } from 'vue'
  import type { Menu as MenuType } from '/@/router/types'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { REDIRECT_NAME } from '/@/router/constant'
  import { listenerRouteChange } from '/@/router/routeChange'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useRouter } from 'vue-router'
  import { subMenuEmitter } from '/@/layouts/menuChange'
  import { getChildrenMenu, getParentPath } from '/@/utils/index'
  export default defineComponent({
    name: 'SimpleMenu',
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
      const router = useRouter()
      const { currentRoute } = useRouter()

      const menuState = reactive({
        defaultSelectedKeys: ['/dashboard'],
        selectedKeys: ['/dashboard']
      })
      const { getHeaderBgColor } = useHeaderSetting()

      listenerRouteChange((route) => {
        if (route.name === REDIRECT_NAME) return
        if (props.spliteMenu) {
          let selectKeyPath = getParentPath(props.items, route.path)
          menuState.selectedKeys = [selectKeyPath]
        } else {
          menuState.selectedKeys = [route.path]
        }
      })
      // 待优化
      const theme = computed(() => (unref(getHeaderBgColor) === '#fffffe' ? 'light' : 'dark'))

      function handleMenu(path: string) {
        menuState.selectedKeys = [path]
        // 分割菜单模式下
        if (props.spliteMenu) {
          // if (judgePath(props.items, path)){
          //     return false
          // }
          let childrenMenuData = getChildrenMenu(props.items, path)
          subMenuEmitter.emit('listenMenuData', childrenMenuData)

          if (childrenMenuData.length > 0) {
            router.push(childrenMenuData[0].path)
          } else {
            router.push(path)
          }
        }
      }

      onMounted(() => {
        let currentParentPath = getParentPath(props.items, currentRoute.value.path)
        if (props.spliteMenu) {
          menuState.selectedKeys = [currentParentPath]
        }

        let childrenMenuData = getChildrenMenu(
          props.items,
          getParentPath(props.items, currentRoute.value.path)
        )
        subMenuEmitter.emit('listenMenuData', childrenMenuData)
      })
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
