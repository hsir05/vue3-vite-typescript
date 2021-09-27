<template>
  <div class="h-cropper">
    <vueCropper ref="cropper" :img="img" :outputSize="1" outputType="png" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { VueCropper } from 'vue-cropper'
  export default defineComponent({
    name: 'HCroppe',
    components: {
      VueCropper
    },
    setup() {
      const img = ref('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png')

      return {
        img
      }
    }
  })
</script>
<style lang="less">
  .h-cropper {
    width: 200px;
    height: 200px;
  }
</style>
