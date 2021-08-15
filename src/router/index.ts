import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { asyncRouterMap } from '/@/config/router.config'
import type { AppRouteModule } from '/@/router/types';

 
const routeModuleList: AppRouteModule[] = [];

Object.keys(asyncRouterMap).forEach((key) => {
    const mod = asyncRouterMap[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];    
    routeModuleList.push(...modList);
});
export const asyncRoutes = [asyncRouterMap];

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const router = createRouter({
    // history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
    history: createWebHashHistory(),
    // routes: [...dashboard, ...constantRouterMap] as unknown as RouteRecordRaw[],
    routes: asyncRoutes as unknown as RouteRecordRaw[],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});
   
export const getMenus = () => {
    return asyncRoutes[0].children
};

export const getBreadcrumb = () => {
    let list = []
    for (let key of asyncRoutes){
        let item = { path: key.path, breadcrumbName: key.name }
        if (key.children && key.children.length > 0) {
            let item = { path: key.path, breadcrumbName: key.name }
            for(let val of key.children) {
                let item = { path: val.path, breadcrumbName: val.name, children: [] }
                item.children.push(item)
            }
            list.push(item)
        }
       
        
    }
    return getMenus()
}

export function setupRouter(app: App<Element>) {
    app.use(router);
} 

