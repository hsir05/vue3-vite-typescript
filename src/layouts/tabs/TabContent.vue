<template>
  <Dropdown trigger="contextmenu">
    <router-link :to="getPath" class="tab-content">{{ getTitle }}</router-link>
    <template #overlay>
      <Menu>
        <MenuItem><RedoOutlined />重新加载</MenuItem>
        <MenuItem><CloseOutlined />关闭标签页</MenuItem>
        <MenuDivider />
        <MenuItem
          ><VerticalAlignTopOutlined style="transform: rotate(-90deg)" />关闭右侧标签</MenuItem
        >
        <MenuItem
          ><VerticalAlignBottomOutlined style="transform: rotate(-90deg)" />关闭左侧标签</MenuItem
        >
        <MenuDivider />
        <MenuItem><PicCenterOutlined />关闭其他标签页</MenuItem>
        <MenuItem><MinusOutlined />关闭全部标签页</MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import type { PropType } from 'vue'
  import { Dropdown, Menu } from 'ant-design-vue'
  import type { RouteLocationNormalized } from 'vue-router'
  import {
    RedoOutlined,
    CloseOutlined,
    PicCenterOutlined,
    MinusOutlined,
    VerticalAlignTopOutlined,
    VerticalAlignBottomOutlined
  } from '@ant-design/icons-vue'
  export default defineComponent({
    name: 'TabContent',
    components: {
      Dropdown,
      PicCenterOutlined,
      MinusOutlined,
      RedoOutlined,
      CloseOutlined,
      VerticalAlignTopOutlined,
      VerticalAlignBottomOutlined,
      Menu,
      MenuItem: Menu.Item,
      MenuDivider: Menu.Divider
    },
    props: {
      tabItem: {
        type: Object as PropType<RouteLocationNormalized>,
        default: null
      },
      isExtra: Boolean
    },
    setup(props) {
      const getTitle = computed(() => {
        const { tabItem: { meta } = {} } = props
        return meta && (meta.title as string)
      })
      const getPath = computed(() => {
        const { tabItem: { path } = {} } = props
        return path
      })
      return {
        getTitle,
        getPath
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
