<template>
  <List item-layout="horizontal" :data-source="data">
    <Item class="ml10">
      <Avatar size="small" class="mr10" style="background-color: #f56a00">
        <template #icon>
          <DingdingOutlined style="background-color: #f56a00" />
        </template> </Avatar
      >你收到了14份新周报
    </Item>
  </List>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { List, Avatar } from 'ant-design-vue'
  import { DingdingOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    components: {
      List,
      Avatar,
      Item: List.Item,
      DingdingOutlined
    },
    props: {
      onTitleClick: {
        type: Function as PropType<(Recordable) => void>
      }
    },
    setup() {
      function onNoticeClick() {}
      return {
        data: [],
        onNoticeClick
      }
    }
  })
</script>
<style lang="less" scoped></style>
