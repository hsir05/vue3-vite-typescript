<template>
  <div class="bgw">
    <!-- 搜索 -->
    <Form
      layout="inline"
      ref="formRef"
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <FormItem label="用户名称" name="userName">
        <Input
          v-model:value="formState.userName"
          placeholder="请输入用户名称"
          style="width: 150px"
        />
      </FormItem>

      <FormItem label="状态" name="status">
        <Select v-model:value="formState.status" placeholder="请选择状态" style="width: 150px">
          <SelectOption value="0">禁用</SelectOption>
          <SelectOption value="1">启用</SelectOption>
          <SelectOption value="">全部</SelectOption>
        </Select>
      </FormItem>
      <FormItem>
        <a-button type="primary" html-type="submit">搜索</a-button>
        <a-button type="primary" @click="resetForm" class="ml10">重置</a-button>
      </FormItem>
    </Form>
    <!-- 功能 -->
    <div class="mt10">
      <a-button type="primary" @click="addBtn" class="mr10">新增用户</a-button>
    </div>

    <!-- table -->
    <Table
      :columns="columns"
      class="mt10"
      :data-source="tableData"
      :pagination="false"
      rowKey="id"
      bordered
      :scroll="{ y: 400 }"
    >
      <template #statusAction="{ index }">
        <Switch
          checked-children="已启用"
          un-checked-children="已禁用"
          unCheckedValue="1"
          checkedValue="0"
          @change="handleSwitch"
          v-model:checked="tableData[index].status"
        />
      </template>

      <template #action>
        <a>编辑</a>
        <a class="ml10">删除</a>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, Ref, ref, UnwrapRef } from 'vue'
  import { Table, Switch, Form, Input, Select } from 'ant-design-vue'
  import { userDataItem, userFormState } from './typing'
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'

  const columns = [
    { title: '用户名称', dataIndex: 'userName', align: 'center', key: 'userName' },
    { title: '角色', dataIndex: 'code', align: 'center', key: 'code' },
    { title: '创建时间', dataIndex: 'createTime', align: 'center', key: '3' },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 130,
      key: '2',
      slots: { customRender: 'statusAction' }
    },
    { title: '备注', dataIndex: 'remark', align: 'center', width: 100, key: '2' },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      align: 'center',
      width: 130,
      slots: { customRender: 'action' }
    }
  ]

  export default defineComponent({
    name: 'Users',
    components: {
      Table,
      Switch,
      Form,
      Input,
      Select,
      SelectOption: Select.Option,
      FormItem: Form.Item
    },
    setup() {
      const tableData: Ref<userDataItem[]> = ref([
        {
          userName: '张三',
          code: 'superAdmin',
          status: '1',
          id: 1,
          createTime: '2021/09/01',
          remark: '测试'
        },
        {
          userName: '李四',
          code: 'admin',
          status: '0',
          id: 2,
          createTime: '2021/09/01',
          remark: '测试'
        }
      ])
      const formRef = ref()
      const formState: UnwrapRef<userFormState> = reactive({
        userName: '',
        status: ''
      })
      const handleFinish = (values: userFormState) => {
        console.log(values, formState)
      }
      const handleFinishFailed = (errors: ValidateErrorEntity<userFormState>) => {
        console.log(errors)
      }
      const resetForm = () => {
        formRef.value.resetFields()
      }
      const addBtn = () => {}
      const handleSwitch = (item) => {
        console.log(item)
      }
      return {
        tableData,
        columns,
        formRef,
        formState,
        resetForm,
        handleFinish,
        handleFinishFailed,
        addBtn,
        handleSwitch
      }
    }
  })
</script>
