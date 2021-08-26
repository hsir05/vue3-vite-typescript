import { RoleEnum } from '/@/enums/roleEnum';
import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { defineComponent } from 'vue';

export interface MenuTag {
    type?: 'primary' | 'error' | 'warn' | 'success';
    content?: string;
    dot?: boolean;
}

export type Component<T extends any = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>);

export interface Menu {
    name: string;

    icon?: string;

    path: string;

    // path contains param, auto assignment.
    paramPath?: string;

    disabled?: boolean;

    children?: Menu[];

    orderNo?: number;

    roles?: RoleEnum[];

    meta?: Partial<RouteMeta>;

    tag?: MenuTag;

    hideMenu?: boolean;
}

export interface MenuModule {
    orderNo?: number;
    menu: Menu;
}
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string;
    icon?: string;
    meta: RouteMeta;
    component?: Component | string;
    components?: Component;
    children?: AppRouteRecordRaw[];
    props?: Recordable;
    fullPath?: string;
}
export type AppRouteModule = AppRouteRecordRaw;
