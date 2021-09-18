<template>
  <Divider orientation="center" plain>{{ themeTitle }}</Divider>
  <div class="clearfix flex">
    <div
      :class="['theme-color', value === color ? 'theme-color-active' : '']"
      v-for="color in data"
      :key="color"
      :style="{ backgroundColor: color }"
      @click="handeSetting(color)"
    >
      <MyIcon type="icon-gou" v-if="value === color" style="font-size: 18px" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useI18n } from '/@/hooks/web/useI18n'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { Divider } from 'ant-design-vue'
  export default defineComponent({
    name: 'SettingTheme',
    components: {
      MyIcon,
      Divider
    },
    props: {
      theme: {
        type: String,
        default: () => '#fffffe'
      },
      title: {
        type: String,
        default: () => ' '
      },
      colorList: {
        type: Array,
        default: () => ['#fffffe']
      }
    },
    emits: ['handeSetting'],
    setup(props, { emit }) {
      const value = ref<String>(props.theme)
      const { t } = useI18n()

      const handeSetting = (color: string) => {
        emit('handeSetting', color)
      }

      return {
        value,
        themeTitle: props.title,
        data: props.colorList || [],
        handeSetting,
        t
      }
    }
  })
</script>
<style lang="less">
  .theme-color {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    cursor: pointer;
    text-align: center;
    color: @white;
    font-weight: 700;
    border: 1px solid #ddd;
  }
  .theme-color-active {
    border: 1px solid @primary-color;
  }
</style>
