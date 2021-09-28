<template>
  <div class="basic">
    <h4 class="basic-title">基本设置</h4>
    <Form
      class="basic-form"
      :labelCol="{ span: 3, offset: 0 }"
      :model="formState"
      :rules="basicRules"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <FormItem name="email" label="邮箱">
        <Input
          v-model:value.trim="formState.email"
          placeholder="请输入邮箱"
          allow-clear
          style="width: 300px"
        />
      </FormItem>

      <FormItem name="nickname" label="昵称">
        <Input
          v-model:value.trim="formState.nickname"
          placeholder="请输入昵称"
          allow-clear
          :maxlength="20"
          style="width: 300px"
        />
      </FormItem>

      <FormItem name="phone" label="联系电话">
        <Input
          v-model:value.trim="formState.phone"
          :maxlength="11"
          placeholder="请输入联系电话"
          allow-clear
          style="width: 300px"
        />
      </FormItem>

      <FormItem name="introduce" label="个人简介">
        <Textarea
          v-model:value.trim="formState.introduce"
          placeholder="请输入个人简介"
          allow-clear
          style="width: 300px"
          showCount
          :maxlength="500"
          :rows="4"
        />
      </FormItem>

      <div class="avatar-wrap">
        <Avatar
          :size="{ xs: 22, sm: 30, md: 40, lg: 64, xl: 100, xxl: 120 }"
          class="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <Button class="mt20" type="primary" @click="handleAdatar">
          <template #icon> <MyIcon type="icon-upload2" /> </template>更换头像
        </Button>
      </div>

      <FormItem>
        <Button class="submit-btn" type="primary" html-type="submit" :loading="loading"
          >更新基本信息</Button
        >
      </FormItem>
    </Form>

    <HCropperModal ref="hCropperModalRef" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, UnwrapRef } from 'vue'
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
  import { Form, Input, Button, Avatar } from 'ant-design-vue'
  import { basicRules } from '/@/utils/validator'
  import { FormState } from './typing'
  import HCropperModal from '/@/components/HCropper/HCropperModal.vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  export default defineComponent({
    name: 'Basic',
    components: {
      Form,
      Input,
      Textarea: Input.TextArea,
      Button,
      FormItem: Form.Item,
      Avatar,
      MyIcon,
      HCropperModal
    },
    setup() {
      const loading = ref(false)
      const hCropperModalRef = ref()
      const formState: UnwrapRef<FormState> = reactive({
        email: '',
        nickname: '',
        phone: '',
        introduce: ''
      })

      const handleFinish = (values: FormState) => {
        console.log(values, formState)
        loading.value = true
      }
      const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
        console.log(errors)
      }

      const handleAdatar = () => {
        hCropperModalRef.value.visible = true
      }

      return {
        formState,
        hCropperModalRef,
        loading,
        basicRules,
        handleFinish,
        handleFinishFailed,
        handleAdatar
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
    .basic-form {
      position: relative;
    }
    .avatar-wrap {
      position: absolute;
      top: 0;
      left: 50%;
      text-align: center;
    }
    .avatar {
      display: block;
    }
  }
</style>
