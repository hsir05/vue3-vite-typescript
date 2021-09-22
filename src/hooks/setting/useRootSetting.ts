
import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';
import type { ProjectConfig } from '/#/config';
import defaultSettings from '/@/config/defaultSettings'
type RootSetting = Omit<
    ProjectConfig,
    'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;
  
export function useRootSetting() {
    const appStore = useAppStore();
    const getThemeColor = computed(() => appStore.getProjectConfig.themeColor);

    function setRootSetting(setting: Partial<RootSetting>) {
        appStore.setProjectConfig(setting);
    }   

    const darkTheme = {
        '@border-color-base': '#E9EEF7', 
        '@layout-body-background': '#f0f2f5',
        '@layout-header-background': '#fffffe',
        '@component-background': '#fffffe',
        '@text-color': 'fade(@black, 65%)',
        '@title-color': '#333',
        '@table-header-bg': 'hsv(0, 0, 98%)',
        '@ant-selected-color': 'rgba(0, 0, 0, 0.65)',
        '@table-row-hover-bg': '#F0FDFF',
        '@modal-heading-color': 'fade(#000, 85%)',
        '@page-ellipsis-color': 'rgba(0, 0, 0, 0.25)',
        '@empty-text-color': 'rgba(0, 0, 0, 0.25)',
        '@date-last-next': 'rgba(0, 0, 0, 0.25)',
        '@cursor-text-color': '#1f1f1f',
        '@descriptions-title-color': 'rgba(0, 0, 0, 0.85)',
        '@descriptions-label-bg-color': '#fafafa',
        '@alarm-chart-bg-color': '#f2f6fa',
        '@statistic-title-color': 'rgba(0, 0, 0, 0.45)',
        '@dashboard-box-shadow': '0 1px 4px rgba(0, 0, 0, 0.15)'
    }
    
    function changeDarkTheme(){
        // @ts-ignore
        window.less.modifyVars({
            ...darkTheme
        }).then(() => {
            console.log('暗黑主题切换成功');
        })
        .catch(error => {
            console.log(error);
        });
    }
    async function changeThemeColor(color: string = defaultSettings.themeColor){
        // @ts-ignore
        window.less.modifyVars({ 
            '@primary-color': color
        }).then(() => {
            setRootSetting({ themeColor: color})
        })
        .catch(error => {
            console.log(error);
        });
    }

    return {
        getThemeColor,
        setRootSetting,
        changeThemeColor,
        changeDarkTheme
    }
}