<template>
  <Dropdown>
    <div class="h-header-action-item" style="display: inline-block">
      <MyIcon type="icon-311-TranslationOutlined" class="pd15 h-header-action-item" />
    </div>

    <template #overlay>
      <Menu style="width: 150px" v-model:selectedKeys="current">
        <MenuItem @click="handleTanslation('zh')" key="zh">简体中文 </MenuItem>
        <MenuItem @click="handleTanslation('en')" key="en">English </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Dropdown, Menu } from 'ant-design-vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  export default defineComponent({
    name: 'TranslationDropDown',
    components: {
      MyIcon,
      Menu,
      MenuItem: Menu.Item,
      Dropdown
    },
    setup() {
      const current = ref<string[]>(['zh'])

      function handleTanslation(translant: string) {
        current.value = [translant]
      }

      return {
        current,
        handleTanslation
      }
    }
  })
</script>
