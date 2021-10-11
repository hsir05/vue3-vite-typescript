<template>
  <div class="department">
    <div class="department-header flex">
      <span class="title">部门列表</span>
      <div class="flex">
        <InputSearch v-model:value="searchValue" placeholder="搜索" allowClear />

        <Dropdown>
          <span class="" @click.prevent
            ><MyIcon iconName="icon-diandian" class="ant-dropdown-link"
          /></span>

          <template #overlay>
            <Menu>
              <MenuItem>
                <span @click="handleDropdown('1')">张开全部</span>
              </MenuItem>
              <MenuItem>
                <span @click="handleDropdown('0')">折叠全部</span>
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </div>
    </div>
    <Tree
      :expandedKeys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="gData"
      @expand="onExpand"
    >
      <template #title="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </Tree>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { InputSearch, Dropdown, Menu, Tree } from 'ant-design-vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { TreeDataItem } from 'ant-design-vue/es/tree/Tree'

  const genData: TreeDataItem[] = [
    {
      title: '华南分部',
      children: [
        {
          title: '研发部'
        },
        {
          title: '商务部'
        },
        {
          title: '财务部'
        }
      ]
    },
    {
      title: '华北分部',
      children: [
        {
          title: '研发部'
        },
        {
          title: '商务部'
        },
        {
          title: '财务部'
        }
      ]
    }
  ]

  const dataList: TreeDataItem[] = []

  const getParentKey = (key: string, tree: TreeDataItem[]): string | number | undefined => {
    let parentKey
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children)
        }
      }
    }
    return parentKey
  }

  export default defineComponent({
    name: 'Departentment',
    components: {
      InputSearch,
      Dropdown,
      Menu,
      MenuItem: Menu.Item,
      Tree,

      MyIcon
    },
    setup() {
      const expandedKeys = ref<string[]>([])
      const searchValue = ref<string>('')
      const autoExpandParent = ref<boolean>(true)
      const gData = ref<TreeDataItem[]>(genData)

      watch(searchValue, (value) => {
        const expanded = dataList
          .map((item: TreeDataItem) => {
            if ((item.title as string).indexOf(value) > -1) {
              return getParentKey(item.key as string, gData.value)
            }
            return null
          })
          .filter((item, i, self) => item && self.indexOf(item) === i)
        expandedKeys.value = expanded as string[]
        searchValue.value = value
        autoExpandParent.value = true
      })

      const onExpand = (keys: string[]) => {
        expandedKeys.value = keys
        autoExpandParent.value = false
      }

      const handleDropdown = (key: string) => {
        if (key === '1') {
          expandedKeys.value = ['0-0', '0-1']
        } else {
          expandedKeys.value = []
        }
      }

      return {
        expandedKeys,
        searchValue,
        autoExpandParent,
        gData,

        onExpand,
        handleDropdown
      }
    }
  })
</script>
<style lang="less">
  .department {
    .wh;
    // background-color: @white;
  }
  .department-header {
    border-bottom: 1px solid @boderColor;
    padding-bottom: 5px;
    .title {
      margin: 0 auto;
    }
  }
</style>
