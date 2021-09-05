<script lang="tsx">
  import { defineComponent, unref } from 'vue'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import Siderbar from './sidebar.vue'
  export default defineComponent({
    name: 'BaicLayout',
    components: {
      Siderbar
    },
    setup() {
      const { getLayoutMode } = useHeaderSetting()
      return () => {
        switch (unref(getLayoutMode)) {
          case 'sidebar':
            return <Siderbar />
            break

          default:
            break
        }
      }
    }
  })
</script>
<style lang="less" scoped>
  .site-layout {
    .site-layout-background {
      background: @white;
    }
  }
  [data-theme='dark'] .site-layout .site-layout-background {
    background: @menuBgColor;
  }
  .site-layout {
    .site-layout-background {
      background: #fff;
    }
  }
</style>
