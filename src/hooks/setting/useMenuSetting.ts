import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';

export function useMenuSetting() {
    const appStore = useAppStore();

    const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);
    
    return {
        getCollapsed
    }
} 