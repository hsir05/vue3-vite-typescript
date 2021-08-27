<template>
  <Dropdown :trigger="getTrigger">
    <router-link :to="getPath" class="tab-content" @contextmenu="handleContext" v-if="getIsTabs">{{
      getTitle
    }}</router-link>

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
          <MenuItem :disabled="item.disabled"
            ><MyIcon :type="item.icon" />{{ item.text }}
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
  import { Dropdown, Menu } from 'ant-design-vue'
  import type { RouteLocationNormalized } from 'vue-router'
  import { TabContentProps } from './types'
  import { useTabDropdown } from './useTabDropdown'
  import MyIcon from '/@/components/MyIcon/index.vue'
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
      const getIsTabs = computed(() => !props.isExtra)

      const { getDropMenuList, handleContextMenu } = useTabDropdown(
        props as TabContentProps,
        getIsTabs
      )

      const getTitle = computed(() => {
        const { tabItem: { meta } = {} } = props
        return meta && (meta.title as string)
      })

      const getTrigger = computed((): ('contextmenu' | 'click' | 'hover')[] =>
        unref(getIsTabs) ? ['contextmenu'] : ['click']
      )

      const getPath = computed(() => {
        const { tabItem: { path } = {} } = props
        return path
      })

      function handleContext(e) {
        props.tabItem && handleContextMenu(props.tabItem)(e)
      }

      return {
        getTitle,
        getPath,
        getIsTabs,
        getTrigger,
        getDropMenuList,
        handleContext
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
