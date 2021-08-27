import { computed, unref, reactive } from 'vue';
import type { ComputedRef } from 'vue';
import { MenuEventEnum } from './types';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { RouteLocationNormalized, useRouter } from 'vue-router';
import type { TabContentProps } from './types';

interface DropMenu {
    onClick?: () => void;
    to?: string;
    icon?: string;
    event: string | number;
    text: string;
    disabled?: boolean;
    divider?: boolean;
}

export function useTabDropdown(tabContentProps: TabContentProps, getIsTabs: ComputedRef<boolean>) {

    const tabStore = useMultipleTabStore();
    const state = reactive({
        current: null as Nullable<RouteLocationNormalized>,
        currentIndex: 0,
    });
    const { currentRoute } = useRouter();

    const getTargetTab = computed((): RouteLocationNormalized => {
        return unref(getIsTabs) ? tabContentProps.tabItem : unref(currentRoute);
    });

    const getDropMenuList = computed(() => {
        if (!unref(getTargetTab)) {
            return;
        }
        const { meta } = unref(getTargetTab);
        const { path } = unref(currentRoute);

        // Refresh button 
        const curItem = state.current;
        const index = state.currentIndex;
        const refreshDisabled = curItem ? unref(curItem.path) !== path : true;
        // Close left
        const closeLeftDisabled = index === 0;

        const disabled = tabStore.getTabList.length === 1;
 
        // Close right
        const closeRightDisabled =
            index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0;
        const dropMenuList: DropMenu[] = [
            {
                icon: 'icon-shuaxin',
                event: MenuEventEnum.REFRESH_PAGE,
                text: '重新加载',
                disabled: refreshDisabled,
            },
            {
                icon: 'icon-searchclose',
                event: MenuEventEnum.CLOSE_CURRENT,
                text: '关闭标签页',
                disabled: !!meta?.affix || disabled,
                divider: true,
            },
            {
                icon: 'icon-arrow',
                event: MenuEventEnum.CLOSE_LEFT,
                text: '关闭右侧标签页',
                disabled: closeLeftDisabled,
                divider: false,
            },
            {
                icon: 'icon-arrow-right1',
                event: MenuEventEnum.CLOSE_RIGHT,
                text: '关闭左侧标签页',
                disabled: closeRightDisabled,
                divider: true,
            },
            {
                icon: 'icon-pic-center',
                event: MenuEventEnum.CLOSE_OTHER,
                text: '关闭其他标签页',
                disabled: disabled,
            },
            {
                icon: 'icon-minus',
                event: MenuEventEnum.CLOSE_ALL,
                text: '关闭全部标签页',
                disabled: disabled,
            },
        ];

        return dropMenuList;
    });

    function handleContextMenu(tabItem: RouteLocationNormalized) {
        return (e: Event) => {
            if (!tabItem) {
                return;
            }
            e?.preventDefault();
            const index = tabStore.getTabList.findIndex((tab) => tab.path === tabItem.path);
            state.current = tabItem;
            state.currentIndex = index;
        };
    }

    return { getDropMenuList, handleContextMenu }
}

