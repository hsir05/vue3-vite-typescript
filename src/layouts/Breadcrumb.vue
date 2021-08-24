<template>
  <a-breadcrumb :routes="routesList">
    <template #itemRender="{ route, routes }">
      <span v-if="!hasRedirect(routes, route)">{{ route.breadcrumbName }}</span>
      <router-link v-else :to="`${route.path}`">{{ route.breadcrumbName }}</router-link>
    </template>
  </a-breadcrumb>
</template>
<script lang="ts">
  import { defineComponent, toRaw, computed } from 'vue'
  import type { RouteLocationMatched } from 'vue-router'
  import { RouteType } from './typing'
  import { getBreadcrumb } from '/@/router/index'
  import { useRoute } from 'vue-router'
  export default defineComponent({
    name: 'LayoutBreadcrumb',
    setup() {
      const route = useRoute()

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
        hasRedirect
      }
    }
  })
</script>
