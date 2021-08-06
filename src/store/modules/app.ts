import type {
    ProjectConfig,
    HeaderSetting,
} from '/#/config';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { deepMerge } from '/@/utils';
import { APP_DARK_MODE_KEY_ } from '/@/enums/cacheEnum';
import { darkMode } from '/@/settings/designSetting';
import { ThemeEnum } from '/@/enums/appEnum';

interface AppState { 
    darkMode?: ThemeEnum;
    // Page loading status
    pageLoading: boolean;
    // project config
    projectConfig: ProjectConfig | null;
    // When the window shrinks, remember some states, and restore these states when the window is restored
    // beforeMiniInfo: BeforeMiniState;
}
// let timeId: TimeoutHandle;

export const useAppStore = defineStore({
    id: 'app',
    state: (): AppState => ({
        darkMode: undefined,
        pageLoading: false,
        // projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
        projectConfig: null,
        // beforeMiniInfo: {},
    }),
    getters: {
        getPageLoading(): boolean {
            return this.pageLoading;
        },
        getDarkMode(): 'light' | 'dark' | string {
            return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
        },
        getLayoutMode():string {
            return this.getProjectConfig.layoutMode;
        },

        // getBeforeMiniInfo(): BeforeMiniState {
        //     return this.beforeMiniInfo;
        // },

        getProjectConfig(): ProjectConfig {
            return this.projectConfig || ({} as ProjectConfig);
        },

        getHeaderSetting(): HeaderSetting {
            return this.getProjectConfig.headerSetting;
        },
        // getMenuSetting(): MenuSetting {
        //     return this.getProjectConfig.menuSetting;
        // },
        // getTransitionSetting(): TransitionSetting {
        //     return this.getProjectConfig.transitionSetting;
        // },
        // getMultiTabsSetting(): MultiTabsSetting {
        //     return this.getProjectConfig.multiTabsSetting;
        // },
    },
    actions: {
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