<template>
  <Dropdown>
    <div class="h-header-action-item" style="display: inline-block">
      <MyIcon type="icon-311-TranslationOutlined" class="pd15 h-header-action-item" />
    </div>

    <template #overlay>
      <Menu style="width: 150px" v-model:selectedKeys="selectedKeys">
        <MenuItem @click="handleTanslation('zh_CN')" key="zh">简体中文</MenuItem>
        <MenuItem @click="handleTanslation('en')" key="en">English</MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue'
  import { Dropdown, Menu } from 'ant-design-vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import type { LocaleType } from '/#/config'
  import { useLocale } from '/@/locales/useLocale'
  export default defineComponent({
    name: 'TranslationDropDown',
    components: {
      MyIcon,
      Menu,
      MenuItem: Menu.Item,
      Dropdown
    },
    setup() {
      const selectedKeys = ref<string[]>(['zh'])

      function handleTanslation(translant: string) {
        selectedKeys.value = [translant]
        if (unref(getLocale) === translant) {
          return
        }
        toggleLocale(translant as string)
      }

      async function toggleLocale(lang: LocaleType | string) {
        await changeLocale(lang as LocaleType)
        selectedKeys.value = [lang as string]
        // location.reload()
        // props.reload && location.reload();
      }

      // watchEffect(() => {
      //     selectedKeys.value = [unref(getLocale)];
      // });

      const { changeLocale, getLocale } = useLocale()

      return {
        selectedKeys,
        handleTanslation
      }
    }
  })
</script>
