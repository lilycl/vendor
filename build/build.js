/**
 * 发布生产产品打包 生成生产环境代码 
 * 执行后会生成一个wgt包到update-server/packages目录下
 */

require('shelljs/global')

var config = require('./config')
process.env.NODE_ENV = 'production'

var os = require("os")
var fs = require("fs")
var path = require('path')
var ora = require('ora')

var webpack = require('webpack')
var webpackConfig = require('./webpack/webpack.prod.conf')
var ProgressPlugin = require('webpack/lib/ProgressPlugin')
var htmlGenerator = require('./webpack/htmlGenerator')

webpackCompile()

// webpack编译
function webpackCompile() {

  // 添加压缩代码插件
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  )

  webpackConfig.plugins = webpackConfig.plugins.concat(htmlGenerator(true))

  // 重新设置输出缓存路径
  webpackConfig.output.path = config.build.prodRoot

  var
  spinner = ora('building for production...')
  spinner.start()

  mkdir('-p', config.build.prodRoot)
  mkdir('-p', config.build.prodRoot + '/static/lib/')
  cp('-R', path.join(__dirname, '../src/assets/lib/'), 
          config.build.prodRoot + (os.platform() === 'darwin' ? '/static/lib/' : '/static/')
    )
  cp('-R', 'manifest.json', config.build.prodRoot)

  webpackConfig.watch = true
  webpackConfig.progress = true

  var compiler = webpack(webpackConfig)

  compiler.apply(
    new ProgressPlugin(function(percentage, msg) {
      spinner.text = 'building for development... ' + (percentage * 100).toFixed(0) + '% ' + msg;
    })
  );

  compiler.run(function (err, stats) {
    console.log('webpack打包完成')
    spinner.stop()
    if (err) throw err
  })
}

