<script lang="tsx">
  import { defineComponent } from 'vue'
  import { BasicMenu } from '/@/components/BasicMenu'
  import { SimpleMenu } from '/@/components/SimpleMenu'
  import { getMenus } from '/@/router/index'
  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      isHorizontal: Boolean,
      theme: String
    },
    setup(props) {
      const menuData = getMenus()

      function renderMenu() {
        return !props.isHorizontal ? (
          <BasicMenu items={menuData} theme={props.theme} />
        ) : (
          <SimpleMenu items={menuData} />
        )
      }

      return () => {
        return renderMenu()
      }
    }
  })
</script>
