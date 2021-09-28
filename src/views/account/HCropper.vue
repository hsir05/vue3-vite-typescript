<template>
  <vueCropper
    class="h-cropper"
    ref="hCropper"
    :img="option.img"
    :outputSize="option.outputSize"
    :outputType="option.outputType"
    :info="true"
    :full="option.full"
    :canMove="option.canMove"
    :canMoveBox="option.canMoveBox"
    :original="option.original"
    :autoCrop="option.autoCrop"
    :fixed="option.fixed"
    :fixedNumber="option.fixedNumber"
    :centerBox="option.centerBox"
    :infoTrue="option.infoTrue"
    :fixedBox="option.fixedBox"
  />
</template>
<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue'
  import { VueCropper } from 'vue-cropper'
  export default defineComponent({
    name: 'HCroppe',
    components: {
      VueCropper
    },
    setup() {
      const hCropper = ref()
      const option = reactive({
        img: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'png', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [7, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMove: false,
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      })

      return {
        option,
        hCropper
      }
    }
  })
</script>
<style lang="less">
  .h-cropper {
    width: 150px;
    height: 150px;
    margin: 10px;
    position: absolute;
    top: 0;
    left: 40%;
  }
</style>
