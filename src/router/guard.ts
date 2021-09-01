import type { Router } from 'vue-router';
import { setRouteChange } from './routeChange';

export function setupRouterGuard(router: Router){
    createPageGuard(router)
}

function createPageGuard(router: Router) {
    router.beforeEach(async (to) => {
        setRouteChange(to);
        return true;
    });

    // router.afterEach((to) => {
        
    // });
}