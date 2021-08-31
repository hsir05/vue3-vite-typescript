import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';

export function useTransitionSetting() {
    const appStore = useAppStore();

    const getEnableTransition = computed(() => appStore.getTransitionSetting?.enable);
    const getBasicTransition = computed(() => appStore.getTransitionSetting?.basicTransition);

    return {
        getBasicTransition,
        getEnableTransition,

    }
}