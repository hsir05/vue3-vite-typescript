<template>
  <vueCropper
    class="h-cropper"
    ref="hCropper"
    :img="option.img"
    :outputSize="option.size"
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
    :fixedBox="option.fixedBox"
  />
  <div class="test-button">
    <Button type="primary" class="mr10 mt10" @click="changeImg">changeImg</Button>
    <label class="btn" for="uploads">upload</label>
    <input
      type="file"
      id="uploads"
      style="position: absolute; clip: rect(0 0 0 0)"
      accept="image/png, image/jpeg, image/gif, image/jpg"
      @change="uploadImg($event, 1)"
    />
    <Button type="primary" class="mr10 mt10" @click="startCrop" v-if="!crap">start</Button>
    <Button type="primary" class="mr10 mt10" @click="stopCrop" v-else>stop</Button>
    <Button type="primary" class="mr10 mt10" @click="clearCrop">clear</Button>
    <Button type="primary" class="mr10 mt10" @click="refreshCrop">refresh</Button>
    <Button type="primary" class="mr10 mt10" @click="changeScale(1)">+</Button>
    <Button type="primary" class="mr10 mt10" @click="changeScale(-1)">-</Button>
    <Button type="primary" class="mr10 mt10" @click="rotateLeft">rotateLeft</Button>
    <Button type="primary" class="mr10 mt10" @click="rotateRight">rotateRight</Button>
    <Button type="primary" class="mr10 mt10" @click="finish('base64')">preview(base64)</Button>
    <Button type="primary" class="mr10 mt10" @click="finish('blob')">preview(blob)</Button>
    <a @click="down('base64')" class="btn">download(base64)</a>
    <a @click="down('blob')" class="btn">download(blob)</a>
    <!-- <a :href="downImg" download="demo.png" ref="downloadDom"></a> -->
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue'
  import { VueCropper } from 'vue-cropper'
  import { Button } from 'ant-design-vue'
  // interface imgInterface{
  //     img:string
  // }
  export default defineComponent({
    name: 'HCroppe',
    components: {
      VueCropper,
      Button
    },
    setup() {
      const hCropper = ref()
      const crap = ref(false)
      const model = ref(false)
      const modelSrc = ref(' ')
      let previews = reactive({
        w: '',
        h: '',
        img: '',
        url: '',
        div: {}
      })
      // const lists:Ref<imgInterface[]> = ref([])
      const option = reactive({
        img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4',
        size: 0.8, // 裁剪生成图片的质量
        full: false, // 裁剪生成图片的格式
        outputType: 'png',
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true, // 是否默认生成截图框
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 160,
        autoCropHeight: 150,
        centerBox: false,
        high: true,
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [7, 5], // 截图框的宽高比例
        max: 99999
        // canScale: false, // 图片是否允许滚轮缩放
        // autoCropWidth: 200, // 默认生成截图框宽度
        // autoCropHeight: 100, // 默认生成截图框高度
        // full: true, // 是否输出原图比例的截图
        // // canMove: false,
        // canMoveBox: false, // 截图框能否拖动
        // original: false, // 上传图片按照原始比例渲染
        // centerBox: false, // 截图框是否被限制在图片里面
        // infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      })

      function changeImg() {
        //   option.img = lists[~~(Math.random() * lists.length)].img
      }
      function startCrop() {
        // start
        crap.value = true
        hCropper.value.startCrop()
      }
      function stopCrop() {
        //  stop
        crap.value = false
        hCropper.value.stopCrop()
      }
      function clearCrop() {
        // clear
        hCropper.value.clearCrop()
      }
      function refreshCrop() {
        // clear
        hCropper.value.refresh()
      }
      function changeScale(num) {
        num = num || 1
        hCropper.value.changeScale(num)
      }
      function rotateLeft() {
        hCropper.value.rotateLeft()
      }
      function rotateRight() {
        hCropper.value.rotateRight()
      }
      function finish(type) {
        // 输出
        // var test = window.open('about:blank')
        // test.document.body.innerHTML = '图片生成中..'
        if (type === 'blob') {
          hCropper.value.getCropBlob((data) => {
            console.log(data)
            var img = window.URL.createObjectURL(data)
            model.value = true
            modelSrc.value = img
          })
        } else {
          hCropper.value.getCropData((data) => {
            model.value = true
            modelSrc.value = data
          })
        }
      }
      // 实时预览函数
      function realTime(data) {
        previews = data
        console.log(data)
      }

      function finish2(type) {
        console.log(type)

        //   hCropper.value2.getCropData((data) => {
        //     model.value = true
        //     modelSrc.value = data
        //   })
      }
      function finish3(type) {
        console.log(type)
        //   hCropper.value3.getCropData((data) => {
        //     model.value = true
        //     modelSrc.value = data
        //   })
      }
      function down(type) {
        // event.preventDefault()
        var aLink = document.createElement('a')
        aLink.download = 'demo'
        // 输出
        if (type === 'blob') {
          hCropper.value.getCropBlob((data) => {
            //   this.downImg = window.URL.createObjectURL(data)
            aLink.href = window.URL.createObjectURL(data)
            aLink.click()
          })
        } else {
          hCropper.value.getCropData((data) => {
            //   this.downImg = data
            aLink.href = data
            aLink.click()
          })
        }
      }

      function uploadImg(e, num: number) {
        //上传图片
        // option.img
        console.log(num)

        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e: Event) => {
          console.log(e.target)

          // let data
          // if (typeof e.target.result === 'object') {
          //   // 把Array Buffer转化为blob 如果是base64不需要
          //   data = window.URL.createObjectURL(new Blob([e.target.result]))
          // } else {
          //   data = e.target.result
          // }
          // if (num === 1) {
          //   option.img = data
          // } else if (num === 2) {
          // //   this.example2.img = data
          // }
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      }
      function imgLoad(msg) {
        console.log(msg)
      }
      function cropMoving(data) {
        console.log(data, '截图框当前坐标')
      }

      return {
        option,
        hCropper,
        crap,
        previews,

        changeImg,
        startCrop,
        stopCrop,
        clearCrop,
        refreshCrop,
        changeScale,
        rotateLeft,
        rotateRight,
        finish,
        realTime,
        finish2,
        finish3,
        down,
        uploadImg,
        imgLoad,
        cropMoving
      }
    }
  })
</script>
<style lang="less">
  .h-cropper {
    width: 250px;
    height: 230px;
    margin: 10px;
    display: flex;
  }
  .cropper-box {
    width: 320px;
  }
  .btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 20px 10px 0px 0px;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: @primary-color;
    border-color: @primary-color;
    transition: all 0.2s ease;
    text-decoration: none;
    user-select: none;
  }
</style>
