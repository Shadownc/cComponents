<template>
  <div class="flex flex-col items-center mt-4">
    <el-button class="w-[200px] h-[40px]" type="primary" @click="tailor"
      >点击截图</el-button
    >
    <template v-if="screenImg.length">
      <el-image
        v-for="(item, index) in screenImg"
        :key="index"
        :src="item"
        :preview-src-list="[item]"
      >
      </el-image>
    </template>
  </div>
</template>

<script>
import ScreenShot from "js-web-screen-shot";
export default {
  data() {
    return {
      screenShot: null,
      screenImg: [],
    };
  },
  beforeDestroy() {
    if(!this.screenShot) return
    this.screenShot.destroyComponents();
  },
  methods: {
    tailor() {
      //enableWebRtc false 使用html2canvas 左上角乱码去除index.html中的noscript标签解决，但是如果左上角有图片图片会不显示
      this.screenShot = new ScreenShot({
        enableWebRtc: true,
        completeCallback: (v) => this.completeCallback(v),
      });
    },
    completeCallback(v) {
      console.log(v);
      this.screenImg.push(v.base64);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>