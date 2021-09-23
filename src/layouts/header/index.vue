<template>
  <a-layout-header class="h-header">
    <!-- 切换按钮 -->
    <ToggleButton />
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
  import { defineComponent } from 'vue'
  import SettingButton from '../setting/index.vue'
  import ToggleButton from './components/ToggleButton.vue'
  import FullScreen from './components/FullScreen.vue'
  import Notify from './components/Notify/index.vue'
  import AppSearch from './components/AppSearch.vue'
  import TranslationDropDown from './components/TranslationDropDown.vue'
  import UserDropDown from './components/UserDropDown.vue'
  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      SettingButton,
      ToggleButton,
      FullScreen,
      Notify,
      AppSearch,
      UserDropDown,
      TranslationDropDown
    },
    setup() {}
  })
</script>
<style lang="less" scoped>
  .h-header {
    background: var(--header-bg-color);
    color: var(--header-text-color);
    padding: 0;
    height: 45px;
    line-height: 45px;
    .flexed();
  }
  .user-name {
    font-weight: 500;
    margin-right: 10px;
  }
</style>
