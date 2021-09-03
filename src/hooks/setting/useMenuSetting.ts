import { computed, watch } from 'vue';
import { useAppStore } from '/@/store/modules/app';
import type { ProjectConfig, MenuSetting } from '/#/config';
import { useRoute } from 'vue-router'

type RootSetting = Omit<
    ProjectConfig,
    'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;
 
export function useMenuSetting() {
    const appStore = useAppStore();
    const route = useRoute()
    
    watch(() => route.path, (path) => {
        appStore.setSelectedKeys([path])
    })
 
    const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

    const selectedKeys = computed(() => appStore.getSelectedKeys)

    function settingLayoutMode(setting: Partial<RootSetting>){
        appStore.setProjectConfig(setting)
    }
    function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
        appStore.setProjectConfig({ menuSetting });
    }
    function setSelectedKeys(selectedKeys: String[]) {
        appStore.setSelectedKeys(selectedKeys)
    }
    
    return {
        getCollapsed,
        selectedKeys,
        settingLayoutMode,
        setMenuSetting,
        setSelectedKeys
    }
}  