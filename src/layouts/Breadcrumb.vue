<template>
  <Breadcrumb :routes="routesList" class="breadcrumb">
    <template #itemRender="{ route, routes }">
      <span v-if="!hasRedirect(routes, route)">{{ t(route.breadcrumbName) }}</span>
      <router-link v-else :to="`${route.path}`">{{ t(route.breadcrumbName) }}</router-link>
    </template>
  </Breadcrumb>
</template>
<script lang="ts">
  import { defineComponent, toRaw, computed } from 'vue'
  import type { RouteLocationMatched } from 'vue-router'
  import { Breadcrumb } from 'ant-design-vue'
  import { RouteType } from './typing'
  import { getBreadcrumb } from '/@/router/index'
  import { useRoute } from 'vue-router'
  import { useI18n } from '/@/hooks/web/useI18n'
  export default defineComponent({
    name: 'LayoutBreadcrumb',
    components: {
      Breadcrumb
    },
    setup() {
      const route = useRoute()
      const { t } = useI18n()
      const breadCrumb = getBreadcrumb()

      function getBreadcrumbList() {
        const currentRoute = toRaw(route.path)
        let routes: RouteType[] = []
        for (let key of breadCrumb) {
          let item: RouteType = { path: '', breadcrumbName: '' }
          if (key.path === currentRoute) {
            item = { path: key.path, breadcrumbName: key.name }
            routes.push(item)
          }
          if (key.children && key.children.length > 0) {
            for (let val of key.children) {
              if (val.path === currentRoute) {
                let child = key.children.map((ele) => {
                  let c = { path: ele.path, breadcrumbName: ele.name }
                  return c
                })
                item = { path: key.path, breadcrumbName: key.name, children: child }
                routes.push(item)
                routes.push({ path: val.path, breadcrumbName: val.name })
              }
            }
          }
        }
        return routes
      }
      const routesList = computed(() => getBreadcrumbList())

      function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
        if (routes.indexOf(route) === routes.length - 1) {
          return false
        }
        return true
      }
      return {
        routesList,
        hasRedirect,
        t
      }
    }
  })
</script>
<style lang="less">
  .breadcrumb {
    .ant-breadcrumb-separator {
      color: var(--header-text-color);
    }
    .anticon-down {
      color: var(--header-text-color);
    }
  }
  .ant-breadcrumb > span:last-child {
    color: var(--header-text-color);
  }
  .ant-breadcrumb a {
    color: var(--header-text-color);
  }
</style>
