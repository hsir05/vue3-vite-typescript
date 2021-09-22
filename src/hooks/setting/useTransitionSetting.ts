import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';
import type { TransitionSetting } from '/#/config';


export function useTransitionSetting() {
    const appStore = useAppStore();
    const getBasicTransition = computed(() => appStore.getTransitionSetting.basicTransition);
    const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress);


    function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
        appStore.setProjectConfig({ transitionSetting: { basicTransition: transitionSetting} });
    }

    return {
        getBasicTransition,
        setTransitionSetting,
        getOpenNProgress
    }
}