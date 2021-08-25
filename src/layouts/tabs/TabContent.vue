<template>
  <Dropdown :trigger="getTrigger">
    <router-link :to="getPath" class="tab-content" v-if="getIsTabs">{{ getTitle }}</router-link>
    <slot></slot>
    <template #overlay>
      <Menu>
        <template v-for="(item, index) in getDropMenuList" :key="item.text">
          <MenuItem><MyIcon :type="item.icon" />{{ item.text }} </MenuItem>
          <MenuDivider
            v-if="index % 2 !== 0 && getDropMenuList && index !== getDropMenuList.length - 1"
          />
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
  import type { DropMenu } from './typing'
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
      isExtra: Boolean,
      dropMenuList: {
        type: Array as PropType<(DropMenu & Recordable)[]>,
        default: () => []
      }
    },
    setup(props) {
      const getIsTabs = computed(() => !props.isExtra)

      const { getDropMenuList } = useTabDropdown(props as TabContentProps, getIsTabs)

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
      return {
        getTitle,
        getPath,
        getIsTabs,
        getTrigger,
        getDropMenuList
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
