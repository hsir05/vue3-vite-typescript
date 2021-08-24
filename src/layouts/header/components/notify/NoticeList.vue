<template>
  <List item-layout="horizontal" :data-source="data">
    <Item>
      <Meta
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      />
    </Item>
  </List>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { List } from 'ant-design-vue'
  export default defineComponent({
    components: {
      List,
      Item: List.Item,
      Meta: List.Item.Meta
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
