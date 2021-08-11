<template>
  <div
    :class="[
      'logo',
      getCollapsed && getLayoutMode !== 'mix-sidebar' ? 'tc' : '',
      `logo-${getLayoutMode}`
    ]"
  >
    <img src="../assets/logo.png" alt="logo" class="mr10" />
    <span :class="getCollapsed && getLayoutMode !== 'mix-sidebar' ? 'hide ' : 'show'"
      >vite-admin</span
    >
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'

  export default defineComponent({
    name: 'AppLogo',
    setup() {
      const { getCollapsed } = useMenuSetting()
      const { getLayoutMode } = useHeaderSetting()

      return {
        getCollapsed,
        getLayoutMode
      }
    }
  })
</script>
<style lang="less">
  .logo {
    height: 32px;
    margin: 16px;
    font-weight: 600;
    font-size: 18px;
    color: @white;
    text-align: left;
    width: 168px;
    transition: all;
    img {
      width: 30px;
    }
  }
  .tc {
    text-align: center;
    width: 60px;
  }
  .show {
    display: inline-block;
  }
  .hide {
    display: none;
  }
</style>
