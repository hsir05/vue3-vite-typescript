import type { App } from 'vue';
import less from 'less'
import '@ant-design-vue/pro-layout/dist/style.css';
import { Layout, Menu, Button, ConfigProvider, Breadcrumb, Divider } from "ant-design-vue";

const Item = Breadcrumb.Item


const compList = [Button, Item, Breadcrumb, ConfigProvider, Divider];


export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

    app.use(Layout).use(Menu).use(less);
}
