<template>
  <Tabs
    size="small"
    :animated="false"
    tab-position="left"
    class="pt10 account-setting"
    :hideAdd="true"
    :tabBarGutter="3"
    :tabBarStyle="{ width: '160px' }"
    :activeKey="activeKey"
    @change="handleChange"
    @edit="handleEdit"
  >
    <TabPane tab="基本设置" key="1">
      <Basic />
    </TabPane>
    <TabPane tab="安全设置" key="2">
      <Security />
    </TabPane>
    <TabPane tab="账号绑定" key="3">
      <Binding />
    </TabPane>
  </Tabs>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Tabs } from 'ant-design-vue'
  import Basic from './components/basic.vue'
  import Security from './components/security.vue'
  import Binding from './components/binding.vue'
  export default defineComponent({
    name: 'AccountSetting',
    components: {
      Tabs,
      TabPane: Tabs.TabPane,
      Basic,
      Security,
      Binding
    },
    setup() {
      const activeKey = ref('1')

      function handleChange(value: string) {
        activeKey.value = value
      }

      function handleEdit(targetKey: string) {
        console.log(targetKey)
      }

      return {
        activeKey,
        handleChange,
        handleEdit
      }
    }
  })
</script>
<style lang="less">
  .account-setting {
    .ant-tabs-tab-active {
      // background-color: @item-active-bg;
    }
  }
</style>
