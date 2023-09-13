<template>
  <div class="items-center">
    <el-table
      :data="list"
      :span-method="objectSpanMethod"
      border
      style="width: 800px;margin: 50px auto 0;"
      
    >
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column
        prop="country"
        label="国家"
        width="180"
      ></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: "12987121", country: "法国", name: "skrskr", age: 20 },
        { id: "12987122", country: "中国", name: "王力宏", age: 20 },
        { id: "12987122", country: "中国", name: "周杰伦", age: 22 },
        { id: "12987122", country: "中国", name: "林俊杰", age: 22 },
        { id: "12987123", country: "日本", name: "新垣结衣", age: 30 },
        { id: "12987124", country: "美国", name: "钢铁侠", age: 30 },
      ],
      spanArr: [],
      position: 0,
    };
  },
  mounted() {
    this.getRowSpan();
  },
  methods: {
    getRowSpan() {
      this.list.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1);
          this.position = 0;
        } else {
          if (this.list[index].id === this.list[index - 1].id) {
            this.spanArr[this.position] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.position = index;
          }
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>