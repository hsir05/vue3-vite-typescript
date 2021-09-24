<template>
  <Drawer
    :title="t('configuration')"
    :closable="true"
    width="340"
    :drawerStyle="{ overflow: 'hidden' }"
    :bodyStyle="{ overflowY: 'scroll', height: '92%' }"
    :destroyOnClose="true"
    @close="close"
    v-model:visible="visibleRef"
    class="drawer-wrap"
  >
    <div class="drawer-container">
      <!-- 这里可以优化 抽离公共组件 -->
      <Divider orientation="center" plain>{{ t('darkMode') }}</Divider>
      <Switch v-model:checked="checked" class="dark-mode" @change="handleDark">
        <template #checkedChildren>
          <MyIcon type="icon-icon-test" style="font-size: 18px" />
        </template>
        <template #unCheckedChildren>
          <MyIcon type="icon-yueliang1" style="font-size: 18px" />
        </template>
      </Switch>

      <Divider orientation="center" plain>{{ t('navigationMode') }}</Divider>
      <div class="navigation-mode-wrap">
        <template v-for="item in menuTypeList || []" :key="item.title">
          <Tooltip :title="t(item.title)" placement="bottom">
            <div
              :class="[
                'navigation-mode',
                `navigation-mode-${item.type}`,
                `${getLayoutMode === item.type ? 'navigation-mode-active' : ''}`
              ]"
              @click="handleLayout(item)"
            ></div>
          </Tooltip>
        </template>
      </div>

      <SettingTheme
        :title="t('systemTheme')"
        :theme="getThemeColor"
        :colorList="APP_PRESET_COLOR_LIST"
        @handeSetting="handleSystemTheme"
      />

      <SettingTheme
        :title="t('headerTheme')"
        :theme="getHeaderBgColor"
        :colorList="APP_TOP_COLOR_LIST"
        @handeSetting="handleHeaderTheme"
      />

      <SettingTheme
        :title="t('menuTheme')"
        :theme="getMenuBgColor"
        :colorList="APP_MENU_COLOR_LIST"
        @handeSetting="handleMenuTheme"
      />

      <Divider orientation="center" plain>{{ t('setting.interfaceDisplay') }}</Divider>
      <SettingSelect
        class="pt0"
        :title="t('setting.colorWeak')"
        :checked="getColorWeak"
        @handeSetting="handleColorWeak"
      />

      <SettingSelect
        :title="t('setting.grayMode')"
        :checked="getGrayMode"
        @handeSetting="handleGrayMode"
      />

      <SettingSelect
        :title="t('setting.tabs')"
        :checked="getMultiTabs"
        @handeSetting="handleMultiTabs"
      />

      <SettingSelect
        :title="t('setting.menuCollapse')"
        :checked="getCollapsed"
        @handeSetting="handleMenuCollapse"
      />

      <SettingSelect
        :title="t('setting.fixedHeader')"
        :checked="getHeaderFixed"
        @handeSetting="handleFixedHeader"
      />

      <Divider orientation="center" plain>{{ t('setting.animation') }}</Divider>
      <SettingSelect
        class="pt0"
        :title="t('setting.progress')"
        :checked="getOpenNProgress"
        @handeSetting="handleprogress"
      />

      <div class="h-setting-select-item">
        <span>{{ t('setting.switchAnimation') }}</span>
        <Select
          ref="select"
          v-model:value="animation"
          @change="handleAnimation"
          size="small"
          style="width: 120px"
        >
          <Option :value="item.value" v-for="item in routerTransitionOptions" :key="item.value">{{
            item.label
          }}</Option>
        </Select>
      </div>

      <Button type="primary" class="mt20 mb10" style="width: 100%" @click="handleClearAll">{{
        t('setting.clearBtn')
      }}</Button>
    </div>
  </Drawer>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { Drawer, Divider, Switch, Tooltip, Button, Select } from 'ant-design-vue'
  import SettingSelect from './components/SettingSelect.vue'
  import SettingTheme from './components/SettingTheme.vue'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useRootSetting } from '/@/hooks/setting/useRootSetting'
  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting'
  import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting'

  import { useI18n } from '/@/hooks/web/useI18n'
  import { menuTypeList } from '../enum'
  import { MenuTypeEnum } from '/@/enums/menuEnum'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { localStorageService, sessionStorageService } from '/@/utils/storage'
  import { useRouter } from 'vue-router'
  import { routerTransitionOptions } from '/@/settings/enum'
  import {
    APP_PRESET_COLOR_LIST,
    APP_TOP_COLOR_LIST,
    APP_MENU_COLOR_LIST
  } from '/@/settings/designSetting'
  export default defineComponent({
    name: 'SettingDrawer',
    components: {
      Drawer,
      Divider,
      Switch,
      MyIcon,
      Tooltip,
      SettingSelect,
      SettingTheme,
      Button,
      Select,
      Option: Select.Option
    },
    props: {
      visible: {
        type: Boolean,
        default: () => false
      }
    },
    emits: ['handleClose'],
    setup(props, { emit }) {
      const router = useRouter()
      const { setTransitionSetting, getBasicTransition, getOpenNProgress } = useTransitionSetting()
      const { getMultiTabs, setMultiTabsSetting } = useMultipleTabSetting()

      const visibleRef = ref<boolean>(false)
      const checked = ref<boolean>(false)
      const animation = ref(getBasicTransition.value)
      const { t } = useI18n()
      const {
        getThemeColor,
        getColorWeak,
        getGrayMode,
        setRootSetting,
        changeThemeColor,
        updateColorWeak,
        updateGrayMode,
        changeDarkTheme
      } = useRootSetting()

      const {
        getLayoutMode,
        getHeaderBgColor,
        updateHeaderBgColor,
        getHeaderTheme,
        setHeaderSetting,
        getHeaderFixed
      } = useHeaderSetting()

      const { setLayoutMode, getCollapsed, getMenuBgColor, setMenuSetting, updateSidebarBgColor } =
        useMenuSetting()

      const close = () => {
        visibleRef.value = false
        emit('handleClose', false)
      }

      watch(
        () => props.visible,
        (newVal, oldVal) => {
          if (newVal !== oldVal) visibleRef.value = newVal
        },
        { deep: true }
      )

      const handleDark = () => {
        changeDarkTheme()
      }
      const handleSystemTheme = (color: string): void => {
        setRootSetting({ themeColor: color })
        changeThemeColor(color)
        close()
      }

      const handleHeaderTheme = (color: string): void => {
        setHeaderSetting({ bgColor: color })
        close()
      }
      const handleMenuTheme = (color: string): void => {
        updateSidebarBgColor(color)
        close()
      }
      const handleLayout = (item) => {
        setLayoutMode({ layoutMode: item.type })
        setMenuSetting({ collapsed: false })
        close()
      }

      const handleColorWeak = (bool: boolean) => {
        updateColorWeak(bool)
      }

      const handleGrayMode = (bool: boolean) => {
        updateGrayMode(bool)
      }

      const handleMenuCollapse = (bool: boolean) => {
        setMenuSetting({ collapsed: bool })
      }

      const handleFixedHeader = (bool: boolean) => {
        setHeaderSetting({ fixed: bool })
      }

      const handleprogress = (bool: boolean) => {
        setTransitionSetting({ openNProgress: bool })
      }
      const handleAnimation = (animation: string) => {
        setTransitionSetting({ basicTransition: animation })
      }

      const handleMultiTabs = (bool: boolean) => {
        setMultiTabsSetting({ show: bool })
      }

      const handleClearAll = () => {
        localStorageService.clearAll()
        sessionStorageService.clearAll()

        changeThemeColor()
        setLayoutMode({ layoutMode: MenuTypeEnum.SIDEBAR })
        updateHeaderBgColor()
        updateSidebarBgColor()

        router.replace('/login')
      }

      return {
        getThemeColor,
        getHeaderBgColor,
        getHeaderFixed,
        getCollapsed,
        getMenuBgColor,
        getBasicTransition,
        getColorWeak,
        getGrayMode,
        getMultiTabs,
        visibleRef,
        checked,
        animation,

        APP_PRESET_COLOR_LIST,
        APP_TOP_COLOR_LIST,
        APP_MENU_COLOR_LIST,
        close,
        handleLayout,
        handleSystemTheme,
        handleHeaderTheme,
        handleMenuTheme,
        menuTypeList,
        handleDark,
        getLayoutMode,
        getHeaderTheme,
        handleMenuCollapse,
        handleFixedHeader,
        handleClearAll,
        handleAnimation,
        routerTransitionOptions,
        getOpenNProgress,
        handleprogress,
        handleMultiTabs,
        handleColorWeak,
        handleGrayMode,
        t
      }
    }
  })
</script>
<style lang="less">
  .drawer-wrap {
    .ant-drawer-body {
      padding: 5px 24px;
    }
  }
  .dark-mode.ant-switch {
    background-color: #000;
  }
  .drawer-container {
    text-align: center;
  }
  .navigation-mode-wrap {
    display: flex;
    justify-content: space-around;
    .navigation-mode {
      position: relative;
      width: 56px;
      height: 48px;
      margin-right: 16px;
      overflow: hidden;
      cursor: pointer;
      background-color: @boderColor;
      border-radius: 6px;
      box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
      box-sizing: border-box;
      border: 1px solid #ddd;
      &:after,
      &:before {
        position: absolute;
        content: '';
      }
      &:hover {
        padding: 12px;
        border: 2px solid @primary-color;
      }
    }
    .navigation-mode-active {
      padding: 12px;
      border: 2px solid @primary-color;
    }

    .navigation-mode-sidebar {
      &:after {
        .mode(100%, 25%, @white);
      }
      &:before {
        .mode(33%, 100%, @navigationColor);
        z-index: 1;
        border-radius: 4px 0 0 4px;
      }
    }
    .navigation-mode-mix-sidebar {
      &:after {
        .mode(100%, 25%, @navigationColor);
        z-index: 1;
      }
      &:before {
        .mode(33%, 100%, @white);
        border-radius: 4px 0 0 4px;
      }
    }
    .navigation-mode-mix {
      &:after {
        .mode(100%, 25%, @navigationColor);
      }
    }
  }
  .system-theme {
    .system-theme-item {
      display: inline-block;
      margin: 0 5px;
      width: 20px;
      height: 20px;
      cursor: pointer;
      border: 1px solid @borderColor2;
      border-radius: 2px;
    }
  }
</style>
