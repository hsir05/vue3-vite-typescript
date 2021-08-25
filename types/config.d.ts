// declare module 'ant-design-vue/es/locale/zh_CN';
// declare module 'ant-design-vue/es/locale/en_US';
import {
    ThemeEnum,
} from '/@/enums/appEnum';

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
    // Storage location of permission related information
    permissionCacheType: CacheTypeEnum;
    // Whether to show the configuration button
    showSettingButton: boolean;
    // Whether to show the theme switch button
    showDarkModeToggle: boolean;
    // Configure where the button is displayed
    settingButtonPosition: SettingButtonPositionEnum;
    // Permission mode
    permissionMode: PermissionModeEnum;
    // Session timeout processing
    sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
    // Website gray mode, open for possible mourning dates
    grayMode: boolean;
    // Whether to turn on the color weak mode
    colorWeak: boolean;
    // Theme color
    themeColor: string;

    // The main interface is displayed in full screen, the menu is not displayed, and the top
    fullContent: boolean;
    // content width
    contentMode: ContentEnum;
    // Whether to display the logo
    showLogo: boolean;
    // Whether to show the global footer
    showFooter: boolean;
    // menuType: MenuTypeEnum;
    headerSetting: HeaderSetting;
    // menuSetting
    menuSetting: MenuSetting;
    // Multi-tab settings
    multiTabsSetting: MultiTabsSetting;
    // Animation configuration
    transitionSetting: TransitionSetting;
    // pageLayout whether to enable keep-alive
    openKeepAlive: boolean;
    // Lock screen time
    lockTime: number;
    // Show breadcrumbs
    showBreadCrumb: boolean;
    // Show breadcrumb icon
    showBreadCrumbIcon: boolean;
    // Use error-handler-plugin
    useErrorHandle: boolean;
    // Whether to open back to top
    useOpenBackTop: boolean;
    // Is it possible to embed iframe pages
    canEmbedIFramePage: boolean;
    // Whether to delete unclosed messages and notify when switching the interface
    closeMessageOnSwitch: boolean;
    // Whether to cancel the http request that has been sent but not responded when switching the interface.
    removeAllHttpPending: boolean;
}
export interface HeaderSetting {
    bgColor: string;
    fixed: boolean;
    show: boolean;
    theme: ThemeEnum;
    // Turn on full screen
    showFullScreen: boolean;
    // Whether to show the lock screen
    // useLockPage: boolean;
    // // Show document button
    // showDoc: boolean;
    // // Show message center button
    // showNotice: boolean;
    // showSearch: boolean;
}
export interface LayoutMode {
    layoutMode: string
}
