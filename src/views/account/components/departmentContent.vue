<template>
  <div class="department-content bgw">
    <!-- 搜索 -->
    <Form
      layout="inline"
      ref="formRef"
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <FormItem label="用户名" name="username">
        <Input v-model:value="formState.username" placeholder="请输入用户名" style="width: 150px" />
      </FormItem>

      <FormItem label="昵称" name="nickname">
        <Input v-model:value="formState.nickname" placeholder="请输入昵称" style="width: 150px" />
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
      <template #action>
        <a>编辑</a>
        <a class="ml10">删除</a>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, Ref, ref, UnwrapRef } from 'vue'
  import { Table, Form, Input } from 'ant-design-vue'
  import { Department, DepFormState } from '../typing'
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'

  const columns = [
    { title: '用户名称', dataIndex: 'username', align: 'center', key: 'username' },
    { title: '昵称', dataIndex: 'nickname', align: 'center', key: 'nickname' },
    { title: '创建时间', dataIndex: 'createTime', align: 'center', key: '3' },
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
    name: 'DepartmentContent',
    components: {
      Table,
      Form,
      Input,
      FormItem: Form.Item
    },
    setup() {
      const tableData: Ref<Department[]> = ref([
        {
          username: '卫华',
          nickname: '长空尽',
          email: '1',
          role: '',
          id: 1,
          createTime: '2021/09/01',
          remark: '测试'
        }
      ])
      const formRef = ref()
      const formState: UnwrapRef<DepFormState> = reactive({
        nickname: '',
        username: ''
      })
      const handleFinish = (values: DepFormState) => {
        console.log(values, formState)
      }
      const handleFinishFailed = (errors: ValidateErrorEntity<DepFormState>) => {
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
<style lang="less">
  .department-content {
    .wh;
    width: 73%;
  }
</style>
