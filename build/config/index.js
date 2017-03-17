const path = require('path')
const proxy = require('./proxy')

const devpath = path.join(__dirname, '../../src')

module.exports = {
  // 监听端口
  port: 8089,

  // 开发源文件路径
  devpath: devpath,

  // 定义别名
  alias: {
    'components': path.resolve(devpath, 'components'),
    'plugins': path.resolve(devpath, 'plugins'),
    'apis': path.resolve(devpath, 'apis'),
    'redux-common': path.resolve(devpath, 'apps/redux-common'),
    'modules': path.resolve(devpath, 'modules')
  },

  // 是否请求mock接口
  mock: true,

  // 请求代理配置
  proxy: proxy
}