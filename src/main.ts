import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from '/@/router';


async function bootstrap() {
    const app = createApp(App);

    setupRouter(app)

    await router.isReady();

    // createApp(App).mount('#app')
    app.mount('#app', true);
}

bootstrap()

