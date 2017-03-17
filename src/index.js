/**
 * 程序的入口, 类似java中的main
 */

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

// 开始引入各种自定义的组件
import App from './apps/entry/App'
import Welcome from './apps/entry/Welcome'
import Error from './apps/entry/Error'
import Goods from './apps/goods'
import Investment from './apps/investment'
import Brands from './apps/brands'
import Finance from './apps/finance'
import Points from './apps/points'
import Category from './apps/category'
import Message from './apps/message'
import Transaction from './apps/transaction'
import './base.less'

// 路由表, 只要menu.js中所有的叶子节点配置了路由就可以了
// 我本来想根据menu.js自动生成路由表, 但那样太不灵活了, 还是自己配置好些
const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="index" component={Welcome} />
      <Route path="goods" component={Goods} />
      <Route path="investment" component={Investment} />
      <Route path="brand" component={Brands} />
      <Route path="finance" component={Finance} />
      <Route path="points" component={Points} />
      <Route path="category" component={Category} />
      <Route path="message" component={Message} />
      <Route path="transaction" component={Transaction} />
    </Route>
  </Router>
)

ReactDOM.render(routes, document.getElementById('root'))
