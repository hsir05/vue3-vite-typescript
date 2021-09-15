import antdLocale from 'ant-design-vue/es/locale/zh_CN';
import common from './zh-CN/common'

export default {
    message: {
        dashboard: 'Dashboard',
        exception: '错误页面',
        system: '系统管理',
        role: '角色管理', 
        users: '用户管理',
        menus: '菜单管理',

        configuration: '项目配置',
        darkMode: '主题',
        navigationMode: '导航栏模式',
        systemTheme: '系统主题',
        headerTheme: '顶栏主题',
        menuTheme: '菜单主题',

        "403": "403",
        "404": "404",
        "500": "500",
        login: '登录',
        loginOut: '退出系统',

        tooltipEntryFull: '全屏',
        tooltipExitFull: '退出全屏',

        ...common,
        antdLocale,
    },
    //   momentLocale,
    momentLocaleName: 'zh-cn',
};
