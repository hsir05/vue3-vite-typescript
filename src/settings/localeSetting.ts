
export interface DropMenu {
    onClick?: ()=>void;
    to?: string;
    icon?: string;
    event: string;
    text: string;
    disabled?: boolean;
    divider?: boolean;
}
export type LocaleType = 'zh_CN' | 'en';

export interface LocaleSetting {
    showPicker: boolean;
    locale: LocaleType;
    fallback: LocaleType;
    availableLocales: LocaleType[];
}

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN: 'en',
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  locale: LOCALE.ZH_CN,
  fallback: LOCALE.ZH_CN,
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};

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
