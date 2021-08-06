
import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';

export function useHeaderSetting(){
    const appStore = useAppStore();

    const getHeaderTheme = computed(() => appStore.getHeaderSetting.theme);
    const getLayoutMode = computed(() => appStore.getLayoutMode);

    return {
        getHeaderTheme,
        getLayoutMode
    } 
}