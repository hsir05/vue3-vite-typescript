<template>
  <Dropdown>
    <div class="h-header-action-item" style="display: inline-block">
      <MyIcon type="icon-311-TranslationOutlined" class="pd15 h-header-action-item" />
    </div>

    <template #overlay>
      <Menu style="width: 150px" v-model:selectedKeys="selectedKeys">
        <MenuItem
          v-for="item in localeList"
          @click="handleTanslation(item.event)"
          :key="item.event"
          >{{ item.text }}</MenuItem
        >
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
  import { localeList } from '/@/settings/localeSetting'
  export default defineComponent({
    name: 'TranslationDropDown',
    components: {
      MyIcon,
      Menu,
      MenuItem: Menu.Item,
      Dropdown
    },
    setup() {
      const selectedKeys = ref<string[]>(['zh_CN'])

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

      const { changeLocale, getLocale } = useLocale()

      return {
        selectedKeys,
        handleTanslation,
        localeList
      }
    }
  })
</script>
