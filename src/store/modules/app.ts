import type {
    ProjectConfig,
    HeaderSetting,
    TransitionSetting,
    MultiTabsSetting,
    MenuSetting,
} from '/#/config';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { SELECTED_KEYS, PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import { deepMerge } from '/@/utils';
import { localStorageService, sessionStorageService } from '/@/utils/storage'

interface AppState { 
    selectedKeys: String[];
    projectConfig: ProjectConfig | null; 
}

export const useAppStore = defineStore({
    id: 'app',
    state: (): AppState => ({ 
        selectedKeys: sessionStorageService.get(SELECTED_KEYS) || ['/dashboard'],
        projectConfig: localStorageService.get(PROJ_CFG_KEY) || null,
    }), 
    getters: {
        getSelectedKeys(): String[]{
            return this.selectedKeys
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
        getMultiTabsSetting(): MultiTabsSetting {
            return this.getProjectConfig.multiTabsSetting;
        },
    },
    actions: {
        setSelectedKeys(setSelectedKeys: String[]):void{
            this.selectedKeys = setSelectedKeys;
            sessionStorageService.set(SELECTED_KEYS, this.selectedKeys)
        },
        setProjectConfig(config: DeepPartial<ProjectConfig>): void {
            this.projectConfig = deepMerge(this.projectConfig || {}, config);
            localStorageService.set(PROJ_CFG_KEY, this.projectConfig)
        },
    },
});

export function useAppStoreWithOut() {
    return useAppStore(store);
}