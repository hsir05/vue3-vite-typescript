import { BasicLayout } from "/@/layouts/index"
import type { AppRouteModule } from '/@/router/types';

export const defaultHomePath = '/dashboard';

export const asyncRouterMap: AppRouteModule = {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
        orderNo: 10,
        icon: 'ion:grid-outline',
        title: 'dashboard',
    },
    redirect: '/dashboard',
    children: [
        {
            path: '/dashboard', 
            name: 'dashboard',
            icon: "icon-analysis_icon",
            component: () => import('../views/dashboard/index.vue'),
            meta: { title: 'dashboard', affix: true }
        },
        // Exception
        {
            path: '/exception',
            name: 'exception',
            icon: 'icon-exception',
            redirect: '/exception/403',
            component: () => import('/@/views/exception/error.vue'),
            meta: { title: 'exception', },
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
        //redirect
        {
            path: '/redirect/:path(.*)',
            name: 'Redirect',
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
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/login.vue')
    },
    {
        path: "/:pathMatch(.*)*",
        name: "error-404",
        component: () => import(/* webpackChunkName: "fail" */ '/@/views/exception/404.vue')
    },
]