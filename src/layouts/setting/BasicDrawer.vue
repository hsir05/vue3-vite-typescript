<template>
  <Drawer
    title="项目配置"
    :closable="true"
    width="350"
    :destroyOnClose="true"
    @close="close"
    v-model:visible="visibleRef"
    :after-visible-change="afterVisibleChange"
  >
    <div class="drawer-container">
      <Divider>主题</Divider>
      <Switch v-model:checked="checked" @change="handleSwitch">
        <template #checkedChildren><check-outlined /></template>
        <template #unCheckedChildren><close-outlined /></template>
      </Switch>
      <Divider>导航栏模式</Divider>
    </div>
  </Drawer>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { Drawer, Divider, Switch } from 'ant-design-vue'
  import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    name: 'SettingDrawer',
    components: {
      Drawer,
      Divider,
      Switch,
      CheckOutlined,
      CloseOutlined
    },
    props: {
      visible: {
        type: Boolean,
        default: () => false
      }
    },
    emits: ['handleClose'],
    setup(props, { emit }) {
      const visibleRef = ref<boolean>(false)
      const checked = ref<boolean>(false)

      const afterVisibleChange = (bool: boolean) => {
        console.log('visibleRef', bool)
      }
      const close = () => {
        visibleRef.value = false
        emit('handleClose', false)
      }

      watch(
        () => props.visible,
        (newVal, oldVal) => {
          if (newVal !== oldVal) visibleRef.value = newVal
        },
        { deep: true }
      )

      const showDrawer = () => {
        visibleRef.value = true
      }

      const handleSwitch = () => {
        console.log(checked.value)
      }

      return {
        afterVisibleChange,
        showDrawer,
        visibleRef,
        checked,
        close,
        handleSwitch
      }
    }
  })
</script>
<style lang="less">
  .drawer-container {
    text-align: center;
  }
</style>
