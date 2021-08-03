<script lang="tsx">
  import { defineComponent, reactive } from 'vue'
  import { BasicMenu } from '/@/components/BasicMenu'
  import { SimpleMenu } from '/@/components/SimpleMenu'
  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      isHorizontal: Boolean
    },
    setup(props) {
      const menuData = reactive([
        {
          path: '/exception/403',
          name: 'Exception403',
          children: [],
          component: () => import(/* webpackChunkName: "fail" */ '/@/views/exception/403.vue'),
          meta: { title: 'menu.exception.not-permission', permission: ['exception'] }
        },
        {
          path: '/exception/500',
          name: 'Exception500',
          children: [
            {
              path: '/exception/500',
              name: 'Exception500',
              component: () => import(/* webpackChunkName: "fail" */ '/@/views/exception/500.vue'),
              meta: { title: 'menu.exception.server-error', permission: ['exception'] }
            }
          ],
          component: () => import(/* webpackChunkName: "fail" */ '/@/views/exception/500.vue'),
          meta: { title: 'menu.exception.server-error', permission: ['exception'] }
        }
      ])
      function renderMenu() {
        return !props.isHorizontal ? (
          <SimpleMenu items={menuData} />
        ) : (
          <BasicMenu items={menuData} />
        )
      }

      return () => {
        return renderMenu()
      }
    }
  })
</script>
