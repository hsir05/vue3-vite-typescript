<template>
  <div class="main">
    <div class="logo-wrap">
      <img src="../../assets/logo.png" style="height: 100%" alt="" />
    </div>
    <h2 style="text-align: center">vite-admin 管理系统</h2>
    <Form
      class="user-layout-login"
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <FormItem>
        <Input v-model:value="formState.user" size="large" placeholder="Username">
          <template #prefix>
            <MyIcon type="icon-user" />
          </template>
        </Input>
      </FormItem>
      <FormItem>
        <Input
          v-model:value="formState.password"
          size="large"
          :type="isShow ? 'text' : 'password'"
          placeholder="Password"
        >
          <template #prefix>
            <MyIcon type="icon-mima1" />
          </template>
          <template #suffix>
            <MyIcon :type="isShow ? 'icon-eye1' : 'icon-eye'" @click="handlePass" />
          </template>
        </Input>
      </FormItem>

      <div class="checked mb10"><Checkbox v-model:checked="checked">记住密码</Checkbox></div>

      <FormItem>
        <a-button
          class="submit-btn"
          type="primary"
          size="large"
          html-type="submit"
          :loading="loading"
          :disabled="formState.user === '' || formState.password === ''"
          >{{ t('login') }}</a-button
        >
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
  import { Form, Input, Checkbox } from 'ant-design-vue'
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
  import { defineComponent, reactive, ref, UnwrapRef } from 'vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { defaultHomePath } from '/@/config/router.config'
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
      Checkbox,
      Input
    },
    setup() {
      const router = useRouter()
      const loading = ref(false)
      const isShow = ref(false)
      const checked = ref(false)
      const { t } = useI18n()
      const formState: UnwrapRef<FormState> = reactive({
        user: '',
        password: ''
      })
      const handleFinish = (values: FormState) => {
        console.log(values, formState)
        loading.value = true
        setTimeout(() => {
          router.replace(defaultHomePath)
        }, 800)
      }
      const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
        console.log(errors)
      }
      function handlePass() {
        isShow.value = !isShow.value
      }
      return {
        formState,
        loading,
        checked,
        isShow,
        t,
        handlePass,
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
    transform: translateY(30%);
    border: 1px solid #e5e5e5;
    padding: 15px;
    border-radius: 5px;
    .submit-btn {
      width: 100%;
    }
    .logo-wrap {
      height: 100px;
      padding: 20px 0;
      text-align: center;
    }
    .checked {
      text-align: left;
    }
  }
</style>
