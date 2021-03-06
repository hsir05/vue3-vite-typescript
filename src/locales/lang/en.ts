import antdLocale from 'ant-design-vue/es/locale/en_US';
import common from './en/common'
import component from './en/component'
import layout from './en/layout'
import demo from './en/routes/demo'
export default {
    message: {
        dashboard: 'Dashboard',
        exception: 'Exception',
        system: 'System',
        role: 'Role',
        users: 'Users',
        menus: 'Menus',
        account: 'Personal',
        accountCenter: 'Personal Center',
        accountSetting: 'Personal Settings',

        configuration: 'Configuration',
        darkMode: 'Dark mode',
        navigationMode: 'Navigation mode',
        systemTheme: 'System theme',
        headerTheme: 'Header theme',
        menuTheme: 'Menu theme',

        "403": "403",
        "404": "404",
        "500": "500",
        login: 'Login',
        loginOut: 'Login Out',

        tooltipEntryFull: 'Full Screen',
        tooltipExitFull: 'Exit Full Screen',

        ...common,
        ...component,
        ...demo,
        ...layout,
        antdLocale,
    },
    //   momentLocale: null,
    momentLocaleName: 'en',
};
