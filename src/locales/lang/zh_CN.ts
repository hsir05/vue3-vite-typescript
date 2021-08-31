import antdLocale from 'ant-design-vue/es/locale/zh_CN';
import common from './zh-CN/common'

export default {
  message: {
   dashboard: 'Dashboard',
   exception: '错误页面',
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
