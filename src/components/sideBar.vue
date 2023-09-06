<template>
  <div
    class="h-full p-3 space-y-2 w-60 dark:bg-gray-900 dark:text-gray-100 border-r border-[#e6e6e6]"
  >
    <div class="flex items-center p-2 space-x-4">
      <img
        src="https://source.unsplash.com/100x100/?portrait"
        alt=""
        class="w-12 h-12 rounded-full dark:bg-gray-500"
      />
      <div>
        <h2 class="text-lg font-semibold">Demo</h2>
        <span class="flex items-center space-x-1">
          <a
            rel="noopener noreferrer"
            href="#"
            class="text-xs hover:underline dark:text-gray-400"
            >效果展示</a
          >
        </span>
      </div>
    </div>
    <div class="divide-y divide-gray-700 cursor-pointer">
      <ul class="pt-2 pb-4 space-y-1 text-sm">
        <li class="dark:bg-gray-800 dark:text-gray-50" v-for="(item,index) in menuList" :key="index">
          <a
            class="flex items-center p-2 space-x-3 rounded-md"
            @click="$router.push(item.path)"
          >
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
      <!-- <ul class="pt-4 pb-2 space-y-1 text-sm">
        <li>
          <a class="flex items-center p-2 space-x-3 rounded-md cursor-pointer">
            <span>Dashboard</span>
          </a>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        { name: "验证码组件", path: "cCode" },
        { name: "网站一键悼念主题", path: "/grayscale" },
        { name: "3D词云", path: "/worldCloud" },
        { name: "水印", path: "/waterMark" },
        {name:"3D旋转动画",path:'/3d-rotate'}
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>