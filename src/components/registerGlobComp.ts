import type { App } from 'vue';
import { Layout, Menu, Button, ConfigProvider, Tooltip, Divider } from "ant-design-vue";


const compList = [Button, Tooltip, ConfigProvider, Divider];

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
      // 注册全局组件
    app.component(comp.name || comp.displayName, comp);
  });

    app.use(Layout).use(Menu);
}
