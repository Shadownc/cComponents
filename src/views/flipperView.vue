<template>
  <div class="flex justify-center items-center h-full">
    <div class="FlipClock">
      <filpper ref="flipperHour1" />
      <filpper ref="flipperHour2" />
      <em>:</em>
      <filpper ref="flipperMinute1" />
      <filpper ref="flipperMinute2" />
      <em>:</em>
      <filpper ref="flipperSecond1" />
      <filpper ref="flipperSecond2" />
    </div>
  </div>
</template>

<script>
import filpper from "components/flipper";
import dayjs from "dayjs";
export default {
  components: {
    filpper,
  },
  data() {
    return {
      timer: null,
      flipObjs: [],
    };
  },
  mounted() {
    this.flipObjs = [
      this.$refs.flipperHour1,
      this.$refs.flipperHour2,
      this.$refs.flipperMinute1,
      this.$refs.flipperMinute2,
      this.$refs.flipperSecond1,
      this.$refs.flipperSecond2,
    ];
    this.init();
    this.run();
  },
  methods: {
    init() {
      let nowTimeStr = dayjs().format("HHmmss");
      for (let i = 0; i < this.flipObjs.length; i++) {
        this.flipObjs[i].setFront(nowTimeStr[i]);
      }
    },
    run() {
      this.timer = setInterval(() => {
        let nowTimeStr = dayjs(new Date().getTime() - 1000).format("HHmmss");
        let nextTimeStr = dayjs().format("HHmmss");
        for (let i = 0; i < this.flipObjs.length; i++) {
          if (nowTimeStr[i] === nextTimeStr[i]) {
            continue;
          }
          this.flipObjs[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.FlipClock {
  text-align: center;
  em {
    display: inline-block;
    line-height: 102px;
    font-size: 66px;
    font-style: normal;
    vertical-align: top;
  }
}
.FlipClock .flip {
  margin: 0 3px;
}
</style>