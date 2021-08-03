<template>
  <div class="logo"> <img src="../assets/logo.png" alt="logo" height="100%" /> vite-admin </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'AppLogo'
  })
</script>
<style lang="less">
  .logo {
    height: 32px;
    margin: 16px;
    font-weight: 600;
    font-size: 18px;
    color: @white;
    text-align: left;
    img {
      height: 100%;
    }
  }
</style>
