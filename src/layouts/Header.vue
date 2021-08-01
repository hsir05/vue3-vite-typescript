<template>
  <a-layout-header class="h-header bb">
    <div class="h-header-top">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="() => (collapsed = !collapsed)"
      />
      <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />

      <Breadcrumb />
    </div>

    <div class="h-header-action">
      <a-tooltip placement="bottom">
        <template #title>
          <span>搜索</span>
        </template>
        <SearchOutlined class="pd15 h-header-action-item" />
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>消息</span>
        </template>
        <BellOutlined class="pd15 h-header-action-item" />
      </a-tooltip>
      <TranslationOutlined class="pd15 h-header-action-item" />

      <a-tooltip :title="getTitle" placement="bottom" :mouse-enter-delay="0.5">
        <span @click="toggle">
          <FullscreenOutlined v-if="!isFullscreen" class="pd15 h-header-action-item" />
          <FullscreenExitOutlined v-else class="pd15 h-header-action-item" />
        </span>
      </a-tooltip>

      <div class="h-header-action-item" style="display: inline-block">
        <a-avatar class="mr10 avatar ml10" size="small">
          <template #icon><UserOutlined /></template>
        </a-avatar>

        <span class="user-name">admin</span>
      </div>

      <SettingOutlined class="pd15 h-header-action-item" />
    </div>
  </a-layout-header>
</template>
<script lang="ts">
  import { defineComponent, reactive, unref, computed, toRefs } from 'vue'
  import { useFullscreen } from '@vueuse/core'
  import Breadcrumb from './Breadcrumb.vue'
  import {
    MenuUnfoldOutlined,
    UserOutlined,
    MenuFoldOutlined,
    SettingOutlined,
    BellOutlined,
    SearchOutlined,
    TranslationOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined
  } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'Header',
    components: {
      MenuUnfoldOutlined,
      Breadcrumb,
      FullscreenOutlined,
      FullscreenExitOutlined,
      MenuFoldOutlined,
      SettingOutlined,
      BellOutlined,
      SearchOutlined,
      TranslationOutlined,
      UserOutlined
    },
    setup() {
      const { toggle, isFullscreen } = useFullscreen()
      //  const { t } = useI18n();
      const state = reactive({
        collapsed: false,
        selectedKeys: [1]
      })
      const getTitle = computed(() => {
        return unref(isFullscreen) ? '退出全屏' : '全屏'
      })
      return {
        ...toRefs(state),
        isFullscreen,
        toggle,
        getTitle
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
  .h-header-action {
    font-size: 16px;
    .h-header-action-item {
      cursor: pointer;
      &:hover {
        background-color: @boderColor;
      }
    }
  }
</style>
