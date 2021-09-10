<template>
  <Drawer
    title="项目配置"
    :closable="true"
    width="350"
    :destroyOnClose="true"
    @close="close"
    v-model:visible="visibleRef"
    :after-visible-change="afterVisibleChange"
  >
    <div class="drawer-container">
      <Divider>主题</Divider>
      <Switch v-model:checked="checked" @change="handleSwitch">
        <template #checkedChildren>
          <MyIcon type="icon-icon-test" style="font-size: 18px" />
        </template>
        <template #unCheckedChildren>
          <MyIcon type="icon-yueliang1" style="font-size: 18px" />
        </template>
      </Switch>

      <Divider>导航栏模式</Divider>
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

      <Divider>系统主题</Divider>

      <div class="clearfix flex">
        <div
          class="theme-color"
          v-for="color in colorList"
          :key="color"
          :style="{ backgroundColor: color }"
          @click="handleSystemTheme(color)"
        ></div>
      </div>
    </div>
  </Drawer>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { Drawer, Divider, Switch, Tooltip } from 'ant-design-vue'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { menuTypeList } from '../enum'
  import MyIcon from '/@/components/MyIcon/index.vue'

  const colorList = [
    'rgb(245, 34, 45)',
    'rgb(250, 84, 28)',
    'rgb(250, 219, 20)',
    'rgb(62, 175, 124)',
    'rgb(19, 194, 194)',
    'rgb(24, 144, 255)',
    'rgb(114, 46, 209)',
    'rgb(235, 47, 150)',
    'rgb(255, 152, 0)'
  ]
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

      const afterVisibleChange = (bool: boolean) => {
        console.log('visibleRef', bool)
      }
      const { getLayoutMode } = useHeaderSetting()

      const { settingLayoutMode, setMenuSetting } = useMenuSetting()

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
        console.log(color)
      }
      const handler = (item) => {
        console.log(item)
        settingLayoutMode({ layoutMode: item.type })
        setMenuSetting({ collapsed: false })
      }

      return {
        afterVisibleChange,
        showDrawer,
        visibleRef,
        checked,
        colorList,
        close,
        handler,
        handleSystemTheme,
        menuTypeList,
        handleSwitch,
        getLayoutMode
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
      border-radius: 4px;
      box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
      box-sizing: border-box;
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
