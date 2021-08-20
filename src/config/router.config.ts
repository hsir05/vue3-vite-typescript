import { UserLayout, BasicLayout } from "/@/layouts/index"
import type { AppRouteModule } from '/@/router/types';

export const asyncRouterMap: AppRouteModule = {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
        orderNo: 10,
        icon: 'ion:grid-outline',
        title: 'dashboard',
    },
    redirect: '/dashboard/analysis',
    children: [
        {
            path: '/dashboard/analysis',
            name: '分析页',
            component: () => import('../views/dashboard/analysis/index.vue'),
            // meta: { title: 'menu.dashboard.analysis' }
            meta: { title: '分析页' }
        },
        // Exception
        {
            path: '/exception',
            name: 'exception',
            redirect: '/exception/403',
            component: () => import('/@/views/exception/error.vue'),
            meta: { title: 'menu.exception', icon: 'warning' },
            children: [
                {
                    path: '/exception/403',
                    name: '403',
                    component: () => import(/* webpackChunkName: "fail" */ '/@/views/exception/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/exception/404',
                    name: '404',
                    component: () => import(/* webpackChunkName: "fail" */ '/@/views/exception/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/exception/500',
                    name: '500',
                    component: () => import(/* webpackChunkName: "fail" */ '/@/views/exception/500.vue'),
                    meta: { title: '500' }
                }
            ]
        },
    ]
}
/** 
 * 基础路由
*/
export const constantRouterMap = [
    
    {
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import(/* webpackChunkName: "user" */ '/@/views/user/Login.vue')
            }
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: () => import(/* webpackChunkName: "fail" */ '/@/views/exception/404.vue')
    },
]