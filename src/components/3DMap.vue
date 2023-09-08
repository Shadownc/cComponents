<template>
  <div id="3d-map" class="w-full h-full">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    mapName: {
      type: String,
      default: "",
    },
    mapData: {
      type: Object,
      default: () => {},
    },
    el: {
      type: String,
      default: "3d-map",
    },
    isDrill: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chart: null,
      timeTicket: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.chart = this.$echarts.init(document.getElementById(this.el));
      this.$echarts.registerMap(this.mapName, this.mapData);
      let options = {
        geo: {
          map: this.mapName, //地图类型。
          zoom: 1,
          roam: true,
          animation: false,
          itemStyle: {
            // 区域样式
            areaColor: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(147, 235, 248, 1)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(2, 99, 206, 1)", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
            shadowColor: "#105781", //地图区域的阴影颜色。
            shadowOffsetX: 0,
            shadowOffsetY: 10,
          },
        },
        series: [
          {
            name: "map",
            type: "map", // 地图
            map: this.mapName, // 加载注册的地图
            selectedMode: false, // 不让单独选中
            roam: true, // 开始鼠标事件，scale缩放、move移动
            // 图形上的文本标签
            label: {
              show: true,
              color: "#000a3c",
            },
            // 地图样式
            itemStyle: {
              // 区域样式
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 3,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(223, 231, 242, 1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(2, 99, 206, 1)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
              borderWidth: 1, // 边框大小
              borderColor: "rgba(104, 152, 190, 1)", // 边框样式
              shadowColor: "rgba(128, 217, 248, 1)", // 阴影颜色
              shadowOffsetX: -2, // 阴影水平方向上的偏移距离
              shadowOffsetY: 2, // 阴影垂直方向上的偏移距离
              shadowBlur: 10, // 文字块的背景阴影长度
            },
            // 选中状态下样式
            emphasis: {
              label: {
                color: "#ffffff",
              },
              itemStyle: {
                areaColor: "#a5d4fe",
              },
            },
          },
        ],
      };
      this.chart.setOption(options);
      this.chart.on("georoam", (params) => {
        let option = this.chart.getOption(); //获得option对象
        if (params.zoom != null && params.zoom != undefined) {
          //捕捉到缩放时
          option.geo[0].zoom = option.series[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
          option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
        } else {
          //捕捉到拖曳时
          option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
        }
        this.chart.setOption(option); //设置option
      });
      this.chart.off("click");
      this.chart.off("dblclick");
      this.chart.on("click", (params) => {
        if (!this.isDrill) return;
        this.timeTicket = setTimeout(() => {
          // 单击事件的处理逻辑
          this.$emit("down", params.name);
        }, 300);
      });
      this.chart.on("dblclick", (params) => {
        if (!this.isDrill) return;
        clearTimeout(this.timeTicket);
        this.$emit("up");
      });

      window.addEventListener("resize", () => {
        this.chart && this.chart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>