<template>
  <div class="h-cropper">
    <div style="width: 380px; height: 250px; margin-right: 80px">
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
    <label class="btn mr10" for="uploads">
      <MyIcon type="icon-upload" />
    </label>
    <input
      type="file"
      id="uploads"
      style="position: absolute; clip: rect(0 0 0 0)"
      accept="image/png, image/jpeg, image/gif, image/jpg"
      @change="uploadImg($event, 1)"
    />
    <Button
      type="primary"
      size="small"
      :disabled="option.img ? false : true"
      class="mr10"
      @click="refreshCrop"
    >
      <MyIcon type="icon-refresh" />
    </Button>
    <Button
      type="primary"
      size="small"
      :disabled="option.img ? false : true"
      class="mr10"
      @click="changeScale(1)"
    >
      <MyIcon type="icon-sousuofangda" />
    </Button>
    <Button
      type="primary"
      size="small"
      :disabled="option.img ? false : true"
      class="mr10"
      @click="changeScale(-1)"
    >
      <MyIcon type="icon-suoxiao" />
    </Button>
    <Button
      type="primary"
      size="small"
      :disabled="option.img ? false : true"
      class="mr10"
      @click="rotateLeft"
    >
      <MyIcon type="icon-rotate-left" />
    </Button>
    <Button
      type="primary"
      size="small"
      :disabled="option.img ? false : true"
      class="mr10"
      @click="rotateRight"
    >
      <MyIcon type="icon-rotate-right" />
    </Button>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue'
  import 'vue-cropper/dist/index.css'
  import { VueCropper } from 'vue-cropper'
  import { Button } from 'ant-design-vue'
  import MyIcon from '/@/components/MyIcon/index.vue'
  export default defineComponent({
    name: 'HCroppe',
    components: {
      VueCropper,
      Button,
      MyIcon
    },
    emits: ['handleCropper'],
    setup(props, { emit }) {
      const hCropper = ref()
      console.log(props)

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
      const option = reactive({
        img: '',
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [7, 5], // 截图框的宽高比例
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
      function finish(type: string) {
        if (type === 'blob') {
          hCropper.value.getCropBlob((data) => {
            var img = window.URL.createObjectURL(data)
            model.value = true
            modelSrc.value = img
            emit('handleCropper', false)
          })
        } else {
          hCropper.value.getCropData((data) => {
            model.value = true
            modelSrc.value = data
            emit('handleCropper', false)
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
        let file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        let reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (e.target && e.target.result && typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target?.result
          }
          if (num === 1) {
            option.img = data
          } else if (num === 2) {
            //   this.example2.img = data
          }
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
    margin: 0 0 10px 0;
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

      white-space: nowrap;
      cursor: pointer;
      border: 1px solid #c0ccda;
      color: #1f2d3d;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      padding: 0px 7px;
      height: 24px;
      line-height: 24px;
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
