<template>
  <div class="h-cropper">
    <div style="width: 330px; height: 200px; margin-right: 80px">
      <vueCropper
        ref="hCropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="true"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :fixedBox="option.fixedBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :centerBox="option.centerBox"
        :high="option.high"
        :infoTrue="option.infoTrue"
        :maxImgSize="option.maxImgSize"
        @realTime="handleRealTime"
        @imgLoad="imgLoad"
        :enlarge="option.enlarge"
        :mode="option.mode"
        :limitMinSize="option.limitMinSize"
      />
    </div>
    <section class="pre-item">
      <div
        class="show-preview"
        :style="{
          width: statePreviews.previews.w + 'px',
          height: statePreviews.previews.h + 'px',
          overflow: 'hidden',
          margin: '5px'
        }"
      >
        <div :style="statePreviews.previews.div">
          <img :src="statePreviews.previews.url" :style="statePreviews.previews.img" />
        </div>
      </div>
    </section>
  </div>

  <div class="h-cropper-button">
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
  import 'vue-cropper/dist/index.css'
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
      let statePreviews = reactive({
        previews: {
          w: '',
          h: '',
          img: {
            transform: '',
            width: '',
            heigth: ''
          },
          url: '',
          html: '',
          div: {
            width: '',
            heigth: ''
          }
        }
      })
      // const lists:Ref<imgInterface[]> = ref([])
      const option = reactive({
        img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4',
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 150,
        centerBox: false,
        high: false,
        cropData: {},
        enlarge: 1,
        mode: 'contain',
        maxImgSize: 3000,
        limitMinSize: [100, 120],
        infoTrue: true
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
      function handleRealTime(data) {
        statePreviews.previews = data
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

      return {
        option,
        hCropper,
        crap,
        statePreviews,

        changeImg,
        startCrop,
        stopCrop,
        clearCrop,
        refreshCrop,
        changeScale,
        rotateLeft,
        rotateRight,
        finish,
        handleRealTime,
        down,
        uploadImg,
        imgLoad
      }
    }
  })
</script>
<style lang="less">
  .h-cropper {
    width: 100%;
    height: 250px;
    margin: 10px;
    display: flex;
    align-items: center;
  }
  .show-preview {
    width: 180px;
    height: 120px;
  }
  .h-cropper-button {
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
  }
</style>
