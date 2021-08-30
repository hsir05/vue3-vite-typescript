import type { RouteLocationNormalized, Router } from 'vue-router';
import { toRaw } from 'vue';
import { PageEnum } from '/@/enums/pageEnum';
import { REDIRECT_NAME } from '/@/router/constant';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { getRawRoute } from '/@/utils';
import { useRedo } from '/@/hooks/web/usePage'
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
        getLastDragEndIndex(): number {
            return this.lastDragEndIndex;
        },
    },
    actions: {
        addTab(route: RouteLocationNormalized){
            const { path, name, fullPath, params, query } = getRawRoute(route);
            if (path === PageEnum.ERROR_PAGE || !name || name === REDIRECT_NAME){
                return 
            } 

            let updateIndex = -1;
            // Existing pages, do not add tabs repeatedly
            const tabHasExits = this.tabList.some((tab, index) => {
                updateIndex = index;
                return (tab.fullPath || tab.path) === (fullPath || path);
            });

            if (tabHasExits) {
                const curTab = toRaw(this.tabList)[updateIndex];
                if (!curTab) {
                    return;
                }
                curTab.params = params || curTab.params;
                curTab.query = query || curTab.query;
                curTab.fullPath = fullPath || curTab.fullPath;
                this.tabList.splice(updateIndex, 1, curTab);
            } else {
                this.tabList.push(route);
            }
        },
        async refreshPage(route: Router) {
            const redo = useRedo(route);
            await redo();
           
        }
    }
})

export function useMultipleTabWithOutStore() {
    return useMultipleTabStore(store);
}
