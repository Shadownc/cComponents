<template>
  <div>
    <div>{{ count }}</div>
    <div>{{ doubleCount }}</div>
    <button @click="hIncrement">+1</button>
    <button @click="decrease">-1</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { mainStore } from "@/stores/counter";
export default {
  name: "TestPinia",
  components: {},
  computed: {
    ...mapState(mainStore, ["count", "doubleCount"]),
  },
  mounted() {},
  methods: {
    ...mapActions(mainStore, {
      hIncrement: "increment",
      decrease: "decrease",
    }),
  },
};
</script>
