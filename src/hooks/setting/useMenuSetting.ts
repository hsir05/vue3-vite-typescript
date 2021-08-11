import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';
import type { ProjectConfig } from '/#/config';
import type { MenuSetting } from '/#/config';
type RootSetting = Omit<
    ProjectConfig,
    'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;

export function useMenuSetting() {
    const appStore = useAppStore();

    const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

    function settingLayoutMode(setting: Partial<RootSetting>){
        appStore.setProjectConfig(setting)
    }
    function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
        appStore.setProjectConfig({ menuSetting });
    }
    
    return {
        getCollapsed,
        settingLayoutMode,
        setMenuSetting
    }
}  