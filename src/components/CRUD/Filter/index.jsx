import React, { PropTypes } from 'react'

import { Form, Row, Col, Button, Icon } from 'antd'

import PubSub from 'pubsub-js'
import { ON_FILTER, ON_FILTER_REFRESH } from '../events'

import './index.less'

let timeout

const propTypes = {
  // 查询字段配置
  schema: PropTypes.array,

  // 是否不显示查询按钮 默认为显示
  notShowSearch: PropTypes.bool,

  // 执行查询函数
  onSubmit: PropTypes.func
}

/**
 * 内部表单组件
 */
class InnerFilter extends React.Component {

  constructor(props) {
    super(props)
    
    this.handleSubmit()
    PubSub.subscribe(ON_FILTER_REFRESH, this.handleSubmit.bind(this))
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    this.handleSubmit()
  }
  
  
  
  // 获取普通filter控件
  getWidget(type, field) {
    const Widget = type ? require(`../Widgets/${type}Widget`) : require('../Widgets/InputWidget')
    
    return (
      <Widget  
        key={field.key}
        type={'filter'}
        field={field}
        handleSubmit={this.handleSubmit.bind(this)}
        {...this.props.form}
      />
    )
  }

  /**
   * 表单的查询条件不能直接传给后端, 要处理一下
   *
   * @param oldObj
   * @returns {{}}
   */
  filterQueryObj(oldObj) {
    // 将提交的值中undefined的去掉
    const newObj = {}
    for (const key in oldObj) {
      if(oldObj[key]) {
        // 对于js的日期类型, 要转换成字符串再传给后端
        if(oldObj[key] instanceof Date) {
          newObj[key] = oldObj[key].format('yyyy-MM-dd HH:mm:ss')
        } else {
          newObj[key] = oldObj[key]
        }
      }
    }
    return newObj
  }

  /**
   * 处理表单提交
   *
   * @param e
   */
  handleSubmit(e) {
    e && typeof e !== 'string' && e.preventDefault()

    const { onSubmit, schema } = this.props
    const oldObj = this.props.form.getFieldsValue()
    const newObj = this.filterQueryObj(oldObj)

    // 绑定query中的固定传入的值
    schema.forEach(s => {
      if(s.fixed) {
        newObj[s.key] = s.fixed
      }
    })

    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    timeout = setTimeout(() => {
      PubSub.publish(ON_FILTER, newObj)
      onSubmit(newObj)
    },0)
  }

  handleReset(e) {
    e && e.preventDefault()
    this.props.form.resetFields()
  }

  render() {
    let rows = []
    let cols = []

    const { schema, notShow } = this.props

    // 不显示filter情况下 直接执行隐藏filter选项
    if(notShow) {
      return null
    }

    if(!schema) {
      return (
        <div className="ant-advanced-search-form">
          filter配置为空
        </div>
      )
    }

    // 参见antd的布局, 每行被分为24个格子
    // 普通的字段每个占用8格, between类型的字段每个占用16格
    let spaceLeft = 24

    schema.forEach((field, $index)=> {
      if(field.notShow) { return false }

      // 当前列需要占用几个格子? 普通的都是8, 只有datetime between是16
      let spaceNeed = field.size || 8

      // 如果当前行空间不足, 就换行
      if(spaceLeft < spaceNeed) {
        rows.push(<Row key={'rows-' + rows.length} gutter={16}>{cols}</Row>)
        cols = []  // 不知array有没有clear之类的方法
        spaceLeft = 24 // 剩余空间重置
      }

      cols.push(this.getWidget(field.widget, field))
      spaceLeft -= spaceNeed
    })

    // 别忘了最后一行
    if(cols.length > 0) {
      rows.push(<Row key={'rows-' + rows.length} gutter={16}>{cols}</Row>)
    }

    // 表单的前面是一堆输入框, 最后一行是按钮
    return (
      <Form horizontal className="ant-advanced-search-form">
        {rows}

        <Row>
          <Col span={12} offset={12} style={{ textAlign: 'right' }}>
            {!this.props.notShowSearch ?
              <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                <Icon type="search"/>查询</Button> : null}
            {!this.props.notShowSearch ?
              <Button onClick={this.handleReset.bind(this)}>
                <Icon type="cross"/>清除条件</Button> : null}
          </Col>
        </Row>
      </Form>
    )
  }

}

InnerFilter = Form.create()(InnerFilter)  // antd中的表单组件还要这么包装一层

function noop() {}

InnerFilter.propTypes = propTypes
InnerFilter.defaultProps = {
  onSubmit: noop,
  schema: []
}

export default InnerFilter
