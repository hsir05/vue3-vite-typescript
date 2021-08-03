<script lang="tsx">
  import { defineComponent } from 'vue'
  import { BasicMenu } from '/@/components/BasicMenu'
  import { SimpleMenu } from '/@/components/SimpleMenu'
  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      isHorizontal: Boolean
    },
    setup(props) {
      console.log(props.isHorizontal)

      function renderMenu() {
        return !props.isHorizontal ? <SimpleMenu /> : <BasicMenu />
      }

      return () => {
        return renderMenu()
      }
    }
  })
</script>
