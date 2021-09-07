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
      <span @click="hanldleShowFold">
        <MyIcon type="icon-feiquanping" v-if="!getShowFold" />
        <MyIcon type="icon-fullscreen-" v-else class="multiple-icon-item" />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue'
  import { Tabs } from 'ant-design-vue'
  import TabContent from './TabContent.vue'
  import { useMultipleTabStore } from '/@/store/modules/multipleTab'
  import { listenerRouteChange } from '/@/router/routeChange'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useRouter } from 'vue-router'
  import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { MenuTypeEnum } from '/@/enums/menuEnum'
  import { initAffixTabs } from './useMultipleTabs'
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
      const router = useRouter()
      const activeKeyRef = ref('')

      const tabStore = useMultipleTabStore()
      const affixTextList = initAffixTabs()
      console.log(affixTextList)

      listenerRouteChange((route) => {
        tabStore.addTab(unref(route))
        activeKeyRef.value = route.path
      })

      function handleChange(activeKey: any) {
        activeKeyRef.value = activeKey
      }
      const getTabsState = computed(() => {
        return tabStore.getTabList.filter((item) => !item.meta?.hideTab)
      })
      const unClose = computed(() => unref(getTabsState).length === 1)

      function handleEdit(targetKey: string) {
        if (unref(unClose)) {
          return
        }
        tabStore.closeTabByKey(targetKey, router)
      }
      const { getShowFold, setShowFold } = useMultipleTabSetting()
      const { settingLayoutMode } = useMenuSetting()

      function hanldleShowFold() {
        settingLayoutMode({ layoutMode: MenuTypeEnum.MIX })

        setShowFold({ showFold: !unref(getShowFold) })
      }

      const handleRedo = () => {
        loading.value = true
        tabStore.refreshPage(router)
        setTimeout(() => {
          loading.value = false
        }, 1200)
      }

      return {
        handleRedo,
        getShowFold,
        handleChange,
        activeKeyRef,
        handleEdit,
        hanldleShowFold,
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
        &:hover {
          color: white;
        }
      }
    }
  }
</style>
