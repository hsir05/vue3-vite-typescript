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
    pageLoading: boolean;
    projectConfig: ProjectConfig | null;
    
}

export const useAppStore = defineStore({
    id: 'app',
    state: (): AppState => ({
        darkMode: undefined,
        pageLoading: false,
        selectedKeys: ['/dashboard/analysis'],
        projectConfig: null,
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

        setProjectConfig(config: DeepPartial<ProjectConfig>): void {
            this.projectConfig = deepMerge(this.projectConfig || {}, config);
            // Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
        },
    },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
    return useAppStore(store);
}