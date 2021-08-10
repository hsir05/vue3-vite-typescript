// import {  RouterTransitionEnum } from '/@/enums/appEnum';
import {
  MenuModeEnum,
  MenuTypeEnum,
//   TopMenuAlignEnum,
//   TriggerEnum,
//   MixSidebarTriggerEnum,
} from '/@/enums/menuEnum';

// import { useI18n } from '/@/hooks/web/useI18n';

// const { t } = useI18n();

export enum HandlerEnum {
  CHANGE_LAYOUT,
  CHANGE_THEME_COLOR,
  CHANGE_THEME,
  // menu
  MENU_HAS_DRAG,
  MENU_ACCORDION,
  MENU_TRIGGER,
  MENU_TOP_ALIGN,
  MENU_COLLAPSED,
  MENU_COLLAPSED_SHOW_TITLE,
  MENU_WIDTH,
  MENU_SHOW_SIDEBAR,
  MENU_THEME,
  MENU_SPLIT,
  MENU_FIXED,
  MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE,
  MENU_TRIGGER_MIX_SIDEBAR,
  MENU_FIXED_MIX_SIDEBAR,

  // header
  HEADER_SHOW,
  HEADER_THEME,
  HEADER_FIXED,

  HEADER_SEARCH,

  TABS_SHOW_QUICK,
  TABS_SHOW_REDO,
  TABS_SHOW,
  TABS_SHOW_FOLD,

  LOCK_TIME,
  FULL_CONTENT,
  CONTENT_MODE,
  SHOW_BREADCRUMB,
  SHOW_BREADCRUMB_ICON,
  GRAY_MODE,
  COLOR_WEAK,
  SHOW_LOGO,
  SHOW_FOOTER,

  ROUTER_TRANSITION,
  OPEN_PROGRESS,
  OPEN_PAGE_LOADING,
  OPEN_ROUTE_TRANSITION,
}

export const menuTypeList = [
  {
        // title: t('layout.setting.menuTypeSidebar'),
    title: 'layout.setting.menuTypeSidebar',
    mode: MenuModeEnum.INLINE, 
    type: MenuTypeEnum.SIDEBAR,
  },
  {
    //   title: t('layout.setting.menuTypeMix'),
    title: 'layout.setting.menuTypeMix',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX,
  },
//   {
//     //   title: t('layout.setting.menuTypeTopMenu'),
//     title: 'layout.setting.menuTypeTopMenu',
//     mode: MenuModeEnum.HORIZONTAL,
//     type: MenuTypeEnum.TOP_MENU,
//   },
  {
    //   title: t('layout.setting.menuTypeMixSidebar'),
      title: 'layout.setting.menuTypeMixSidebar',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX_SIDEBAR,
  },
];

// export const mixSidebarTriggerOptions = [
//   {
//     value: MixSidebarTriggerEnum.HOVER,
//     label: t('layout.setting.triggerHover'),
//   },
//   {
//     value: MixSidebarTriggerEnum.CLICK,
//     label: t('layout.setting.triggerClick'),
//   },
// ];