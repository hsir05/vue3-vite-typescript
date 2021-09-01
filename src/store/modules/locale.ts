import type { LocaleSetting, LocaleType } from '/#/config';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { localeSetting } from '/@/settings/localeSetting';

interface LocaleState {
    localInfo: LocaleSetting;
}

const lsLocaleSetting = localeSetting as LocaleSetting;

export const useLocaleStore = defineStore({
    id: 'app-locale',
    state: (): LocaleState => ({
        localInfo: lsLocaleSetting,
    }),
    getters: {
        getLocale(): LocaleType {
            return this.localInfo?.locale ?? 'zh_CN';
        },
    },
    actions: {
        setLocaleInfo(info: Partial<LocaleSetting>) {
            this.localInfo = { ...this.localInfo, ...info };
        },
        initLocale() {
            this.setLocaleInfo({
                ...localeSetting,
                ...this.localInfo,
            });
        },
    }
})

export function useLocaleStoreWithOut() {
    return useLocaleStore(store);
}