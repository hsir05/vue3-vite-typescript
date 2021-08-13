<script lang="tsx">
  import { defineComponent } from 'vue'
  import { BasicMenu } from '/@/components/BasicMenu'
  import { SimpleMenu } from '/@/components/SimpleMenu'
  import { getMenus } from '/@/router/index'
  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      isHorizontal: Boolean
    },
    setup(props) {
      const menuData = getMenus()
      console.log('2222', menuData)

      function renderMenu() {
        return !props.isHorizontal ? (
          <BasicMenu items={menuData} />
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
