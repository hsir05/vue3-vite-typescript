<template>
  <Drawer
    :title="t('configuration')"
    :closable="true"
    width="350"
    :destroyOnClose="true"
    @close="close"
    v-model:visible="visibleRef"
    class="drawer-wrap"
  >
    <div class="drawer-container">
      <!-- 这里可以优化 抽离公共组件 -->
      <Divider orientation="center">{{ t('darkMode') }}</Divider>
      <Switch v-model:checked="checked" class="dark-mode" @change="handleSwitch">
        <template #checkedChildren>
          <MyIcon type="icon-icon-test" style="font-size: 18px" />
        </template>
        <template #unCheckedChildren>
          <MyIcon type="icon-yueliang1" style="font-size: 18px" />
        </template>
      </Switch>

      <Divider orientation="center">{{ t('navigationMode') }}</Divider>
      <div class="navigation-mode-wrap">
        <template v-for="item in menuTypeList || []" :key="item.title">
          <Tooltip :title="item.title" placement="bottom">
            <div
              :class="[
                'navigation-mode',
                `navigation-mode-${item.type}`,
                `${getLayoutMode === item.type ? 'navigation-mode-active' : ''}`
              ]"
              @click="handler(item)"
            ></div>
          </Tooltip>
        </template>
      </div>

      <Divider orientation="center">{{ t('systemTheme') }}</Divider>
      <div class="clearfix flex">
        <div
          :class="['theme-color', getThemeColor === color ? 'theme-color-active' : '']"
          v-for="color in APP_PRESET_COLOR_LIST"
          :key="color"
          :style="{ backgroundColor: color }"
          @click="handleSystemTheme(color)"
        >
          <MyIcon type="icon-gou" v-if="getThemeColor === color" style="font-size: 18px" />
        </div>
      </div>

      <Divider orientation="center">{{ t('headerTheme') }}</Divider>
      <div class="clearfix flex">
        <div
          :class="['theme-color', getHeaderBgColor === color ? 'theme-color-active' : '']"
          v-for="color in APP_TOP_COLOR_LIST"
          :key="color"
          :style="{ backgroundColor: color }"
          @click="handleHeaderTheme(color)"
        >
          <MyIcon type="icon-gou" v-if="getHeaderBgColor === color" style="font-size: 18px" />
        </div>
      </div>

      <Divider orientation="center">{{ t('menuTheme') }}</Divider>
      <div class="clearfix flex">
        <div
          :class="['theme-color', getMenuBgColor === color ? 'theme-color-active' : '']"
          v-for="color in APP_MENU_COLOR_LIST"
          :key="color"
          :style="{ backgroundColor: color }"
          @click="handleMenuTheme(color)"
        >
          <MyIcon type="icon-gou" v-if="getMenuBgColor === color" style="font-size: 18px" />
        </div>
      </div>

      <SettingSelect :checked="getCollapsed" @handeSetting="handleMenuCollapse" />
    </div>
  </Drawer>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { Drawer, Divider, Switch, Tooltip } from 'ant-design-vue'
  import SettingSelect from './components/SettingSelect.vue'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useRootSetting } from '/@/hooks/setting/useRootSetting'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { menuTypeList } from '../enum'
  import MyIcon from '/@/components/MyIcon/index.vue'
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
      SettingSelect
    },
    props: {
      visible: {
        type: Boolean,
        default: () => false
      }
    },
    emits: ['handleClose'],
    setup(props, { emit }) {
      const visibleRef = ref<boolean>(false)
      const checked = ref<boolean>(false)
      const { t } = useI18n()
      const { getThemeColor, setRootSetting, changeThemeColor } = useRootSetting()
      const { getLayoutMode, getHeaderBgColor, getHeaderTheme, setHeaderTheme } = useHeaderSetting()
      const {
        settingLayoutMode,
        getCollapsed,
        getMenuBgColor,
        setMenuSetting,
        updateSidebarBgColor
      } = useMenuSetting()

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

      const handleSwitch = () => {
        console.log(checked.value)
      }
      const handleSystemTheme = (color: string): void => {
        setRootSetting({ themeColor: color })
        changeThemeColor(color)
        close()
      }
      const handleHeaderTheme = (color: string): void => {
        setHeaderTheme({ bgColor: color })
        close()
      }
      const handleMenuTheme = (color: string): void => {
        updateSidebarBgColor(color)
        close()
      }
      const handler = (item) => {
        settingLayoutMode({ layoutMode: item.type })
        setMenuSetting({ collapsed: false })
        close()
      }

      const handleMenuCollapse = (bool) => {
        setMenuSetting({ collapsed: bool })
      }

      return {
        getThemeColor,
        getHeaderBgColor,
        getCollapsed,
        getMenuBgColor,
        visibleRef,
        checked,
        APP_PRESET_COLOR_LIST,
        APP_TOP_COLOR_LIST,
        APP_MENU_COLOR_LIST,
        close,
        handler,
        handleSystemTheme,
        handleHeaderTheme,
        handleMenuTheme,
        menuTypeList,
        handleSwitch,
        getLayoutMode,
        getHeaderTheme,
        handleMenuCollapse,
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
    .theme-color {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      cursor: pointer;
      text-align: center;
      color: @white;
      font-weight: 700;
      border: 1px solid #ddd;
    }
    .theme-color-active {
      border: 1px solid @primary-color;
    }
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
