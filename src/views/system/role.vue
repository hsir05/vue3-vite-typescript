<template>
  <div>
    <!-- 搜索 -->
    <Form
      layout="inline"
      ref="formRef"
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <FormItem label="角色名称" name="roleName">
        <Input
          v-model:value="formState.roleName"
          placeholder="请输入角色名称"
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
      <a-button type="primary" @click="addBtn" class="mr10">新增</a-button>
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
      <template #status="{ text }">
        <Switch
          checked-children="已启用"
          un-checked-children="已禁用"
          unCheckedValue="0"
          checkedValue="1"
          :checked="text"
          @change="handleSwitch"
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
  import { defineComponent, reactive, ref, UnwrapRef } from 'vue'
  import { Table, Switch, Form, Input, Select } from 'ant-design-vue'
  import { DataItem, FormState } from './typing'
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'

  const columns = [
    { title: '角色名称', dataIndex: 'roleName', align: 'center', key: 'roleName' },
    { title: '角色值', dataIndex: 'code', align: 'center', key: 'code' },
    { title: '创建时间', dataIndex: 'createTime', align: 'center', key: '3' },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 130,
      key: '2',
      slots: { customRender: 'status' }
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
  const tableData: DataItem[] = [
    {
      roleName: '超级管理员',
      code: 'superAdmin',
      status: '1',
      id: 1,
      createTime: '2021/09/01',
      remark: '测试'
    },
    {
      roleName: '管理员',
      code: 'admin',
      status: '1',
      id: 2,
      createTime: '2021/09/01',
      remark: '测试'
    }
  ]

  export default defineComponent({
    name: 'Role',
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
      const formRef = ref()
      const formState: UnwrapRef<FormState> = reactive({
        roleName: '',
        status: ''
      })
      const handleFinish = (values: FormState) => {
        console.log(values, formState)
      }
      const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
        console.log(errors)
      }
      const resetForm = () => {
        formRef.value.resetFields()
      }
      const addBtn = () => {}
      const handleSwitch = () => {}
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
