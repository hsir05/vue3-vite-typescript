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
