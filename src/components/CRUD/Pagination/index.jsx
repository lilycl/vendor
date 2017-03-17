import React from 'react'
import {Pagination, Select} from 'antd'

import PubSub from 'pubsub-js'
import { ON_QUERY_RESULT,ON_FILTER } from '../events'

/**
 * 内部分页器组件
 */
class InnerPagination extends React.Component {

  constructor(state) {
    super(state)

    this.state = {
      total: 0,
      pageSize: 20,
      current: 1,
      queryObj:{}
    }

    PubSub.subscribe(ON_QUERY_RESULT, this.getResult.bind(this))
    PubSub.subscribe(ON_FILTER, this.onFilter.bind(this))

  }

  getResult(name, params) {
    if(params.totalPage) {
      this.setState({ total: params.totalPage })
    }
  }

  onFilter(name, queryObj) {
    this.setState({ queryObj,current: queryObj.pageNum || 1 })
  }

  onChange(page,pageSize) {
    const { queryObj } = this.state
    queryObj.pageNum = page
    this.publishSub(ON_FILTER, queryObj)
    this.setState({current:page})
  }

  // 发布一个通知
  publishSub(name, param) {
    setTimeout(() => {
      PubSub.publish(name, param)
    }, 0)
  }

  render() {
    // 有些状态要传到父组件中去处理
    return (
      <div className="db-pagination">
        <Pagination
          selectComponentClass={Select}
          total={this.state.total * this.state.pageSize }
          showTotal={(total) => `每页${this.state.pageSize}条, 共 ${this.state.total} 页`}
          pageSize={this.state.pageSize} 
          defaultCurrent={1}
          current={this.state.current}
          onChange={this.onChange.bind(this)}
        />
      </div>
    )
  }

}

export default InnerPagination

function noop() {}