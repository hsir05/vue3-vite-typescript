<template>
  <a-layout-header class="h-header bb">
    <div class="h-header-app-logo">
      <AppLogo v-if="getLayoutMode !== 'sidebar'" />

      <!-- 收缩按钮 -->
      <div class="h-header-top" v-if="getLayoutMode !== 'mix'">
        <menu-unfold-outlined v-if="getCollapsed" class="trigger" @click="handleCollapsed" />
        <menu-fold-outlined v-else class="trigger" @click="handleCollapsed" />

        <LayoutBreadcrumb />
      </div>
      <slot name="layoutMenu"></slot>
    </div>

    <!-- 功能区 -->
    <div class="h-header-action">
      <a-tooltip placement="bottom">
        <template #title>
          <span>搜索</span>
        </template>
        <SearchOutlined class="pd15 h-header-action-item" />
      </a-tooltip>

      <Notify />

      <TranslationOutlined class="pd15 h-header-action-item" />

      <FullScreen />

      <div class="h-header-action-item" style="display: inline-block">
        <a-avatar class="mr10 avatar ml10" size="small">
          <template #icon><UserOutlined /></template>
        </a-avatar>

        <span class="user-name">admin</span>
      </div>
      <SettingButton />
    </div>
  </a-layout-header>
</template>
<script lang="ts">
  import { defineComponent, reactive, unref, toRefs } from 'vue'
  import LayoutBreadcrumb from '../Breadcrumb.vue'
  import SettingButton from '../setting/index.vue'
  import AppLogo from '../AppLogo.vue'
  import {
    UserOutlined,
    SearchOutlined,
    TranslationOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  } from '@ant-design/icons-vue'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import FullScreen from './components/fullScreen/index.vue'
  import Notify from './components/notify/index.vue'
  export default defineComponent({
    name: 'Header',
    components: {
      MenuUnfoldOutlined,
      MenuFoldOutlined,
      LayoutBreadcrumb,
      SettingButton,
      AppLogo,
      FullScreen,
      Notify,
      SearchOutlined,
      TranslationOutlined,
      UserOutlined
    },
    setup() {
      const { getLayoutMode } = useHeaderSetting()
      const state = reactive({
        selectedKeys: [1]
      })

      const { getCollapsed, setMenuSetting } = useMenuSetting()
      const handleCollapsed = () => {
        setMenuSetting({ collapsed: !unref(getCollapsed) })
      }
      return {
        ...toRefs(state),
        getCollapsed,
        handleCollapsed,
        getLayoutMode
      }
    }
  })
</script>
<style lang="less" scoped>
  .trigger {
    font-size: 18px;
    padding: 0 24px 0 12px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
  .h-header {
    background: @white;
    padding: 0;
    height: 45px;
    line-height: 45px;
    .flexed();
    .h-header-top {
      @a: flex-start;
      .flexed();
    }
  }
  .user-name {
    font-weight: 500;
    margin-right: 10px;
  }
  .h-header-app-logo {
    display: inline-flex;
  }
</style>
