import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from '/@/router';
import { registerGlobComp } from '/@/components/registerGlobComp'
import { setupI18n } from '/@/locales/index'

async function bootstrap() {
    const app = createApp(App);
    registerGlobComp(app)

    await setupI18n(app);

    setupRouter(app)
    
    await router.isReady();

    app.mount('#app', true);
}

bootstrap()

