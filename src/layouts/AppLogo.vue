<template>
  <div :class="['logo', `logo-${getLayoutMode}`]">
    <img src="../assets/logo.png" alt="logo" :class="{ logoImg: isActive }" />
    <span
      :class="['ml10', isTextLight ? 'darkText' : '', 'logo-text', isTextActive ? 'hide ' : 'show']"
      >vite-admin</span
    >
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { ThemeEnum } from '/@/enums/appEnum'
  export default defineComponent({
    name: 'AppLogo',
    setup() {
      const { getCollapsed, getMenuTheme } = useMenuSetting()
      const { getLayoutMode } = useHeaderSetting()
      const isActive = computed(() => !unref(getCollapsed) && unref(getLayoutMode) !== 'mix')
      const isTextActive = computed(
        () => !unref(getCollapsed) && unref(getLayoutMode) !== 'mix-sidebar'
      )

      const isTextLight = computed(() => unref(getMenuTheme) === ThemeEnum.LIGHT)

      return {
        getLayoutMode,
        isActive,
        isTextLight,
        isTextActive
      }
    }
  })
</script>
<style lang="less">
  .logo {
    height: 45px;
    line-height: 45px;
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    img {
      width: 30px;
    }
  }
  .logoImg {
    margin-left: -35px;
  }
  .logo-text {
    display: inline-block;
  }
  .logo-mix-sidebar {
    margin: 0;
    width: 200px;
  }
  .logo-sidebar {
    color: @white;
    .darkText {
      color: @textColor;
    }
  }
  .logo-mix {
    width: 200px;
    text-align: left;
    margin-left: 10px;
  }
  .show {
    width: auto;
  }
  .hide {
    // width: 0;
  }
</style>
