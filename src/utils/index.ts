import type { App, Plugin } from 'vue';
import { isObject } from '/@/utils/is';


import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string;
    for (key in target) {
        src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
}

export const withInstall = <T>(component: T, alias?: string) => {
    const comp = component as any;
    comp.install = (app: App) => {
        app.component(comp.name || comp.displayName, component);
        if (alias) {
            app.config.globalProperties[alias] = component;
        }
    };
    return component as T & Plugin;
};

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
    if (!route) return route;
    const { matched, ...opt } = route;
    return {
        ...opt,
        matched: (matched
            ? matched.map((item) => ({
                meta: item.meta,
                name: item.name,
                path: item.path,
            }))
            : undefined) as RouteRecordNormalized[],
    };
}