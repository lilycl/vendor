/**
 * Created by zyh on 16/6/13.
 * 后端交互层，导出所有后端交互的接口
 */

import r from './request'
// const URLS = 'http://172.16.6.166:8025/'

const POST = r.getRequest('/api/', 'post')
const GET  = r.getRequest('/api/', 'get')
const REST  = r.getRESTful('/api/')

/**
 * 返回api集合
 * import API from 'apis'
 * API.login({password:'xxx', username:'damon'})
 *  .then(ret => {console.log(ret)})
 *  .catch(err => {console.log(err)})
 * */
const apiCollection = {
  getGoodsList: GET('item-list'),
  brand: REST('brand{/brandId}'),
  createGoods: POST('item'),
  knowledge: REST(
    'knowledge/test{/id}', r.AUTO_LOADING, r.AUTO_ERROR
  ),
  investment: REST(
    'investment/info{/id}', r.AUTO_LOADING
  ),
  hhh: REST(
    'investment/hhh', r.AUTO_LOADING
  )
}
export default apiCollection
