<script lang="tsx">
  import { createFromIconfontCN } from '@ant-design/icons-vue'
  import { defineComponent } from 'vue'
  import { iconScriptUrl } from '/@/config/icon.config'

  const MyIcon = createFromIconfontCN({
    scriptUrl: iconScriptUrl // 在 iconfont.cn 上生成
  })

  export default defineComponent({
    props: {
      iconName: {
        type: String,
        default: () => ''
      },
      fontSize: {
        type: String,
        default: () => '18px'
      }
    },
    setup(props) {
      return () => <MyIcon type={props.iconName} style={{ fontSize: props.fontSize }} />
    }
  })
</script>
