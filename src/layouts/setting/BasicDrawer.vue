<template>
  <Drawer
    :title="t('configuration')"
    :closable="true"
    width="350"
    :destroyOnClose="true"
    @close="close"
    v-model:visible="visibleRef"
  >
    <div class="drawer-container">
      <Divider orientation="left" plain>{{ t('darkMode') }}</Divider>
      <Switch v-model:checked="checked" @change="handleSwitch">
        <template #checkedChildren>
          <MyIcon type="icon-icon-test" style="font-size: 18px" />
        </template>
        <template #unCheckedChildren>
          <MyIcon type="icon-yueliang1" style="font-size: 18px" />
        </template>
      </Switch>

      <Divider orientation="left" plain>{{ t('systemTheme') }}</Divider>
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

      <Divider orientation="left" plain>{{ t('systemTheme') }}</Divider>
      <div class="clearfix flex">
        <div
          class="theme-color"
          v-for="color in APP_PRESET_COLOR_LIST"
          :key="color"
          :style="{ backgroundColor: color }"
          @click="handleSystemTheme(color)"
        >
          <MyIcon type="icon-gou" v-if="getThemeColor === color" style="font-size: 18px" />
        </div>
      </div>
      <Divider orientation="left" plain>{{ t('headerTheme') }}</Divider>
      <div class="clearfix flex">
        <div
          class="theme-color"
          v-for="color in APP_TOP_COLOR_LIST"
          :key="color"
          :style="{ backgroundColor: color }"
          @click="handleTopTheme(color)"
        >
          <MyIcon type="icon-gou" v-if="getThemeColor === color" style="font-size: 18px" />
        </div>
      </div>

      <Divider orientation="left" plain>{{ t('menuTheme') }}</Divider>
      <div class="clearfix flex">
        <div
          class="theme-color"
          v-for="color in APP_MENU_COLOR_LIST"
          :key="color"
          :style="{ backgroundColor: color }"
          @click="handleTopTheme(color)"
        >
          <MyIcon type="icon-gou" v-if="getThemeColor === color" style="font-size: 18px" />
        </div>
      </div>
    </div>
  </Drawer>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { Drawer, Divider, Switch, Tooltip } from 'ant-design-vue'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { menuTypeList } from '../enum'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import {
    APP_PRESET_COLOR_LIST,
    APP_TOP_COLOR_LIST,
    APP_MENU_COLOR_LIST
  } from '/@/settings/designSetting'
  import { useRootSetting } from '/@/hooks/setting/useRootSetting'
  export default defineComponent({
    name: 'SettingDrawer',
    components: {
      Drawer,
      Divider,
      Switch,
      MyIcon,
      Tooltip
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

      const { getLayoutMode } = useHeaderSetting()

      const { settingLayoutMode, setMenuSetting } = useMenuSetting()
      const { getThemeColor, setRootSetting, changeThemeColor } = useRootSetting()

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

      const showDrawer = () => {
        visibleRef.value = true
      }

      const handleSwitch = () => {
        console.log(checked.value)
      }
      const handleSystemTheme = (color: string): void => {
        setRootSetting({ themeColor: color })
        changeThemeColor(color)
      }
      const handleTopTheme = (color: string): void => {
        console.log(color)
      }
      const handler = (item) => {
        settingLayoutMode({ layoutMode: item.type })
        setMenuSetting({ collapsed: false })
      }

      return {
        // afterVisibleChange,
        showDrawer,
        getThemeColor,
        visibleRef,
        checked,
        APP_PRESET_COLOR_LIST,
        APP_TOP_COLOR_LIST,
        APP_MENU_COLOR_LIST,
        close,
        handler,
        handleSystemTheme,
        handleTopTheme,
        menuTypeList,
        handleSwitch,
        getLayoutMode,
        t
      }
    }
  })
</script>
<style lang="less">
  .drawer-container {
    text-align: center;
    .ant-switch {
      background-color: #000;
    }
    .theme-color {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      cursor: pointer;
      text-align: center;
      color: #fff;
      font-weight: 700;
      border: 1px solid #ddd;
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
      background-color: #f0f2f5;
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
        border: 2px solid #0960bd;
      }
    }
    .navigation-mode-active {
      padding: 12px;
      border: 2px solid #0960bd;
    }

    .navigation-mode-sidebar {
      &:after {
        .mode(100%, 25%, #fff);
      }
      &:before {
        .mode(33%, 100%, #273352);
        z-index: 1;
        border-radius: 4px 0 0 4px;
      }
    }
    .navigation-mode-mix-sidebar {
      &:after {
        .mode(100%, 25%, #273352);
        z-index: 1;
      }
      &:before {
        .mode(33%, 100%, #fff);
        border-radius: 4px 0 0 4px;
      }
    }
    .navigation-mode-mix {
      &:after {
        .mode(100%, 25%, #273352);
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
      border: 1px solid #ddd;
      border-radius: 2px;
    }
  }
</style>
