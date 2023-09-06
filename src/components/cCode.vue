<template>
  <div>
    <slot>
      <div id="container"></div>
    </slot>
  </div>
</template>

<script>
import jigsaw from "jigsaw-captcha-js";
export default {
  props: {
    el: {
      type: String,
      default: "container",
    },
    width: {
      type: Number,
      default: 310,
    },
    height: {
      type: Number,
      default: 155,
    },
    imgs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    jigsaw.init({
      el: document.getElementById(this.el),
      imgs: this.imgs, // 可选，默认为一张内置图片
      width: this.width, // 可选, 默认310
      height: this.height, // 可选, 默认155
      onSuccess: () => {
        this.message = "匹配成功";
        this.$emit('valid',true)
      },
      onFail: () => {
        this.$emit('valid',false)
        this.message = "匹配失败";
      },
      onRefresh: () => {
        this.$emit('valid',false)
        this.message = "刷新成功";
      },
    });
  },
};
</script>

<style lang="scss" scoped>
</style>