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
      <div class="">安全设置</div>
    </TabPane>
    <TabPane tab="账号绑定" key="3">
      <div class="">账号绑定</div>
    </TabPane>
  </Tabs>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Tabs } from 'ant-design-vue'
  import Basic from './basic.vue'
  export default defineComponent({
    name: 'AccountSetting',
    components: {
      Tabs,
      TabPane: Tabs.TabPane,
      Basic
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
