<template>
  <Dropdown>
    <div class="h-header-action-item" style="display: inline-block">
      <Avatar class="mr10 avatar ml10" size="small">
        <template #icon>
          <MyIcon type="icon-user" />
        </template>
      </Avatar>
      <span class="user-name">admin</span>
    </div>

    <template #overlay>
      <Menu style="width: 150px">
        <MenuItem> <MyIcon type="icon-exit" />退出系统 </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { Avatar, Dropdown, Menu } from 'ant-design-vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  export default defineComponent({
    name: 'Footer',
    components: {
      Avatar,
      MyIcon,
      Menu,
      MenuItem: Menu.Item,
      Dropdown
    }
  })
</script>
<style lang="less"></style>
