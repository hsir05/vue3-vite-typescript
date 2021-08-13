<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <template v-for="menu in items">
      <a-menu-item :key="menu.path" v-if="!menu.children || menu.children.length === 0">
        <router-link :to="menu.path"
          ><pie-chart-outlined /> <span>{{ menu.name }}</span></router-link
        >
      </a-menu-item>
      <a-sub-menu v-else :key="menu.path + 1">
        <template #title>
          <span>
            <team-outlined /> <span>{{ menu.name }}</span>
          </span>
        </template>
        <a-menu-item :key="item.path" v-for="item in menu.children"
          ><router-link :to="item.path"> {{ item.name }}</router-link></a-menu-item
        >
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
