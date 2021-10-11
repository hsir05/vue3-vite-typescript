<template>
  <Dropdown :trigger="getTrigger">
    <!-- <router-link :to="getPath" v-if="getIsTabs" class="tab-content" @contextmenu="handleContext">
      {{ getTitle }}
    </router-link> -->
    <span v-if="getIsTabs" class="tab-content" @contextmenu="handleContext" @click="handleMenuPath">
      {{ getTitle }}
    </span>

    <MyIcon
      type="icon-down-arrow-line"
      @click="handleContext"
      class="multiple-icon-item"
      v-else
      style="font-size: 22px"
    />

    <template #overlay>
      <Menu style="width: 160px">
        <template v-for="item in getDropMenuList" :key="item.text">
          <MenuItem :disabled="item.disabled" @click="handleClickMenu(item)">
            <MyIcon :iconName="item.icon" />
            {{ item.text }}
          </MenuItem>
          <MenuDivider v-if="item.divider" />
        </template>
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import type { PropType } from 'vue'
  import type { Menu as MenuType } from '/@/router/types'
  import { Dropdown, Menu } from 'ant-design-vue'
  import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
  import { TabContentProps } from './types'
  import type { DropMenu } from './typing'
  import { useTabDropdown } from './useTabDropdown'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { useRootSetting } from '/@/hooks/setting/useRootSetting'
  import { useRouter } from 'vue-router'
  import { subMenuEmitter } from '/@/layouts/menuChange'
  import { getChildrenMenu, getParentPath } from '/@/utils/index'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'

  import { getMenus } from '/@/router/index'
  export default defineComponent({
    name: 'TabContent',
    components: {
      Dropdown,
      Menu,
      MenuItem: Menu.Item,
      MenuDivider: Menu.Divider,
      MyIcon
    },
    props: {
      tabItem: {
        type: Object as PropType<RouteLocationNormalized>,
        default: null
      },
      isExtra: Boolean
    },
    setup(props) {
      const { t } = useI18n()
      const router = useRouter()
      const getIsTabs = computed(() => !props.isExtra)

      const { getDropMenuList, handleContextMenu, handleMenuEvent } = useTabDropdown(
        props as TabContentProps,
        getIsTabs
      )

      const { getThemeColor } = useRootSetting()

      const getTitle = computed(() => {
        const { tabItem: { meta } = {} } = props
        return meta && t(meta.title as string)
      })

      const getTrigger = computed((): ('contextmenu' | 'click' | 'hover')[] =>
        unref(getIsTabs) ? ['contextmenu'] : ['click']
      )

      const getPath = computed(() => {
        const { tabItem: { path } = {} } = props
        return path
      })

      function handleClickMenu(item: DropMenu) {
        handleMenuEvent(item)
      }

      function handleContext(e) {
        props.tabItem && handleContextMenu(props.tabItem)(e)
      }
      // 函数待优化
      const { getLayoutMode } = useHeaderSetting()

      function handleMenuPath() {
        if (getLayoutMode.value === 'mix-sidebar') {
          const menuData = getMenus()
          let childrenMenuData = getChildrenMenu(
            menuData as MenuType[],
            getParentPath(menuData as MenuType[], getPath.value as string)
          )
          subMenuEmitter.emit('listenMenuData', childrenMenuData)
        }

        router.push(getPath.value as RouteLocationRaw)
      }

      return {
        getTitle,
        getPath,
        getThemeColor,
        getIsTabs,
        getTrigger,
        getDropMenuList,
        handleContext,
        handleClickMenu,
        handleMenuPath
      }
    }
  })
</script>
<style lang="less">
  .tab-content {
    color: #666;
    font-weight: 500;
  }
</style>
