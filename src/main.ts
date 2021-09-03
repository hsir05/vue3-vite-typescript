import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '/@/store/index'
import { router, setupRouter } from '/@/router';
import { setupI18n } from './locales/setupI18n'
import { registerGlobComp } from '/@/components/registerGlobComp'
import { setupRouterGuard } from '/@/router/guard';

async function bootstrap() {
    const app = createApp(App);
    
    setupStore(app)
    registerGlobComp(app)
    await setupI18n(app);
    setupRouter(app)
    setupRouterGuard(router);
    await router.isReady(); //如果使用 <transition>，则可能需要等待 router 准备就绪才能挂载应用程序。 isReady路由器已就绪。

    app.mount('#app', true);
    // true 执行 hydrate() hydrate 为可选参数，ssr 的场景下会用到；
    // 对于 Vue 服务端渲染输出的 html，客户端初始化挂载节点时，会把已经渲染好的 dom 和 vnode 一一绑定，
    // 以达到同构的效果，hydrate 函数就做了这个任务
}

bootstrap()

