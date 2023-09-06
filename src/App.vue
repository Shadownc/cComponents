<template>
  <div id="app" class="flex w-screen h-screen">
    <sideBar></sideBar>
    <div class="flex-1">
      <router-view/>
    </div>
  </div>
</template>
<script>
import sideBar from '@/components/sideBar.vue'
export default {
  components: {
    sideBar,
  },
}
</script>
<style>

</style>
