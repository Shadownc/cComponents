<template>
  <div>
    <cCode el="ls" :width="500" :height="300" @valid="valid" :imgs="imgs">
      <div id="ls"></div>
    </cCode>
  </div>
</template>

<script>
import cCode from "@/components/cCode.vue";
export default {
  data() {
    return {
      imgs:[
        // 'https://w.wallhaven.cc/full/jx/wallhaven-jxd59w.jpg'
        require('assets/images/code.jpg')
      ]
    };
  },
  components: {
    cCode,
  },
  methods: {
    valid(v) {
      console.log(v);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>