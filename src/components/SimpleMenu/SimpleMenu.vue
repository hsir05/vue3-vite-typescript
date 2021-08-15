<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="linght" mode="horizontal">
    <template v-for="menu in items">
      <a-menu-item :key="menu.path" v-if="!menu.children || menu.children.length === 0">
        <pie-chart-outlined /> <span>{{ menu.name }}</span>
      </a-menu-item>
      <a-sub-menu :key="menu.path + 1" v-else>
        <template #title>
          <span>
            <team-outlined /> <span>{{ menu.name }}</span>
          </span>
        </template>
        <a-menu-item :key="item.path" v-for="item in menu.children">{{ item.name }}</a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script lang="ts">
  import { defineComponent, PropType, reactive, toRefs } from 'vue'
  import type { Menu as MenuType } from '/@/router/types'
  import { PieChartOutlined, TeamOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    name: 'SimpleMenu',
    components: {
      PieChartOutlined,
      TeamOutlined
    },
    props: {
      items: {
        type: Array as PropType<MenuType[]>,
        default: () => []
      }
    },
    setup(props) {
      const state = reactive({
        selectedKeys: [1]
      })

      const { items } = toRefs(props)
      console.log(items)

      return {
        ...toRefs(state)
      }
    }
  })
</script>
<style lang="less">
  .mw {
    min-width: 440px;
  }
</style>
