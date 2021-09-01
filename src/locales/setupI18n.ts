import type { App } from 'vue';
import type { I18n, I18nOptions } from 'vue-i18n';

import { createI18n } from 'vue-i18n';
import { localeSetting } from '/@/settings/localeSetting';
import { useLocaleStoreWithOut } from '/@/store/modules/locale';
import type { LocaleType } from '/#/config';

const { fallback, availableLocales } = localeSetting;

export let i18n: ReturnType<typeof createI18n>;

export const loadLocalePool: LocaleType[] = [];

export function setHtmlPageLang(locale: LocaleType) {
    document.querySelector('html')?.setAttribute('lang', locale);
}

export function setLoadLocalePool(cb: (loadLocalePool: LocaleType[]) => void) {
    cb(loadLocalePool);
} 

async function createI18nOptions(): Promise<I18nOptions> {
    const localeStore = useLocaleStoreWithOut();
    const locale = localeStore.getLocale;
    const defaultLocal = await import(`./lang/${locale}.ts`);
    const message = defaultLocal.default?.message ?? {};
    setHtmlPageLang(locale);

    setLoadLocalePool((loadLocalePool) => {
        loadLocalePool.push(locale);
    });

    return {
        legacy: false,
        locale,
        fallbackLocale: fallback, // 预设的语言环境。
        messages: { //本地化的语言环境信息
            [locale]: message,
        },
        availableLocales: availableLocales, // messages 中的可用语言环境列表。
        sync: true, //是否将根级别语言环境与组件本地化语言环境同步
        silentTranslationWarn: true, // 是否取消本地化失败时输出的警告
        missingWarn: false,
        silentFallbackWarn: true, // 如果为 true，则仅在根本没有可用的转换时生成警告，而不是在回退时
    };
}

export async function setupI18n(app: App) {
    const options = await createI18nOptions();
    i18n = createI18n(options) as I18n;
    app.use(i18n);
}
