import React, { PropTypes } from 'react'
import {
  Button, Table, Icon, message, notification, Affix
} from 'antd'
import InnerForm from '../Form'

import PubSub from 'pubsub-js'
import { ON_FORM_DELETE, ON_FORM_SHOW, ON_QUERY_RESULT, ON_FILTER, ON_REFRESH } from '../events'

const ButtonGroup = Button.Group

const propTypes = {
  /**
   * 组件基础配置
   * rowClassName 列css类名
   * rowSelection 是否可选中
   * batchDelete 是否可批量删除
   * schema 数据列配置
   */
  rowClassName: PropTypes.string,
  rowSelection: PropTypes.bool,
  batchDelete: PropTypes.bool,
  schema: PropTypes.array
}

const defaultPageSize = 20

/**
 * 内部表格组件
 */
class InnerTable extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [], // 表格数据

      tableLoading: false,
      selectedRowKeys: [],  // 当前有哪些行被选中, 这里只保存key
      selectedRows: [],  // 当前有哪些行被选中, 保存完整数据
      // currentPage:1
    }

    this.currentPage = 1
    this.queryObj = {
      pageNum : 1
    }

    PubSub.subscribe(ON_FILTER, this.onFilter.bind(this))
    PubSub.subscribe(ON_REFRESH, this.getTableData.bind(this))
  }
  
  // 发布一个通知
  publishSub(name, param) {
    setTimeout(() => {
      PubSub.publish(name, param)
    }, 0)
  }

  /**
   * 点击更新按钮, 弹出一个内嵌表单的modal
   * 注意区分单条更新和批量更新
   *
   * @param e
   */
  onClickUpdate(text, record) {
    this.publishSub(ON_FORM_SHOW, {
      isEdit: true,
      show: true,
      record
    })
  }

  // 点击新增按钮
  onClickInsert() {
    this.publishSub(ON_FORM_SHOW, { show: true })
  }

  // 点击删除按钮
  onClickDelete(text, record) {
    this.publishSub(ON_FORM_DELETE, { record })
  }

  /**
   * 处理表格的选择事件
   *
   * @param selectedRowKeys
   * @param selectedRows
   */
  handleSelectChange(selectedRowKeys, selectedRows) {
    this.setState({selectedRowKeys, selectedRows})
  }

  // 绑定自定义action事件
  bindActionButtons(text, record, elem) {
    const events = {}

    if(elem.events && elem.events.length > 0) {
      elem.events.forEach(event => {
        if(this.props[event.action]) {
          events[event.name] = this.props[event.action].bind(null, text, record, this.getTableData.bind(this))
        }
      })
    }

    if(typeof(elem.render) === 'function') {
      elem.style 
        ?(elem.style.display ? null : elem.style.display = 'inline-block')
        :(elem.style = {display : 'inline-block'})
      return(
        <div style={elem.style} {...events} key={Math.random()}>
          {elem.render.call(this,text,record)}
        </div>
      )
    } else {
      return(
        <a style={elem.style} {...events} key={Math.random()}>
          {elem.render}
        </a>
      )
    }
  }

  // 获取自定义按钮
  getActionsButton(newCols) {
    const b = this.props.buttons.actions || []

    newCols.push({
      key: `actions`,
      title: '操作',
      className: 'comp-crud-table-action',
      render:(text, record) => {
        return b.map(this.bindActionButtons.bind(this, text, record)).concat(
          this.getNormalButtons(text, record)
        )
      }
    })
  }
  
  // 获取编辑删除按钮
  getNormalButtons(text, record) {
    const b = this.props.buttons
    const _buttons = []

    const style = {
      marginLeft: 10
    }

    if(b.edit.show) {
      _buttons.push(<a style={style} onClick={this.onClickUpdate.bind(this, text, record)} key={1}>编辑</a>)
    }

    if(b.delete.show) {
      _buttons.push(<a style={style} onClick={this.onClickDelete.bind(this, text, record)} key={2}>删除</a>)
    }

    return _buttons
  }

  // 当执行filter查询时
  onFilter(name, queryObj) {
    this.queryObj = queryObj
    this.getTableData()
  }

  // 获取表格数据
  getTableData() {
    const { ajax: { query }, schema } = this.props

    const 
    tmpObj = Object.assign({}, this.queryObj)
    tmpObj.pageSize = defaultPageSize

    this.setState({tableLoading: true, data: []})
    query(tmpObj).then(ret => {
      this.setState({tableLoading: false})
      if(ret.data.data.list) {
        this.publishSub(ON_QUERY_RESULT, ret.data.data)
        this.setState({
          data: ret.data.data.list.map((obj, $index) => {
            return Object.assign({key: $index}, obj)
          })
        })
      } else {
        this.publishSub(ON_QUERY_RESULT, ret.data.data)
        this.setState({data:[]})
      }
    })
  }

  // 解析schema
  parseSchema() {
    const newCols = []

    this.props.schema && this.props.schema.forEach((field) => {
      if(field.notShow) { return false }

      const col = {}
      col.key = field.key
      col.dataIndex = field.key
      col.title = field.label

      if(field.render) {
        col.render = field.render
      }
      if(field.width) {
        col.width = field.width
      }
      newCols.push(col)
    })

    this.getActionsButton(newCols)

    return newCols
  }

  getTableButtons() {
    const b = this.props.buttons
    const hasSelected = this.state.selectedRowKeys.length > 0  // 是否选择
    const multiSelected = this.state.selectedRowKeys.length > 1  // 是否选择了多项

    const { batchDelete } = this.props

    return(

    (b.add.show || b.delete.show) &&
      <div className="db-table-button">
        <ButtonGroup>
          {b.add.show && 
            <Button type="primary" onClick={this.onClickInsert.bind(this)}>
              <Icon type="plus-circle-o"/> {b.add.title || '新增'}
            </Button>
          }

          {/*{b.delete.show && !batchDelete && multiSelected && 
            <Button 
              type="primary" 
              onClick={this.onClickDelete.bind(this)}
            >
              <Icon type="delete"/> {'批量删除'}
            </Button>
          }*/}
        </ButtonGroup>
      </div>
    )
  }

  render() {
    const rowSelection = this.props.rowSelection ? {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.handleSelectChange.bind(this),
    } : null

    return(
      <div>
        {this.getTableButtons()}

        <Table 
          rowSelection={rowSelection}
          columns={this.parseSchema()} 
          dataSource={this.state.data} 
          pagination={false}
          loading={this.state.tableLoading}
          rowClassName={this.props.rowClassName}
        />

        <InnerForm {...this.props} />
      </div>
    )
  }
}

export default InnerTable