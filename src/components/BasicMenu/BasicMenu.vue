<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <template v-for="menu in items">
      <a-menu-item :key="menu.path" v-if="!menu.children || menu.children.length === 0">
        <router-link :to="menu.path"
          ><MyIcon :type="menu.icon" /><span>{{ t(menu.name) }}</span></router-link
        >
      </a-menu-item>
      <a-sub-menu v-else :key="menu.path + 1">
        <template #title>
          <span>
            <MyIcon :type="menu.icon" /> <span>{{ t(menu.name) }}</span>
          </span>
        </template>
        <a-menu-item :key="item.path" v-for="item in menu.children"
          ><router-link :to="item.path"> {{ t(item.name) }}</router-link></a-menu-item
        >
      </a-sub-menu>
    </template>
  </a-menu>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, PropType } from 'vue'
  import type { Menu as MenuType } from '/@/router/types'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useI18n } from '/@/hooks/web/useI18n'
  export default defineComponent({
    name: 'Menu',
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

      const state = reactive({
        selectedKeys: ['/dashboard/analysis']
      })

      //   const { items } = toRefs(props)
      //   console.log(items)

      return {
        t,
        ...toRefs(state)
      }
    }
  })
</script>
