<template>
  <div class="flex w-full h-full">
    <div class="w-[70%]">
      <TDMap
        v-if="showMap"
        :mapName="mapName"
        :mapData="mapData"
        :isDrill="true"
        @down="mapDrill"
        @up="mapUp"
      ></TDMap>
    </div>
    <div class="flex-1 flex items-center px-5">
      <el-card class="w-full">
        <el-form label-position="top" label-width="80px" :model="form">
          <el-form-item label="选择省">
            <el-select
              v-model="form.province"
              placeholder="选择省"
              @change="selectChange($event, 1)"
            >
              <el-option label="请选择" value=""></el-option>
              <el-option
                v-for="(item, index) in regionData"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择市">
            <el-select
              v-model="form.city"
              placeholder="选择市"
              @change="selectChange($event, 2)"
            >
              <el-option label="请选择" value=""></el-option>
              <el-option
                v-for="(item, index) in cityData"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择区">
            <el-select
              v-model="form.area"
              placeholder="选择区"
              @change="selectChange($event, 3)"
            >
              <el-option label="请选择" value=""></el-option>
              <el-option
                v-for="(item, index) in areaData"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getMapData, getMapFullData } from "@/api";
import TDMap from "@/components/3DMap.vue";
import { regionData } from "element-china-area-data";
export default {
  data() {
    return {
      mapData: {},
      mapName: "china",
      showMap: false,
      regionData,
      form: {},
      cityData: [],
      areaData: [],
      nowLevel: 1,
      levelCodeList: ['100000'],
    };
  },
  components: {
    TDMap,
  },
  mounted() {
    this.init(100000);
  },
  methods: {
    async init(code) {
      this.showMap = false;
      try {
        this.mapData = await getMapFullData(code);
        this.showMap = true;
      } catch (e) {
        try {
          this.mapData = await getMapData(code);
          this.showMap = true;
        } catch (err) {
          console.log(err);
        }
      }
    },
    mapDrill(name) {
      this.nowLevel += 1;
      this.setSelectOption(this.nowLevel, name);
    },
    mapUp(){
      this.form={}
      if(this.levelCodeList.length==1) return
      this.nowLevel-=1
      this.levelCodeList.pop()
      this.nowLevel=this.levelCodeList.length
      this.init(this.levelCodeList[this.levelCodeList.length-1])
    },
    setSelectOption(level, name) {
      let value;
      switch (level) {
        case 2:
          value = this.regionData.find((i) => i.label == name)["value"];
          this.$set(this.form, "province", value);
          this.cityData = this.regionData.find(
            (i) => i.value == this.form.province
          )["children"];
          if(this.cityData.length==1){
            this.nowLevel+=1
            this.$set(this.form, "city", this.cityData[0].value);
            this.areaData=this.cityData[0].children
          }
          break;
        case 3:
          value = this.cityData.find((i) => i.label == name)["value"];
          this.$set(this.form, "city", value);
          this.areaData = this.cityData.find((i) => i.value == this.form.city)[
            "children"
          ];
          break;
        case 4:
          value = this.areaData.find((i) => i.label == name)["value"];
          this.$set(this.form, "area", value);
          break;
      }
      this.mapName = value.padEnd(6, "0");
      this.levelCodeList.push(this.mapName);
      this.init(this.mapName);
    },
    selectChange(v, type) {
      this.nowLevel=1;
      let mapData,
        isSend = true;
      switch (type) {
        case 1:
          this.form.city = "";
          this.form.area = "";
          if (!v) {
            this.mapName = "china";
            this.init(100000);
            return;
          }
          mapData = this.regionData.find((i) => i.value == v);
          this.cityData = mapData["children"];
          break;
        case 2:
          this.form.area = "";
          if (!v) {
            this.init(this.form.province.padEnd(6, "0"));
            return;
          }
          mapData = this.cityData.find((i) => i.value == v);
          this.areaData = mapData["children"];
          isSend = this.cityData.length > 1;
          break;
        case 3:
          if (!v) {
            this.init(
              this.cityData.length > 1
                ? this.form.city.padEnd(6, "0")
                : this.form.province.padEnd(6, "0")
            );
            return;
          }
          mapData = this.regionData.find((i) => i.value == v);
          break;
      }
      this.mapName = v.padEnd(6, "0");
      if (isSend) {
        this.levelCodeList.push(this.mapName);
        this.init(v.padEnd(6, "0"));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>