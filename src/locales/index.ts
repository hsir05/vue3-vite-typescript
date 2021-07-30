import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import type { I18nOptions } from 'vue-i18n';
import { localeSetting } from '/@/settings/localeSetting';

const { fallback, availableLocales } = localeSetting;
export const loadLocalePool: LocaleType[] = [];
export let i18n: ReturnType<typeof createI18n>;
export type LocaleType = 'zh-CN' | 'en' ;

function setHtmlPageLang(locale: LocaleType) {
    document.querySelector('html')?.setAttribute('lang', locale);
}

function setLoadLocalePool(cb: (loadLocalePool: LocaleType[]) => void) {
    cb(loadLocalePool);
}

async function createI18nOptions(): Promise<I18nOptions> {
    // const localeStore = useLocaleStoreWithOut();
    // const locale = localeStore.getLocale;
    const locale = 'zh-CN';
    const defaultLocal = await import(`./lang/${locale}.ts`);
    const message = defaultLocal.default?.message ?? {};

    setHtmlPageLang(locale);
    setLoadLocalePool((loadLocalePool) => {
        loadLocalePool.push(locale);
    });

    return {
        legacy: false,
        locale,
        fallbackLocale: fallback,
        messages: {
            [locale]: message,
        },
        availableLocales: availableLocales,
        sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
        silentTranslationWarn: true, // true - warning off
        missingWarn: false,
        silentFallbackWarn: true,
    };
}

export async function setupI18n(app: App) {
    const options = await createI18nOptions();

    const i18n = createI18n(options);
    app.use(i18n);
}