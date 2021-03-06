import {
    RouterTransitionEnum,
} from '/@/enums/appEnum';
import { primaryColor } from '../../build/themeConfig';
// import { ThemeEnum } from '/@/enums/appEnum'
/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * contentWidth - 内容区布局： 流式 |  固定
 *
 */ 

export default {
    menuSetting: {
        collapsed: false,
        bgColor: '#000000d9',
        theme: 'dark',
    },
    multiTabsSetting: {
        cache:true,
        showFold: true,
        show: true,
    },
    headerSetting: {
        bgColor: '#fffffe',
        fixed: true,
        show: true,
        theme: '#fffffe',
        showFullScreen: true,
    },
    transitionSetting: {
        enable: true,
        basicTransition: RouterTransitionEnum.FADE_SIDE,
        openPageLoading: true,
        openNProgress: false,
    },
    isHorizontal: true,
    layoutMode: 'sidebar',
    navTheme: 'dark', 
    themeColor: primaryColor,
    layout: 'sidemenu',
    contentWidth: 'Fluid', 
    colorWeak: false,
    grayMode: false,
    menu: {
        locale: true
    },
    title: 'vite-admin',
    pwa: false,
    iconfontUrl: '',
    production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
}
