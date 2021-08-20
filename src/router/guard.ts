import type { Router } from 'vue-router';
import { setRouteChange } from './routeChange';

export function setupRouterGuard(router: Router){
    createPageGuard(router)
}

function createPageGuard(router: Router) {
    const loadedPageMap = new Map<string, boolean>();

    router.beforeEach(async (to) => {
        // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
        to.meta.loaded = !!loadedPageMap.get(to.path);
        // Notify routing changes
        setRouteChange(to);

        return true;
    });

    router.afterEach((to) => {
        loadedPageMap.set(to.path, true);
    });
}