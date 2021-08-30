import type { App } from 'vue';
import type { RouteRecordRaw,  } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { isArray } from '../utils/is';
import { asyncRouterMap, constantRouterMap } from '/@/config/router.config'
import type { AppRouteModule } from '/@/router/types';

export const asyncRoutes = [asyncRouterMap, ...constantRouterMap, ];

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const router = createRouter({
    history: createWebHashHistory(),
    routes: asyncRoutes as unknown as RouteRecordRaw[],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }), // 管理组件滚动行为
});
   
export const getMenus = () => {
    let routes = asyncRouterMap.children?.filter(item => item.path !== '/redirect')
    return routes
};

export const getBreadcrumb = () => {
    let routeList: AppRouteModule[] = []
    Object.keys(asyncRouterMap).forEach(ele => {
        if (isArray(asyncRouterMap[ele])) {
            routeList = asyncRouterMap[ele]
        }
    });
    return routeList
}

export function setupRouter(app: App<Element>) {
    app.use(router);
} 

