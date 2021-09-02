<template>
  <Dropdown>
    <div class="h-header-action-item pl10 pr10" style="display: inline-block">
      <Avatar class="avatar" size="small">
        <template #icon>
          <MyIcon type="icon-user" />
        </template>
      </Avatar>
      <span class="user-name ml10">admin</span>
    </div>

    <template #overlay>
      <Menu style="width: 135px">
        <MenuItem @click="handleQuit"> <MyIcon type="icon-exit" />退出系统 </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { Avatar, Dropdown, Menu } from 'ant-design-vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useRouter } from 'vue-router'
  export default defineComponent({
    name: 'Footer',
    components: {
      Avatar,
      MyIcon,
      Menu,
      MenuItem: Menu.Item,
      Dropdown
    },
    setup() {
      const router = useRouter()
      function handleQuit() {
        router.replace('/login')
      }

      return {
        handleQuit
      }
    }
  })
</script>
