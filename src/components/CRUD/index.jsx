/**
 * 提供基本增删改查的组件
 */
import React, { PropTypes } from 'react'
import {Row, Col, notification} from 'antd'

import EVENTS from './events'
import PubSub from 'pubsub-js'
import InnerFilter from './Filter'
import InnerTable from './Table'
import InnerPagination from './Pagination'
import Loading from './loading'

import './index.less'

const propTypes = {
  /**
   * 组件基础配置
   * filter 过滤器配置
   * table 表格项目配置
   * pagination 分页配置
   */
  filter: PropTypes.object,
  table: PropTypes.object,
  pagination: PropTypes.object
} 

/**
 * 操作数据库中的一张表的组件, 又可以分为3个组件: 表单+表格+分页器
 * 
 * 多余actions可通过
 */
class CURD extends React.Component {

  constructor(props) {
    super(props)
    PubSub.clearAllSubscriptions()
  }

  render() {
    const { filter, table, schema, pagination } = this.props

    const Filter = (
       <InnerFilter {...filter} />
    )

    const Table = (
      <InnerTable {...this.props} {...table} />
    )

    const Pagination = (
      <InnerPagination {...pagination} />
    )

    // 父组件传进去的方法名都是parentHandleXXX
    return (
      <div id="crud-content-main">
        { this.props.children ? 
          this.props.children : 
          <Row>
            <div style={{marginLeft: '15px'}}>
              { Filter }
              { Table }
              { Pagination }
            </div>
          </Row>
        }
      </div>
    )
  }

}

CURD.propTypes = propTypes

CURD.Table = InnerTable
CURD.Pagination = InnerPagination
CURD.Filter = InnerFilter
CURD.EVENTS = EVENTS

CURD.defaultProps = {
  filter: {},
  table: {},
  pagination: {}
}

export default CURD
