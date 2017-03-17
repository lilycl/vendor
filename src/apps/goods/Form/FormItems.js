import React from 'react';
import { Row, Col, Button, Card, Input } from 'antd'

import Fee from './Fee'
import Basic from './Basic'
import Sku from './Sku'

const formItemLayout = {
  labelCol: { span: 4, style: {textAlign: 'left'} },
  wrapperCol: { span: 14 },
}

class InnerItems extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { form, onFormChange } = this.props

    return (
      <div {...this.props}>
        <Basic onFormChange={onFormChange.bind(this)} initform={form} formItemLayout={formItemLayout} />
        <Sku   onFormChange={onFormChange.bind(this)}   initform={form} formItemLayout={formItemLayout} />
        <Fee   onFormChange={onFormChange.bind(this)}   initform={form} formItemLayout={formItemLayout} />
      </div>
    )
  }

}

export default InnerItems