import { ThemeEnum } from '/@/enums/appEnum';
export interface TransitionSetting {
    enable: boolean;
    basicTransition: RouterTransitionEnum;
    openPageLoading: boolean;
    openNProgress: boolean;
}
export interface LocaleSetting {
    showPicker: boolean;
    locale: LocaleType;
    fallback: LocaleType;
    availableLocales: LocaleType[];
}
export type LocaleType = 'zh_CN' | 'en' ;

export interface MenuSetting {
    bgColor: string;
    fixed: boolean;
    collapsed: boolean;
    canDrag: boolean;
    show: boolean;
    hidden: boolean;
    split: boolean;
    menuWidth: number;
    mode: MenuModeEnum;
    type: MenuTypeEnum;
    theme: ThemeEnum;
    topMenuAlign: 'start' | 'center' | 'end';
    trigger: TriggerEnum;
    accordion: boolean;
    closeMixSidebarOnChange: boolean;
    collapsedShowTitle: boolean;
    mixSideTrigger: MixSidebarTriggerEnum;
    mixSideFixed: boolean;
}
export interface ProjectConfig {
    permissionCacheType: CacheTypeEnum;
    layoutMode: string;
    showSettingButton: boolean;
    showDarkModeToggle: boolean;
    settingButtonPosition: SettingButtonPositionEnum;
    permissionMode: PermissionModeEnum;
    sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
    grayMode: boolean;
    colorWeak: boolean;
    themeColor: string;

    fullContent: boolean;
    contentMode: ContentEnum;
    showLogo: boolean;
    showFooter: boolean;
    headerSetting: HeaderSetting;
    menuSetting: MenuSetting;
    multiTabsSetting: MultiTabsSetting;
    transitionSetting: TransitionSetting;
    openKeepAlive: boolean;
    showBreadCrumb: boolean;
    showBreadCrumbIcon: boolean;
}
export interface HeaderSetting {
    bgColor: string;
    fixed: boolean;
    show: boolean;
    theme: ThemeEnum;
    showFullScreen: boolean;
}
export interface LayoutMode {
    layoutMode: string
}
