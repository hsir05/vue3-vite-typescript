<template>
  <div :class="['logo', getCollapsed ? 'tc' : '']">
    <img src="../assets/logo.png" alt="logo" height="100%" />
    <template v-if="!getCollapsed">vite-admin</template>
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
    img {
      height: 100%;
    }
  }
  .tc {
    text-align: center;
  }
</style>
