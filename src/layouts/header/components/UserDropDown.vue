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
        <MenuItem @click="handleQuit"> <MyIcon type="icon-exit" />{{ t('loginOut') }}</MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { Avatar, Dropdown, Menu } from 'ant-design-vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useRouter } from 'vue-router'
  import { useMultipleTabStore } from '/@/store/modules/multipleTab'
  import { useI18n } from '/@/hooks/web/useI18n'
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
      const { t } = useI18n()
      const tabStore = useMultipleTabStore()
      function handleQuit() {
        router.replace('/login')
        tabStore.resetState()
      }

      return {
        handleQuit,
        t
      }
    }
  })
</script>
