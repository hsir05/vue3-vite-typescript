<template>
  <div class="basic">
    <h4 class="basic-title">基本设置</h4>
    <Form
      class="user-layout-login"
      :labelCol="{ span: 3, offset: 0 }"
      :model="formState"
      :rules="rules"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <FormItem name="account" label="邮箱">
        <Input
          v-model:value.trim="formState.account"
          placeholder="请输入邮箱"
          style="width: 300px"
        />
      </FormItem>

      <FormItem name="account" label="昵称">
        <Input
          v-model:value.trim="formState.account"
          placeholder="请输入昵称"
          style="width: 300px"
        />
      </FormItem>

      <FormItem name="account" label="联系电话">
        <Input
          v-model:value.trim="formState.account"
          placeholder="请输入昵称"
          style="width: 300px"
        />
      </FormItem>

      <FormItem name="account" label="个人简介">
        <Input
          v-model:value.trim="formState.account"
          placeholder="请输入个人简介"
          style="width: 300px"
        />
      </FormItem>

      <FormItem>
        <Button class="submit-btn" type="primary" html-type="submit" :loading="loading"
          >更新基本信息</Button
        >
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, UnwrapRef } from 'vue'
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
  import { Form, Input, Button } from 'ant-design-vue'
  import { rules } from '/@/utils/validator'
  import { FormState } from './typing'
  export default defineComponent({
    name: 'Basic',
    components: {
      Form,
      Input,
      Button,
      FormItem: Form.Item
    },
    setup() {
      const loading = ref(false)
      const formState: UnwrapRef<FormState> = reactive({
        account: 'admin',
        password: '123456'
      })

      const handleFinish = (values: FormState) => {
        console.log(values, formState)
        loading.value = true
      }
      const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
        console.log(errors)
      }

      return {
        formState,
        rules,
        handleFinish,
        handleFinishFailed,
        loading
      }
    }
  })
</script>
<style lang="less">
  .basic {
    .basic-title {
      display: flex;
      height: 32px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f0f2f5;
    }
  }
</style>
