<template>
  <div class="h-header-app-logo">
    <AppLogo v-if="getLayoutMode !== 'sidebar'" />
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
</template>

<script lang="ts">
  import { defineComponent, unref } from 'vue'
  import AppLogo from '../../AppLogo.vue'
  import LayoutBreadcrumb from '../../Breadcrumb.vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import LayoutMenu from '../../Menu.vue'
  export default defineComponent({
    name: 'Header',
    components: {
      LayoutBreadcrumb,
      AppLogo,
      LayoutMenu,
      MyIcon
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
<style lang="less">
  .trigger {
    font-size: 18px;
    padding: 0 24px 0 12px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .h-header-app-logo {
    display: inline-flex;
    user-select: none;
  }
  .h-header-top {
    @a: flex-start;
    .flexed();
  }
</style>
