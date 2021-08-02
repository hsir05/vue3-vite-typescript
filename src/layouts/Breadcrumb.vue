<template>
  <div>
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, routes, paths }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="`${basePath}/${paths.join('/')}`">
          {{ route.breadcrumbName }}
        </router-link>
      </template>
    </a-breadcrumb>
    <br />
    {{ $route.path }}
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    name: 'LayoutBreadcrumb',
    setup() {
      const routes = ref([
        {
          path: '/dashboard',
          breadcrumbName: 'home'
        },
        {
          path: 'first',
          breadcrumbName: 'first',
          children: [
            {
              path: '/dashboard/analysis',
              breadcrumbName: 'General'
            },
            {
              path: '/layout',
              breadcrumbName: 'Layout'
            },
            {
              path: '/navigation',
              breadcrumbName: 'Navigation'
            }
          ]
        },
        {
          path: 'second',
          breadcrumbName: 'second'
        }
      ])
      return {
        basePath: '/dashboard/analysis',
        routes
      }
    }
  })
</script>
