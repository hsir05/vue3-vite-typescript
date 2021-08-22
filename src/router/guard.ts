import type { Router } from 'vue-router';
import { setRouteChange } from './routeChange';

export function setupRouterGuard(router: Router){
    createPageGuard(router)
}

function createPageGuard(router: Router) {
    const loadedPageMap = new Map<string, boolean>();

    router.beforeEach(async (to) => {
        to.meta.loaded = !!loadedPageMap.get(to.path);
        setRouteChange(to);

        return true;
    });

    router.afterEach((to) => {
        loadedPageMap.set(to.path, true);
    });
}