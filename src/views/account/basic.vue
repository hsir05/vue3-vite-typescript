<template>
  <div class="basic">
    <h4 class="basic-title">基本设置</h4>
    <section class="flex">
      <Form
        class="basic-form"
        :labelCol="{ style: { width: '130px' } }"
        style="width: 550px"
        :model="formState"
        :rules="basicRules"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <FormItem name="email" label="邮箱">
          <Input v-model:value.trim="formState.email" placeholder="请输入邮箱" allow-clear />
        </FormItem>

        <FormItem name="nickname" label="昵称">
          <Input
            v-model:value.trim="formState.nickname"
            placeholder="请输入昵称"
            allow-clear
            :maxlength="20"
          />
        </FormItem>

        <FormItem name="phone" label="联系电话">
          <Input
            v-model:value.trim="formState.phone"
            :maxlength="11"
            placeholder="请输入联系电话"
            allow-clear
          />
        </FormItem>

        <FormItem name="introduce" label="个人简介">
          <Textarea
            v-model:value.trim="formState.introduce"
            placeholder="请输入个人简介"
            allow-clear
            showCount
            :maxlength="500"
            :rows="4"
          />
        </FormItem>

        <FormItem>
          <Button class="submit-btn" type="primary" html-type="submit" :loading="loading"
            >更新基本信息</Button
          >
        </FormItem>
      </Form>

      <div class="avatar-wrap">
        <div class="h-avatar">
          <img src="https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640" alt />
        </div>
        <Button class="mt20" type="primary" @click="handleAdatar">
          <template #icon> <MyIcon type="icon-upload2" /> </template>更换头像
        </Button>
      </div>
    </section>

    <HCropperModal ref="hCropperModalRef" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, UnwrapRef } from 'vue'
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
  import { Form, Input, Button } from 'ant-design-vue'
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
<style lang="less" scoped>
  .basic {
    .basic-form {
      position: relative;
    }
    .avatar-wrap {
      text-align: center;
      margin-left: 50px;
    }
    .h-avatar {
      overflow: hidden;
      width: 150px;
      height: 150px;
      cursor: pointer;
      background: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 50%;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
    .flex {
      align-items: flex-start;
      justify-content: flex-start;
    }
    .avatar {
      display: block;
    }
  }
</style>
