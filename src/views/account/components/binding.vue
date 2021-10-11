<template>
  <div class="security">
    <h4 class="basic-title">账号绑定</h4>
    <List item-layout="horizontal" :data-source="data">
      <template #renderItem="{ item }">
        <ListItem>
          <template #actions>
            <a>绑定 </a>
          </template>
          <ListItemMeta :description="item.description">
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <template #avatar>
              <MyIcon :iconName="item.icon" style="font-size: 24px" />
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
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { BindingDataItem } from '../typing'
  const data: BindingDataItem[] = [
    {
      icon: 'icon-youxiang',
      title: '绑定邮箱',
      description: '已绑定邮箱xxx@163.com'
    },
    {
      icon: 'icon-iconphone',
      title: '绑定手机',
      description: '已绑定手机：138****8293'
    }
  ]

  export default defineComponent({
    name: 'Binding',
    components: {
      List,
      ListItem: List.Item,
      ListItemMeta: List.Item.Meta,
      MyIcon
    },
    setup() {
      return {
        data
      }
    }
  })
</script>
