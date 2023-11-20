const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: 'http://localhost:5001', // Адрес вашего бекенда
    headers: {
      'Access-Control-Allow-Origin': 'http://172.17.1.31:8080',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': true,
    },
  },
};