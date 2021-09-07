import type { LocaleSetting, LocaleType } from '/#/config';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { LOCALE_KEY } from '/@/enums/cacheEnum';
import { localeSetting } from '/@/settings/localeSetting';
import { localStorageService } from '/@/utils/storage'

interface LocaleState {
    localInfo: LocaleSetting;
}

const lsLocaleSetting = (localStorageService.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

export const useLocaleStore = defineStore({
    id: 'app-locale',
    state: (): LocaleState => ({
        localInfo: lsLocaleSetting, 
    }),
    getters: { 
        getShowPicker(): boolean {
            return !!this.localInfo?.showPicker;
        },
        getLocale(): LocaleType {
            return this.localInfo?.locale ?? 'zh_CN';
        },
    },
    actions: {
        setLocaleInfo(info: Partial<LocaleSetting>) {
            this.localInfo = { ...this.localInfo, ...info };
            localStorageService.set(LOCALE_KEY, this.localInfo);
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