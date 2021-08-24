<template>
  <Popover title trigger="click">
    <span class="pd15 h-header-action-item">
      <Badge dot class>
        <BellOutlined />
      </Badge>
    </span>

    <template #content>
      <Tabs>
        <template v-for="item in listData" :key="item.key">
          <TabPane>
            <template #tab>
              {{ item.name }}
              <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
            </template>
            <!-- 绑定title-click事件的通知列表中标题是“可点击”的-->
            <NoticeList :list="item.list" v-if="item.key === '1'" @title-click="onNoticeClick" />
            <NoticeList :list="item.list" v-else />
          </TabPane>
        </template>
      </Tabs>
    </template>
  </Popover>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { BellOutlined } from '@ant-design/icons-vue'
  import { tabListData, ListItem } from './data'
  import { Popover, Tabs, Badge } from 'ant-design-vue'
  import NoticeList from './NoticeList.vue'
  export default defineComponent({
    name: 'Notify',
    components: {
      BellOutlined,
      Popover,
      Tabs,
      Badge,
      NoticeList,
      TabPane: Tabs.TabPane
    },
    setup() {
      const listData = ref(tabListData)

      function onNoticeClick(record: ListItem) {
        record.titleDelete = !record.titleDelete
      }
      return {
        listData,
        onNoticeClick
      }
    }
  })
</script>
