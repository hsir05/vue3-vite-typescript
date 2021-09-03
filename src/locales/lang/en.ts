import antdLocale from 'ant-design-vue/es/locale/en_US';
import common from './en/common'
export default {
    message: {
        dashboard: 'Dashboard',
        exception: 'Exception',
        system: 'System',
        role: 'Role',
        "403": "403",
        "404": "404",
        "500": "500",
        login: 'Login',
        ...common,
        antdLocale,
    },
    //   momentLocale: null,
    momentLocaleName: 'en',
};
