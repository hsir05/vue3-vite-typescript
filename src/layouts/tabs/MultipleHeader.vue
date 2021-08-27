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
      <MyIcon type="icon-shuaxin" class="multiple-icon-item" :spin="loading" @click="handleRedo" />

      <a-divider type="vertical" />
      <TabContent :tabItem="$route" isExtra />

      <a-divider type="vertical" />
      <MyIcon type="icon-feiquanping" v-if="isTabsExtra" />
      <MyIcon type="icon-fullscreen-" v-else class="multiple-icon-item" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue'
  import { Tabs } from 'ant-design-vue'
  import TabContent from './TabContent.vue'
  import { useMultipleTabStore } from '/@/store/modules/multipleTab'
  import { initAffixTabs } from './useMultipleTabs'
  import { listenerRouteChange } from '/@/router/routeChange'
  import MyIcon from '/@/components/MyIcon/index.vue'
  export default defineComponent({
    name: 'MultipleHeader',
    components: {
      TabContent,
      MyIcon,
      Tabs,
      TabPane: Tabs.TabPane
    },
    setup() {
      const loading = ref(false)
      const activeKeyRef = ref('')
      const isTabsExtra = ref(false)
      const affixTextList = initAffixTabs()
      console.log(affixTextList)

      // const go = useGo();
      const tabStore = useMultipleTabStore()

      listenerRouteChange((route) => {
        tabStore.addTab(unref(route))
        activeKeyRef.value = route.path
      })

      function handleChange(activeKey: any) {
        activeKeyRef.value = activeKey
        // go(activeKey, false);
      }
      const getTabsState = computed(() => {
        return tabStore.getTabList.filter((item) => !item.meta?.hideTab)
      })
      const unClose = computed(() => unref(getTabsState).length === 1)

      function handleEdit(targetKey: string) {
        console.log(targetKey)

        if (unref(unClose)) {
          return
        }

        // tabStore.closeTabByKey(targetKey, router);
      }

      const handleRedo = () => {
        loading.value = true

        setTimeout(() => {
          loading.value = false
        }, 1200)
      }

      return {
        handleRedo,
        isTabsExtra,
        handleChange,
        activeKeyRef,
        handleEdit,
        loading,
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
    .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
      background-color: #1890ff;
      .tab-content {
        color: white;
      }
      .ant-tabs-close-x {
        color: white;
      }
    }
  }
</style>
