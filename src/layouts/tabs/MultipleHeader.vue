<template>
  <div class="multiple-header">
    <div class="ml10">
      <Tabs
        type="editable-card"
        size="small"
        :animated="false"
        :hideAdd="true"
        :tabBarGutter="3"
        :activeKey="activeKeyRef"
        @change="handleChange"
        @edit="handleEdit"
      >
        <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
          <TabPane :closable="!(item && item.meta && item.meta.affix)">
            <template #tab>
              <TabContent :tabItem="item" />
            </template>
          </TabPane>
        </template>
      </Tabs>
    </div>

    <div class="mr10 multiple-header-icon">
      <a-divider type="vertical" />
      <RedoOutlined class="multiple-icon-item" />
      <a-divider type="vertical" />
      <DownOutlined class="multiple-icon-item" />
      <a-divider type="vertical" />
      <FullscreenExitOutlined v-if="isTabsExtra" />
      <FullscreenOutlined v-else class="multiple-icon-item" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue'
  import { Tabs } from 'ant-design-vue'
  import TabContent from './TabContent.vue'
  import {
    RedoOutlined,
    DownOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined
  } from '@ant-design/icons-vue'
  import { useMultipleTabStore } from '/@/store/modules/multipleTab'
  import { initAffixTabs } from './useMultipleTabs'
  import { listenerRouteChange } from '/@/router/routeChange'
  export default defineComponent({
    name: 'MultipleHeader',
    components: {
      TabContent,
      RedoOutlined,
      FullscreenOutlined,
      DownOutlined,
      FullscreenExitOutlined,
      Tabs,
      TabPane: Tabs.TabPane
    },
    setup() {
      const activeKeyRef = ref('')
      const isTabsExtra = ref(false)
      const affixTextList = initAffixTabs()
      console.log(affixTextList)

      // const go = useGo();
      const tabStore = useMultipleTabStore()

      listenerRouteChange((route) => {
        console.log(unref(route))
        tabStore.addTab(unref(route))

        // const { name } = route;
        // if (name === REDIRECT_NAME || !route || !userStore.getToken) {
        //   return;
        // }

        // const { path, fullPath, meta = {} } = route;
        // const { currentActiveMenu, hideTab } = meta as RouteMeta;
        // const isHide = !hideTab ? null : currentActiveMenu;
        // const p = isHide || fullPath || path;
        // if (activeKeyRef.value !== p) {
        //   activeKeyRef.value = p as string;
        // }

        // if (isHide) {
        //   const findParentRoute = router
        //     .getRoutes()
        //     .find((item) => item.path === currentActiveMenu);

        //   findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized);
        // } else {
        //   tabStore.addTab(unref(route));
        // }
      })

      function handleChange(activeKey: any) {
        activeKeyRef.value = activeKey
        // go(activeKey, false);
      }
      const getTabsState = computed(() => {
        return tabStore.getTabList.filter((item) => !item.meta?.hideTab)
      })
      console.log('getTabsState')
      console.log(unref(getTabsState))

      const unClose = computed(() => unref(getTabsState).length === 1)

      function handleEdit(targetKey: string) {
        console.log(targetKey)

        if (unref(unClose)) {
          return
        }

        // tabStore.closeTabByKey(targetKey, router);
      }
      return {
        isTabsExtra,
        handleChange,
        activeKeyRef,
        handleEdit,
        getTabsState
      }
    }
  })
</script>
<style lang="less">
  .multiple-header {
    .flexed();
    cursor: pointer;
    background-color: @white;
    padding-top: 2px;
    padding-bottom: 2px;
    .multiple-header-icon {
      color: @iconColor;
    }
    .multiple-icon-item {
      &:hover {
        color: @iconHoverColor;
      }
    }
    .ant-tabs-bar {
      margin: 0;
      border-bottom: 0;
    }
    .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
      border-color: #f0f0f0;
    }
    .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      color: #333;
      padding: 0 10px;
    }
    .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-nav-container {
      height: 29px;
    }
  }
</style>
