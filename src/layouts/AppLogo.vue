<template>
  <div :class="['logo', getCollapsed ? 'tc' : '']">
    <img src="../assets/logo.png" alt="logo" class="mr10" height="100%" />
    <span :class="getCollapsed ? 'hide ' : 'show'">vite-admin</span>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  export default defineComponent({
    name: 'AppLogo',
    setup() {
      const { getCollapsed } = useMenuSetting()

      return {
        getCollapsed
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
      height: 100%;
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
