
import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';
import type { HeaderSetting } from '/#/config';
import { setCssVar } from './util';
import { lighten } from '/@/utils/color';

const HEADER_BG_COLOR_VAR = '--header-bg-color';
const HEADER_TEXT_COLOR_VAR = '--header-text-color';
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color';

export function useHeaderSetting(){
    const appStore = useAppStore();
    
    const getHeaderTheme = computed(() => appStore.getHeaderSetting.theme);
    const getHeaderBgColor = computed(() => appStore.getHeaderSetting.bgColor);
    const getLayoutMode = computed(() => appStore.getLayoutMode);

    function setHeaderTheme(headerSetting: Partial<HeaderSetting>){
        appStore.setProjectConfig({ headerSetting });
        updateHeaderBgColor(headerSetting.bgColor as string)
    }                       
   //  这里需要优化，颜色需要处理
    function updateHeaderBgColor(color: string){
        setCssVar(HEADER_BG_COLOR_VAR, color);
        const hoverColor = lighten(color!, 6);
        setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor);
        setCssVar(HEADER_TEXT_COLOR_VAR, '#fff')
        color === '#ffffff' ? setCssVar(HEADER_TEXT_COLOR_VAR, '#000000d9') : setCssVar(HEADER_TEXT_COLOR_VAR, '#fff');
    }
    
    return { 
        getHeaderTheme,
        getHeaderBgColor,
        getLayoutMode,
        updateHeaderBgColor,
        setHeaderTheme,
    }  
}