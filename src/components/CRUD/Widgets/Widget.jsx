import React from 'react'
import { Form, Col } from 'antd'
const FormItem = Form.Item

import PubSub from 'pubsub-js'
import EVENTS from '../events'

/**
 * 组件基础类
 */
export default (Widget) => class extends React.Component {
  constructor(props) {
    super(props)
  }

  /**
   * 辅助函数, 将一个input元素包装下
   *
   * @param formItem
   * @param noDecorator
   * @param options
   * @returns {XML}
   */

  colWrapper(formItem, noDecorator, options = {}) {
    const { type, getFieldDecorator, field } = this.props
    const labelSize = field.labelSize || (type === 'filter' ? 10 : 4)
    const FormWidget = noDecorator 
      ? formItem 
      : getFieldDecorator(field.key, Object.assign({rules: field.rules}, options))(formItem)

    return type === 'filter' ? (
      <Col key={field.key} sm={12} style={{marginBottom: '10px'}}>
        <FormItem 
          key={field.key}
          label={field.label} 
          labelCol={{ span: labelSize }} 
          wrapperCol={{ span: 24 - labelSize }}
        >
          {FormWidget}
        </FormItem>
      </Col>
    ) :
    <FormItem 
      key={field.key} 
      label={field.label} 
      labelCol={{ span: 4  }} 
      wrapperCol={{ span: 18 - 4 }}
      style={{marginBottom: '10px'}}
    >
      {FormWidget}
    </FormItem>
  }

  render() {
    return (
      <Widget 
        colWrapper={this.colWrapper.bind(this)}
        {...this.props}
      />
    )
  }
}