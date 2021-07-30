import { UserLayout, BasicLayout } from "/@/layouts/index"
import { bxAnaalyse } from '/@/core/icons'

const RouteView = {
    name: 'RouteView',
    render: h => h('router-view')
}

export const asyncRouterMap = [
    {
        path: '/', 
        name: 'index',
        component: BasicLayout,
        meta: { title: 'menu.home' },
        redirect: '/dashboard/analysis',
        children: [
            {
                path: '/dashboard/analysis',
                name: 'Analysis',
                component: () => import('/@/views/dashboard/Analysis.vue'),
                meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
            },
            // dashboard
            // {
            //     path: '/dashboard',
            //     name: 'dashboard',
            //     redirect: '/dashboard/analysis',

            //     // component: RouteView,
            //     meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse + '?inline', permission: ['dashboard'] },
            //     children: [
            //         {
            //             path: '/dashboard/analysis',
            //             name: 'Analysis',
            //             component: () => import('/@/views/dashboard/Analysis.vue'),
            //             meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
            //         },
            //         // 外部链接
            //         // {
            //         //     path: 'https://www.baidu.com/',
            //         //     name: 'Monitor',
            //         //     meta: { title: 'menu.dashboard.monitor', target: '_blank' }
            //         // },
                    
            //     ]
            // },
            // Exception
            {
                path: '/exception',
                name: 'exception',
                // component: RouteView,
                redirect: '/exception/403',
                meta: { title: 'menu.exception', icon: 'warning', permission: ['exception'] },
                children: [
                    {
                        path: '/exception/403',
                        name: 'Exception403',
                        component: () => import(/* webpackChunkName: "fail" */ '/@/views/exception/403.vue'),
                        meta: { title: 'menu.exception.not-permission', permission: ['exception'] }
                    },
                    {
                        path: '/exception/404',
                        name: 'Exception404',
                        component: () => import(/* webpackChunkName: "fail" */ '/@/views/exception/404.vue'),
                        meta: { title: 'menu.exception.not-find', permission: ['exception'] }
                    },
                    {
                        path: '/exception/500',
                        name: 'Exception500',
                        component: () => import(/* webpackChunkName: "fail" */ '/@/views/exception/500.vue'),
                        meta: { title: 'menu.exception.server-error', permission: ['exception'] }
                    }
                ]
            },
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: '/404',
        hidden: true
    }
]
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