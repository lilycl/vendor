process.env.NODE_ENV = 'development'

var config = require('./config')

var ora = require('ora')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxy = require('express-http-proxy')
var utils = require('./utils')
var ProgressPlugin = require('webpack/lib/ProgressPlugin')

var webpackConfig = require('./webpack/webpack.dev.conf')
var app = express()

// 监听端口
var port = config.port
// 代理配置
var proxyTable = config.proxy
var compiler = webpack(webpackConfig)

// 编译webpack
function webpackCompiler () {

  var
  spinner = ora('building...')
  
  process.nextTick(() => {
    spinner.start()
  })

  compiler.apply(
    new ProgressPlugin(function(percentage, msg) {
      spinner.text = 'building... ' + (percentage * 100).toFixed(0) + '% ' + msg;

      if (percentage === 1) {
        spinner.stop()
      }
    })
  )

  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    quiet: false,
    noInfo: true,
    stats: {
      colors: true,
      chunks: false,
      assets: true
    }
  })

  var hotMiddleware = require('webpack-hot-middleware')(compiler)

  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  })

  // handle fallback for HTML5 history API
  app.use(require('connect-history-api-fallback')())

  // serve webpack bundle output
  app.use(devMiddleware)

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware)
}

// 设置后端接口代理
function setProxy () {
  proxyTable.forEach(function (_proxy) {
    app.all(
      _proxy.url,
      proxy(
        _proxy.host,
        decorateProxy.call(this)
      )
    )
  })
}

//代理装饰
function decorateProxy () {
	return {
    decorateRequest: function(proxyReq, originalReq) {
      proxyReq.headers['appId'] = '2'
      return proxyReq;
    }
	}
}

// 设置静态文件目录
function setStatic () {
  app.use('/assets', express.static(path.join(__dirname, '../src/assets')))
}

// 绑定mock apis
function bindMock () {
  var mockapis = require('../src/mocks')

  for (var key in mockapis) {
    app.all('/' + key  + '/*', function (req, res) {
      var _reg = req.path.match(/^\/(api\/\w+)\/(\w+)/i)
      var _callback = require('../src/mocks')[_reg[1]][_reg[2]]

      if (typeof _callback === 'function') {
        if (!req.isPost) {
          res.json(_callback(req.query))
        } else {
          res.json(_callback(req.body))
        }
      } else {
        res.json(_callback)
      }
    })
  }
}

// 启动服务
function startServer () {
  // if (config.mock) {
  //   bindMock()
  // } else {
    setProxy()
  // }
  webpackCompiler()
  setStatic()

  app.listen(port, function (err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('Listening at http://'+ utils.getIpV4() +':' + port + '\n')
  })
}

startServer()