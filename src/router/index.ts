import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRouterMap, asyncRouterMap } from '/@/config/router.config'


export const router = createRouter({
    // history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
    history: createWebHashHistory(),
    routes: [...asyncRouterMap, ...constantRouterMap] as unknown as RouteRecordRaw[],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});
   
export function setupRouter(app: App<Element>) {
    app.use(router);
    
}