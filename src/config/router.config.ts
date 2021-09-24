import { BasicLayout } from "/@/layouts/index"
import type { AppRouteModule } from '/@/router/types';
import Wrap from '/@/components/wrap/index.vue'

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
            icon: "icon-yibiao1",
            component: () => import('../views/dashboard/index.vue'),
            meta: { title: 'dashboard', affix: true }
        },
        // system
        {
            path: '/system',
            name: 'system',
            icon: 'icon-setting',
            redirect: '/exception/403',
            component: Wrap,
            meta: { title: 'system', },
            children: [
                {
                    path: '/system/role',
                    name: 'role',
                    component: () => import(/* webpackChunkName: "role" */ '/@/views/system/role.vue'),
                    meta: { title: 'role' }
                },
                {
                    path: '/system/users',
                    name: 'users',
                    component: () => import(/* webpackChunkName: "users" */ '/@/views/system/users.vue'),
                    meta: { title: 'users' }
                },
                {
                    path: '/system/menus',
                    name: 'menus',
                    component: () => import(/* webpackChunkName: "users" */ '/@/views/system/menus.vue'),
                    meta: { title: 'menus' }
                },
            ]
        },
        {
            path: '/account',
            name: 'account',
            icon: 'icon-setting',
            redirect: '/exception/403',
            component: Wrap,
            meta: { title: 'account', },
            children: [
                {
                    path: '/account/setting',
                    name: 'accountSetting',
                    component: () => import(/* webpackChunkName: "setting" */ '/@/views/account/setting.vue'),
                    meta: { title: 'accountSetting' }
                },
            ]
        },
        // Exception
        {
            path: '/exception',
            name: 'exception',
            icon: 'icon-exception',
            redirect: '/exception/403',
            component: Wrap,
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