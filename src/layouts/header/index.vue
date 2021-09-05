<template>
  <a-layout-header class="h-header bb">
    <div class="h-header-app-logo">
      <AppLogo v-if="getLayoutMode !== 'sidebar'" />

      <!-- 收缩按钮 -->
      <div class="h-header-top" v-if="getLayoutMode !== 'mix'">
        <MyIcon
          type="icon-unfold"
          v-if="getCollapsed"
          class="trigger"
          @click="handleCollapsed"
          style="font-size: 22px"
        />
        <MyIcon
          type="icon-fold1"
          v-else
          class="trigger"
          @click="handleCollapsed"
          style="font-size: 22px"
        />
        <LayoutBreadcrumb />
      </div>
      <LayoutMenu :isHorizontal="true" v-if="getLayoutMode === 'mix'" />
    </div>

    <!-- 功能区 -->
    <div class="h-header-action">
      <!-- 搜索 -->
      <AppSearch />
      <!-- 通知 -->
      <Notify />
      <!-- 国际化 -->
      <TranslationDropDown />
      <!-- 全屏 -->
      <FullScreen />
      <UserDropDown />

      <SettingButton />
    </div>
  </a-layout-header>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue'
  import LayoutBreadcrumb from '../Breadcrumb.vue'
  import SettingButton from '../setting/index.vue'
  import AppLogo from '../AppLogo.vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import FullScreen from './components/FullScreen.vue'
  import Notify from './components/Notify/index.vue'
  import AppSearch from './components/AppSearch.vue'
  import TranslationDropDown from './components/TranslationDropDown.vue'
  import UserDropDown from './components/UserDropDown.vue'
  import LayoutMenu from '../Menu.vue'
  export default defineComponent({
    name: 'Header',
    components: {
      LayoutBreadcrumb,
      SettingButton,
      AppLogo,
      FullScreen,
      Notify,
      AppSearch,
      MyIcon,
      UserDropDown,
      TranslationDropDown,
      LayoutMenu
    },
    setup() {
      const { getLayoutMode } = useHeaderSetting()

      const { getCollapsed, setMenuSetting } = useMenuSetting()
      const handleCollapsed = () => {
        setMenuSetting({ collapsed: !unref(getCollapsed) })
      }
      return {
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
