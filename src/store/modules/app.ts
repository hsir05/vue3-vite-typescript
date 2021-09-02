import type {
    ProjectConfig,
    HeaderSetting,
    TransitionSetting,
    MenuSetting,
} from '/#/config';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { deepMerge } from '/@/utils';

interface AppState { 
    selectedKeys: String[];
    projectConfig: ProjectConfig | null; 
}

export const useAppStore = defineStore({
    id: 'app',
    state: (): AppState => ({
        selectedKeys: ['/dashboard'],
        projectConfig: null,
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
    },
    actions: {
        setSelectedKeys(setSelectedKeys: String[]):void{
            this.selectedKeys = setSelectedKeys;
        },
        setProjectConfig(config: DeepPartial<ProjectConfig>): void {
            this.projectConfig = deepMerge(this.projectConfig || {}, config);
        },
    },
});

export function useAppStoreWithOut() {
    return useAppStore(store);
}