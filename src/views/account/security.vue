<template>
  <div class="security">
    <h4 class="basic-title">安全设置</h4>
    <List item-layout="horizontal" :data-source="data">
      <template #renderItem="{ item }">
        <ListItem>
          <template #actions>
            <a>修改</a>
          </template>
          <ListItemMeta :description="item.description">
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { List } from 'ant-design-vue'
  interface DataItem {
    title: string
    description: string
  }
  const data: DataItem[] = [
    {
      title: '账户密码',
      description: '当前密码强度：：强'
    },
    {
      title: '密保手机',
      description: '已绑定手机：：138****8293'
    },
    {
      title: '备用邮箱',
      description: '已绑定邮箱：：ant***sign.com'
    }
  ]

  export default defineComponent({
    name: 'Security',
    components: {
      List,
      ListItem: List.Item,
      ListItemMeta: List.Item.Meta
    },
    setup() {
      return {
        data
      }
    }
  })
</script>
