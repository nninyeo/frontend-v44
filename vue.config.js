const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// proxy설정.. /api로 시작하면 우회해서 요청하는것(3000에서 요청하듯)
module.exports = {
  devServer:{
    proxy: {
      "/api":{
        target:"http://localhost:3000"
      }
    }
  }
}
