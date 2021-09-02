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
    await router.isReady();

    app.mount('#app', true);
}

bootstrap()

