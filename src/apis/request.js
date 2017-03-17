import { Http, Resource } from '../service'
import decorator from './decorator'

const TIMEOUT = 15000

module.exports = {
  // 接口是否自动loading
  AUTO_LOADING: true,

  // 接口是否自动处理错误
  AUTO_ERROR: true,

  // 生成请求对象
  getRequest: function(prefix, requestType) {
    return (url, autoloading, autoerror) => {
      return (params) => {
        if(requestType === 'get') {
          return Http[requestType](prefix + url, {
            params: params || {},
            method: requestType,
            timeout: TIMEOUT,
            before: decorator.before(autoloading, autoerror),
            after: decorator.after(autoloading, autoerror)
          })
        }else {
          return Http[requestType](prefix + url, params, {
            method: requestType,
            timeout: TIMEOUT,
            before: decorator.before(autoloading, autoerror),
            after: decorator.after(autoloading, autoerror)
          })
        }
      }
    }
  },

  // 生成RESTful resource
  getRESTful: function(prefix) {
    return (url, autoloading, autoerror) => {
      return Resource(prefix + url, null, null, {
        timeout: TIMEOUT,
        before: decorator.before(autoloading, autoerror),
        after: decorator.after(autoloading, autoerror)
      })
    }
  }
}