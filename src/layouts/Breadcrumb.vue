<template>
  <a-breadcrumb :routes="routes">
    <template #itemRender="{ route, routes, paths }">
      <span v-if="!hasRedirect(routes, route)">
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else :to="`${basePath}/${paths.join('/')}`">
        {{ route.breadcrumbName }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import type { RouteLocationMatched } from 'vue-router'
  import { RouteType } from './typing'
  import { getBreadcrumb } from '/@/router/index'
  // import { REDIRECT_NAME } from '/@/router/constant';
  // import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'LayoutBreadcrumb',
    setup() {
      const routes = ref<RouteType[]>([
        {
          path: 'index',
          breadcrumbName: 'home'
        },
        {
          path: 'first',
          breadcrumbName: 'first',
          children: [
            {
              path: '/general',
              breadcrumbName: 'General'
            }
          ]
        },
        {
          path: 'second',
          breadcrumbName: 'second'
        }
      ])

      const breadCrumb = getBreadcrumb()
      console.log(breadCrumb)

      // const { currentRoute } = useRouter();

      // watchEffect(async () => {
      //     if (currentRoute.value.name === REDIRECT_NAME) return;
      //     const menus = await getMenus();

      //     const routeMatched = currentRoute.value.matched;
      //     const cur = routeMatched?.[routeMatched.length - 1];
      //     let path = currentRoute.value.path;

      //     if (cur && cur?.meta?.currentActiveMenu) {
      //     path = cur.meta.currentActiveMenu as string;
      //     }

      //     const parent = getAllParentPath(menus, path);
      //     const filterMenus = menus.filter((item) => item.path === parent[0]);
      //     const matched = getMatched(filterMenus, parent) as any;

      //     if (!matched || matched.length === 0) return;

      //     const breadcrumbList = filterItem(matched);

      //     if (currentRoute.value.meta?.currentActiveMenu) {
      //     breadcrumbList.push({
      //         ...currentRoute.value,
      //         name: currentRoute.value.meta?.title || currentRoute.value.name,
      //     } as unknown as RouteLocationMatched);
      //     }
      //     routes.value = breadcrumbList;
      // });

      function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
        if (routes.indexOf(route) === routes.length - 1) {
          return false
        }
        return true
      }
      return {
        basePath: '/components/breadcrumb',
        routes,
        hasRedirect
      }
    }
  })
</script>
