import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';
import type { MultiTabsSetting } from '/#/config';


// type RootSetting = Omit<
//     ProjectConfig,
//     'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
// >;

export function useMultipleTabSetting() {
    const appStore = useAppStore();

    const getShowFold = computed(() => appStore.getMultiTabsSetting.showFold);

    function setShowFold(setting: Partial<MultiTabsSetting>) {
        console.log(setting);
        
        // appStore.setProjectConfig(setting)
    } 
 
    return{
        getShowFold,
        setShowFold
    }
}