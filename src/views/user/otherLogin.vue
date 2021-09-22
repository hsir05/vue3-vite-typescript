<template>
  <div class="other">
    <div class="other-login">
      其他登录方式
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

    <a href="javascript:;" class>注册账户</a>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  export default defineComponent({
    name: 'OtherLogin',
    components: {
      MyIcon
    }
  })
</script>
<style lang="less">
  .other {
    .flexed();
    cursor: pointer;
  }
</style>
