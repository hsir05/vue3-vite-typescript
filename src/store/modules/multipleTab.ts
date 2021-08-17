import type { RouteLocationNormalized, RouteLocationRaw, Router } from 'vue-router';
import { toRaw, unref } from 'vue';
import { defineStore } from 'pinia';
import { store } from '/@/store';
// import projectSetting from '/@/config/defaultSettings';

export interface MultipleTabState {
    cacheTabList: Set<string>;
    tabList: RouteLocationNormalized[];
    lastDragEndIndex: number;
}

// const cacheTab = projectSetting.multiTabsSetting.cache;

export const useMultipleTabStore = defineStore({
    id: 'app-multiple-tab',
    state: (): MultipleTabState => ({
        cacheTabList: new Set(),
        tabList: [],
        lastDragEndIndex: 0,
    }),
    getters: {
        getTabList(): RouteLocationNormalized[] {
            return this.tabList;
        },
    },
    actions: {}
})