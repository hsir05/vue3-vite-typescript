import type {
    ProjectConfig,
    HeaderSetting,
    TransitionSetting,
    MultiTabsSetting,
    MenuSetting,
} from '/#/config';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import { deepMerge } from '/@/utils';
import { localStorageService } from '/@/utils/storage'

interface AppState { 
    projectConfig: ProjectConfig | null; 
}

export const useAppStore = defineStore({
    id: 'app',
    state: (): AppState => ({ 
        projectConfig: localStorageService.get(PROJ_CFG_KEY) || null,
    }), 
    getters: {
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
        setProjectConfig(config: DeepPartial<ProjectConfig>): void {
            this.projectConfig = deepMerge(this.projectConfig || {}, config);
            localStorageService.set(PROJ_CFG_KEY, this.projectConfig)
        },
    },
});

export function useAppStoreWithOut() {
    return useAppStore(store);
}