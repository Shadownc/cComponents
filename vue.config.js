const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'./',
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("utils", resolve("src/utils"))
      .set("views", resolve("src/views"))
  }
})
