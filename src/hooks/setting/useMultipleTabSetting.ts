import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';
import type { MultiTabsSetting } from '/#/config';

export function useMultipleTabSetting() {
    const appStore = useAppStore();

    const getShowFold = computed(() => appStore.getMultiTabsSetting.showFold);

    function setShowFold(multiTabsSetting: Partial<MultiTabsSetting>) {
        appStore.setProjectConfig({ multiTabsSetting })
    } 
 
    return{
        getShowFold,
        setShowFold
    }
}