<template>
  <div class="main">
    <div class="logo-wrap">
      <img src="../../assets/logo.png" style="height: 100%" alt="" />
    </div>
    <Form
      class="user-layout-login"
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <FormItem>
        <Input v-model:value="formState.user" placeholder="Username">
          <template #prefix>
            <MyIcon type="icon-user" />
          </template>
        </Input>
      </FormItem>
      <FormItem>
        <Input v-model:value="formState.password" type="password" placeholder="Password">
          <template #prefix>
            <MyIcon type="icon-mima1" />
          </template>
        </Input>
      </FormItem>
      <FormItem>
        <a-button
          class="submit-btn"
          type="primary"
          html-type="submit"
          :loading="loading"
          :disabled="formState.user === '' || formState.password === ''"
          >登录</a-button
        >
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
  import { Form, Input } from 'ant-design-vue'
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
  import { defineComponent, reactive, ref, UnwrapRef } from 'vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useRouter } from 'vue-router'
  interface FormState {
    user: string
    password: string
  }
  export default defineComponent({
    name: 'Login',
    components: {
      Form,
      FormItem: Form.Item,
      MyIcon,
      Input
    },
    setup() {
      const router = useRouter()
      const loading = ref(false)
      const formState: UnwrapRef<FormState> = reactive({
        user: '',
        password: ''
      })
      const handleFinish = (values: FormState) => {
        console.log(values, formState)
        loading.value = true
        setTimeout(() => {
          router.replace('/dashboard/analysis')
        }, 1200)
      }
      const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
        console.log(errors)
      }
      return {
        formState,
        loading,
        handleFinish,
        handleFinishFailed
      }
    }
  })
</script>
<style lang="less">
  .main {
    min-width: 260px;
    width: 368px;
    margin: 0 auto;
    transform: translateY(70%);
    border: 1px solid #e5e5e5;
    padding: 15px;
    border-radius: 5px;
    .submit-btn {
      width: 100%;
    }
    .logo-wrap {
      height: 100px;
      padding: 20px 0;
    }
  }
</style>
