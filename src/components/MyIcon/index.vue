<script lang="tsx">
  import { createFromIconfontCN } from '@ant-design/icons-vue'
  import { defineComponent } from 'vue'
  import { iconScriptUrl } from '/@/config/icon.config'
  import Icon from '@ant-design/icons-vue'

  const MyIcon = createFromIconfontCN({
    scriptUrl: iconScriptUrl // 在 iconfont.cn 上生成
  })

  export default defineComponent({
    name: 'MyIcon',
    components: {
      Icon
    },
    props: {
      iconName: {
        type: String,
        default: () => ''
      },
      fontSize: {
        type: String,
        default: () => '16px'
      },
      svg: {
        type: String,
        default: () => ''
      }
    },
    setup(props) {
      if (props.svg) {
        return () => <Icon></Icon>
      } else {
        return () => <MyIcon type={props.iconName} style={{ fontSize: props.fontSize }} />
      }
    }
  })
</script>
