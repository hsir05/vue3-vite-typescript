import type { App } from 'vue';
import less from 'less'
import '@ant-design-vue/pro-layout/dist/style.css';
import ProLayout, { PageContainer}  from '@ant-design-vue/pro-layout';
import { Layout, Menu, Button, ConfigProvider, Breadcrumb } from "ant-design-vue";

const LayoutSide = Layout.Sider
const LayoutHeader = Layout.Header
const LayoutContent = Layout.Content
const LayoutFooter = Layout.Footer

const menuItem = Menu.Item
const menuItemGroup = Menu.ItemGroup
const SubMenu = Menu.SubMenu
const Item = Breadcrumb.Item


const compList = [Layout, Button, Menu, LayoutHeader, Item, Breadcrumb, LayoutFooter, menuItemGroup, SubMenu, menuItem, LayoutContent, LayoutSide, ConfigProvider];


export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

    app.use(ProLayout).use(PageContainer).use(less);
}
