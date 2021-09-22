<template>
  <div class="main">
    <div class="logo-wrap">
      <img src="../../assets/logo.svg" class="logo" alt />
      <span class="logo-text">Vite Admin</span>
    </div>

    <Form
      class="user-layout-login"
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="1" tab="账号密码登录">
          <FormItem>
            <Input v-model:value="formState.user" size="large" placeholder="请输入账号">
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
              placeholder="请输入密码"
            >
              <template #prefix>
                <MyIcon type="icon-mima1" />
              </template>
              <template #suffix>
                <MyIcon :type="isShow ? 'icon-eye1' : 'icon-eye'" @click="handlePass" />
              </template>
            </Input>
          </FormItem>
        </TabPane>

        <TabPane key="2" tab="手机号登录">
          <FormItem>
            <Input
              v-model:value="formState.phone"
              size="large"
              placeholder="手机号"
              :maxlength="11"
            >
              <template #prefix>
                <MyIcon type="icon-iconphone" />
              </template>
            </Input>
          </FormItem>
          <FormItem>
            <InputSearch v-model:value="formState.code" placeholder="验证码" size="large">
              <template #prefix>
                <MyIcon type="icon-captcha1" />
              </template>
              <template #enterButton>
                <a-button>获取验证码</a-button>
              </template>
            </InputSearch>
          </FormItem>
        </TabPane>
      </Tabs>

      <div class="checked mb10">
        <Checkbox v-model:checked="checked">记住密码</Checkbox>
        <a href="javascript:;" class="">忘记密码</a>
      </div>

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

      <div class="other">
        <div class="other-login"
          >其他登录方式
          <MyIcon
            type="icon-weixin"
            style="font-size: 24px; margin-left: 10px; vertical-align: middle; color: #e9e9e9"
          />
          <MyIcon
            type="icon-zhifubao"
            style="font-size: 24px; margin-left: 10px; vertical-align: middle; color: #e9e9e9"
          />
          <MyIcon
            type="icon-qq"
            style="font-size: 24px; margin-left: 10px; vertical-align: middle; color: #e9e9e9"
          />
        </div>

        <a href="javascript:;" class="">注册账户</a>
      </div>
    </Form>
  </div>
</template>
<script lang="ts">
  import { Form, Input, Checkbox, Tabs, InputSearch } from 'ant-design-vue'
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
  import { defineComponent, reactive, ref, UnwrapRef } from 'vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { defaultHomePath } from '/@/config/router.config'
  interface FormState {
    user: string
    password: string
    phone?: string
    code?: string
  }
  export default defineComponent({
    name: 'Login',
    components: {
      Form,
      FormItem: Form.Item,
      MyIcon,
      Checkbox,
      Input,
      Tabs,
      TabPane: Tabs.TabPane,
      InputSearch
    },
    setup() {
      const router = useRouter()
      const loading = ref(false)
      const isShow = ref(false)
      const checked = ref(false)
      const activeKey = ref('1')

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
        handleFinishFailed,
        activeKey
      }
    }
  })
</script>
<style lang="less">
  .ant-tabs-nav-scroll {
    text-align: center;
  }
  .main {
    min-width: 260px;
    width: 450px;
    margin: 0 auto;
    transform: translateY(20%);
    padding: 55px 45px 100px;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
    .submit-btn {
      width: 100%;
    }
    .logo-wrap {
      height: 40px;
      padding: 35px 0;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo {
      height: 35px;
      margin-right: 10px;
      vertical-align: top;
      border-style: none;
    }
    .logo-text {
      font-weight: 600;
      font-size: 33px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      text-align: center;
    }
    .other {
      .flexed();
      cursor: pointer;
    }
    .checked {
      text-align: left;
      .flexed();
    }
  }
</style>
