<script lang="tsx">
  import { defineComponent } from 'vue'
  import { BasicMenu } from '/@/components/BasicMenu'
  import { SimpleMenu } from '/@/components/SimpleMenu'
  import { getMenus } from '/@/router/index'
  export default defineComponent({
    name: 'HMenu',
    props: {
      isHorizontal: Boolean,
      spliteMenu: {
        type: Boolean,
        default: () => false
      }
    },
    setup(props) {
      const menuData = getMenus()

      function renderMenu() {
        return !props.isHorizontal ? (
          <BasicMenu items={menuData} spliteMenu={props.spliteMenu} />
        ) : (
          <SimpleMenu items={menuData} spliteMenu={props.spliteMenu} />
        )
      }

      return () => {
        return renderMenu()
      }
    }
  })
</script>
