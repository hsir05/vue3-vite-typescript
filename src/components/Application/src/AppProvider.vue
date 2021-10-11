<script lang="ts">
  import { defineComponent, toRefs, unref } from 'vue'
  import { useAppStore } from '/@/store/modules/app'
  import { prefixCls } from '/@/settings/designSetting'
  import defaultSettings from '/@/config/defaultSettings'
  import { localStorageService } from '/@/utils/storage'
  import { PROJ_CFG_KEY } from '/@/enums/cacheEnum'
  import { useRootSetting } from '/@/hooks/setting/useRootSetting'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting'
  const props = {
    prefixCls: { type: String, default: prefixCls }
  }
  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const appStore = useAppStore()

      handleRestoreState()
      const {
        changeThemeColor,
        updateColorWeak,
        updateGrayMode,
        getThemeColor,
        getColorWeak,
        getGrayMode
      } = useRootSetting()
      const { getHeaderBgColor, getHeaderFixed, setHeaderSetting } = useHeaderSetting()
      const { getMenuBgColor, updateSidebarBgColor } = useMenuSetting()
      const { getMultiTabs, setMultiTabsSetting } = useMultipleTabSetting()

      changeThemeColor(unref(getThemeColor))
      //   updateHeaderBgColor(getHeaderBgColor.value)
      updateSidebarBgColor(getMenuBgColor.value)

      setHeaderSetting({ fixed: getHeaderFixed.value, bgColor: getHeaderBgColor.value })
      setMultiTabsSetting({ show: getMultiTabs.value })

      updateColorWeak(getColorWeak.value)
      updateGrayMode(getGrayMode.value)

      const { prefixCls } = toRefs(props)
      console.log(prefixCls.value)

      function handleRestoreState() {
        const projectConfig = localStorageService.get(PROJ_CFG_KEY) || {}
        appStore.setProjectConfig({ ...defaultSettings, ...projectConfig })
      }
      return () => slots.default?.()
    }
  })
</script>
