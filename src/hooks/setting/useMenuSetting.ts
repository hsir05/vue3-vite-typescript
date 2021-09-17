import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';
import type { ProjectConfig, MenuSetting } from '/#/config';
import { setCssVar } from './util';
import { lighten, darken } from '/@/utils/color';
import { ThemeEnum } from '/@/enums/appEnum';

type RootSetting = Omit<
    ProjectConfig,
    'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;
 
const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color';
const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color';
const SIDER_LIGHTEN_BG_COLOR = '--sider-dark-lighten-bg-color';

export function useMenuSetting() {
    const appStore = useAppStore();
 
    const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);
    const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor);
    
    const getMenuTheme = computed(() => appStore.getMenuSetting.theme);

    function settingLayoutMode(setting: Partial<RootSetting>){
        appStore.setProjectConfig(setting)
    }
    function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
        appStore.setProjectConfig({ menuSetting });
    }

    function updateSidebarBgColor(color?: string) {
        
        if (color === '#ffffff') {
            setCssVar(SIDER_DARK_BG_COLOR, color);
            appStore.setProjectConfig({ menuSetting: { bgColor: color, theme: ThemeEnum.LIGHT } });
            
        } else {
            setCssVar(SIDER_DARK_BG_COLOR, color);
            setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color!, 6));
            setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color!, 5));

            appStore.setProjectConfig({ menuSetting: { bgColor: color, theme: ThemeEnum.DARK} });
        }
       
    }
     
    return {
        getCollapsed,
        settingLayoutMode,
        setMenuSetting,
        getMenuBgColor,
        getMenuTheme,
        updateSidebarBgColor,
    }
}  