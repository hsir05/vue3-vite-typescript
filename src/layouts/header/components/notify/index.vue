<template>
  <Popover title trigger="click">
    <span class="pd15 h-header-action-item">
      <Badge dot>
        <span class="badge"><MyIcon type="icon-bell" /></span>
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
            <NoticeList :list="item.list" v-if="item.key === '1'" @title-click="onNoticeClick" />
          </TabPane>
        </template>
      </Tabs>
    </template>
  </Popover>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { tabListData, ListItem } from './data'
  import { Popover, Tabs, Badge } from 'ant-design-vue'
  import NoticeList from './NoticeList.vue'
  export default defineComponent({
    name: 'Notify',
    components: {
      MyIcon,
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
<style lang="less">
  .badge {
    color: var(--header-text-color);
  }
</style>
