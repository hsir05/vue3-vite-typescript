<template>
  <div class="h-setting-select-item">
    <span>{{ selectTitle }}</span>
    <Switch
      v-model:checked="value"
      :checked-children="t('setting.off')"
      :un-checked-children="t('setting.on')"
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
      },
      title: {
        type: String,
        default: () => ' '
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
        selectTitle: props.title,
        handeSetting,
        t
      }
    }
  })
</script>
<style lang="less">
  .h-setting-select-item {
    .flexed();
    padding: 20px 15px 0 10px;
  }
</style>
