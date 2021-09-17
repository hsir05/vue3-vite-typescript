<template>
  <div class="h-setting-select-item">
    <span>{{ t('setting.menuCollapse') }}</span>
    <Switch
      v-model:checked="value"
      :checked-children="t('off')"
      :un-checked-children="t('on')"
      @change="handeSetting"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { Switch } from 'ant-design-vue'
  export default defineComponent({
    name: 'SettingSelect',
    components: {
      Switch
    },
    props: {
      checked: {
        type: Boolean,
        default: () => false
      }
    },
    emits: ['handeSetting'],
    setup(props, { emit }) {
      const value = ref<boolean>(props.checked)
      const { t } = useI18n()

      const handeSetting = (bool) => {
        emit('handeSetting', bool)
      }

      return {
        value,
        handeSetting,
        t
      }
    }
  })
</script>
<style lang="less">
  .h-setting-select-item {
    .flexed();
    padding: 20px 15px;
  }
</style>
