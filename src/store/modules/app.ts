import type {
    ProjectConfig,
    HeaderSetting,
    TransitionSetting,
    MenuSetting,
} from '/#/config';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { deepMerge } from '/@/utils';
import { APP_DARK_MODE_KEY_ } from '/@/enums/cacheEnum';
import { darkMode } from '/@/settings/designSetting';
import { ThemeEnum } from '/@/enums/appEnum';

interface AppState { 
    darkMode?: ThemeEnum;
    selectedKeys: String[];
    // Page loading status
    pageLoading: boolean;
    projectConfig: ProjectConfig | null;
    
}

export const useAppStore = defineStore({
    id: 'app',
    state: (): AppState => ({
        darkMode: undefined,
        pageLoading: false,
        selectedKeys: ['/dashboard/analysis'],
        // projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
        projectConfig: null,
        // beforeMiniInfo: {},
    }), 
    getters: {
        getSelectedKeys(): String[]{
            return this.selectedKeys
        },
        getPageLoading(): boolean {
            return this.pageLoading;
        },
        getDarkMode(): 'light' | 'dark' | string {
            return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
        },
        getLayoutMode():string {
            return this.getProjectConfig.layoutMode;
        },
        getTransitionSetting(): TransitionSetting {
            return this.getProjectConfig.transitionSetting;
        },
        getProjectConfig(): ProjectConfig {
            return this.projectConfig || ({} as ProjectConfig);
        },
        getHeaderSetting(): HeaderSetting {
            return this.getProjectConfig.headerSetting;
        },
        getMenuSetting(): MenuSetting {
            return this.getProjectConfig.menuSetting;
        },
    },
    actions: {
        setSelectedKeys(setSelectedKeys: String[]):void{
            this.selectedKeys = setSelectedKeys;
        },
        setPageLoading(loading: boolean): void {
            this.pageLoading = loading;
        },

        setDarkMode(mode: ThemeEnum): void {
            this.darkMode = mode;
            localStorage.setItem(APP_DARK_MODE_KEY_, mode);
        },

        // setBeforeMiniInfo(state: BeforeMiniState): void {
        //     this.beforeMiniInfo = state;
        // }, 

        setProjectConfig(config: DeepPartial<ProjectConfig>): void {
            this.projectConfig = deepMerge(this.projectConfig || {}, config);
            // Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
        },

        // async resetAllState() {
        //     resetRouter();
        //     Persistent.clearAll();
        // },
        // async setPageLoadingAction(loading: boolean): Promise<void> {
        //     if (loading) {
        //         clearTimeout(timeId);
        //         // Prevent flicker
        //         timeId = setTimeout(() => {
        //             this.setPageLoading(loading);
        //         }, 50);
        //     } else {
        //         this.setPageLoading(loading);
        //         clearTimeout(timeId);
        //     }
        // },
    },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
    return useAppStore(store);
}