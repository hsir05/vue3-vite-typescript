<script lang="ts">
  import { defineComponent, toRefs } from 'vue'
  import { useAppStore } from '/@/store/modules/app'
  import { prefixCls } from '/@/settings/designSetting'
  import defaultSettings from '/@/config/defaultSettings'
  const props = {
    /**
     * class style prefix
     */
    prefixCls: { type: String, default: prefixCls }
  }
  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const appStore = useAppStore()

      handleRestoreState()

      const { prefixCls } = toRefs(props)
      console.log(prefixCls.value)

      function handleRestoreState() {
        appStore.setProjectConfig(defaultSettings)
      }
      return () => slots.default?.()
    }
  })
</script>
