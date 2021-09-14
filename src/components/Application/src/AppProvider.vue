<script lang="ts">
  import { defineComponent, toRefs } from 'vue'
  import { useAppStore } from '/@/store/modules/app'
  import { prefixCls } from '/@/settings/designSetting'
  import defaultSettings from '/@/config/defaultSettings'
  import { localStorageService } from '/@/utils/storage'
  import { PROJ_CFG_KEY } from '/@/enums/cacheEnum'
  //   import { useRootSetting } from '/@/hooks/setting/useRootSetting'
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
      // const { changeThemeColor } = useRootSetting()
      //    changeThemeColor('#ff9800')

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
