
export interface DropMenu {
    onClick?: ()=>void;
    to?: string;
    icon?: string;
    event: string | number;
    text: string;
    disabled?: boolean;
    divider?: boolean;
}
export type LocaleType = 'zh_CN' | 'en';

export interface LocaleSetting {
    showPicker: boolean;
    // Current language
    locale: LocaleType;
    // default language
    fallback: LocaleType;
    // available Locales
    availableLocales: LocaleType[];
}

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN: 'en',
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LOCALE.ZH_CN,
  // Default locale
  fallback: LOCALE.ZH_CN,
  // available Locales
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};

// locale list
export const localeList: DropMenu[] = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN,
  },
  {
    text: 'English',
    event: LOCALE.EN,
  },
];
