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
        "403": "403",
        "404": "404",
        "500": "500",
        login: '登录',

        ...common,
        antdLocale,
    },
    //   momentLocale,
    momentLocaleName: 'zh-cn',
};
