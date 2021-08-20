import { toRaw, ref } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';
import { useRouter } from 'vue-router';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';

export function initAffixTabs(): string[]{
    const affixList = ref<RouteLocationNormalized[]>([]);
    const tabStore = useMultipleTabStore();
    const router = useRouter();

    function filterAffixTabs(routes: RouteLocationNormalized[]){
        const tabs: RouteLocationNormalized[] = [];
        routes && routes.forEach((route) => {
            if (route.meta && route.meta.affix){
                tabs.push(toRaw(route))
            }
        })
        return tabs;
    }

    function addAffixTabs(): void {
        const affixTabs = filterAffixTabs(router.getRoutes() as unknown as RouteLocationNormalized[])
        affixList.value = affixTabs;
        for (const tab of affixTabs) {
            tabStore.addTab({
                meta: tab.meta,
                name: tab.name,
                path: tab.path,
            } as unknown as RouteLocationNormalized);
        }
    }

    let isAddAffix = false
    if (!isAddAffix){
        addAffixTabs();
        isAddAffix = true;
    }

    return affixList.value.map((item) => item.meta?.title).filter(Boolean) as string[];
}