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
            icon: "icon-analysis_icon",
            component: () => import('../views/dashboard/analysis/index.vue'),
            meta: { title: '分析页', affix: true }
        },
        // Exception
        {
            path: '/exception',
            name: 'exception',
            icon: 'icon-exception',
            redirect: '/exception/403',
            component: () => import('/@/views/exception/error.vue'),
            meta: { title: 'menu.exception', },
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
export const redirectRouterMap: AppRouteModule = {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
        title: 'dashboard',
    },
    children: [
        {
            path: '/redirect',
            name: 'redirect',
            icon: "icon-analysis_icon",
            meta: { title: 'redirect' },
            component: () => import(/* webpackChunkName: "user" */ '/@/views/system/redirect.vue')
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
            },
        ]
    },
    
    {
        path: "/:pathMatch(.*)*",
        name: "error-404",
        component: () => import(/* webpackChunkName: "fail" */ '/@/views/exception/404.vue')
    },
]