
import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';
import type { ProjectConfig, HeaderSetting } from '/#/config';

type RootSetting = Omit<
    ProjectConfig,
    'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;

export function useHeaderSetting(){
    const appStore = useAppStore();

    const getHeaderTheme = computed(() => appStore.getHeaderSetting.theme);
    const getLayoutMode = computed(() => appStore.getLayoutMode);


    function setHeaderTheme(headerSetting: Partial<HeaderSetting>){
        appStore.setProjectConfig({ headerSetting });
    }
    return { 
        getHeaderTheme,
        getLayoutMode,
        setHeaderTheme,
    }  
}