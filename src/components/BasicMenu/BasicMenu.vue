<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="horizontal">
    <template v-for="menu in items">
      <a-menu-item :key="menu.path" v-if="!menu.children || menu.children.length === 0">
        <pie-chart-outlined /> <span>Option 1</span>
      </a-menu-item>
      <a-sub-menu v-else :key="menu.path">
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
  import { defineComponent, reactive, toRefs, PropType } from 'vue'
  import { PieChartOutlined, TeamOutlined } from '@ant-design/icons-vue'
  import type { Menu as MenuType } from '/@/router/types'
  export default defineComponent({
    name: 'Menu',
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
