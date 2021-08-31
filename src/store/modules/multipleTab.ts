import type { RouteLocationNormalized, Router, RouteLocationRaw } from 'vue-router';
import { toRaw, unref } from 'vue';
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
            if (path === PageEnum.ERROR_PAGE || !name || name === REDIRECT_NAME || path === PageEnum.BASE_LOGIN){
                return 
            } 

            let updateIndex = -1;
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
        clearCacheTabs(): void {
            this.cacheTabList = new Set();
        },
        resetState(): void {
            this.tabList = [];
            this.clearCacheTabs(); 
        },
        async refreshPage(route: Router) {
            const redo = useRedo(route);
            await redo();
        },
        async closeTab(tab: RouteLocationNormalized, router: Router) {
            const getToTarget = (tabItem: RouteLocationNormalized) => {
                const { params, path, query } = tabItem;
                return {
                    params: params || {},
                    path,
                    query: query || {},
                };
            };
            const close = (route: RouteLocationNormalized) => {
                const { fullPath, meta: { affix } = {} } = route;
                if (affix) {
                    return;
                }
                const index = this.tabList.findIndex((item) => item.fullPath === fullPath);
                index !== -1 && this.tabList.splice(index, 1);
            };

            const { currentRoute, replace } = router;
            const { path } = unref(currentRoute);
            if (path !== tab.path) {
                close(tab);
                return;
            }
            let toTarget: RouteLocationRaw = {};
            const index = this.tabList.findIndex((item) => item.path === path);
            if (index === 0) {
                if (this.tabList.length === 1) {
                    toTarget =  PageEnum.BASE_HOME;
                } else {
                    const page = this.tabList[index + 1];
                    toTarget = getToTarget(page);
                }
            } else {
                const page = this.tabList[index - 1];
                toTarget = getToTarget(page);
            }
            close(currentRoute.value);
            replace(toTarget);
        },
        async closeTabByKey(key: string, router: Router){
            const index = this.tabList.findIndex((item) => (item.fullPath || item.path) === key);
            index !== -1 && this.closeTab(this.tabList[index], router);
        }
    }
})

export function useMultipleTabWithOutStore() {
    return useMultipleTabStore(store);
}
