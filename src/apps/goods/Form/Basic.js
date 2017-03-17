import React from 'react';
import { Row, Col, Button, Form, Card, Input } from 'antd'

import Uploader from 'components/Uploader'

const FormItem = Form.Item

class InnerItems extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { form:{ getFieldDecorator }, formItemLayout } = this.props

    return (
      <Form {...this.props} horizontal>
        <Card title="基本信息">
          <FormItem
            label={'商品品类'}
            {...formItemLayout}
          >
            测试
          </FormItem>
          <FormItem
            label={'品牌名称'}
            {...formItemLayout}
          >
            AMAZFIT
          </FormItem>
          <FormItem
            label={'商品名称'}
            {...formItemLayout}
          >
            {getFieldDecorator('title', {})(<Input />)}
          </FormItem>
          <FormItem
            label={'商品简称'}
            {...formItemLayout}
          >
            {getFieldDecorator('subtitle', {})(<Input />)}
          </FormItem>
          <FormItem
            label={'商品正面图'}
            {...formItemLayout}
          >
            <Uploader />
            <div>上传要求：尺寸800*800</div>
          </FormItem>
          <FormItem
            label={'商品场景图'}
            {...formItemLayout}
          >
            <Uploader />
            <div>上传要求：尺寸800*800，最多上传2张</div>
          </FormItem>
          <FormItem
            label={'商品细节图'}
            {...formItemLayout}
          >
            <Uploader />
            <div>上传要求：尺寸800*800，最少上传3张，最多上传5张</div>
          </FormItem>
        </Card>
      </Form>
    )
  }

}

export default Form.create({
  onFieldsChange(props, fields) {
    const keys = Object.keys(fields)
    if(keys.length > 0) {
      props.onFormChange && 
      props.onFormChange({[keys[0]]: fields[keys[0]].value})
    }
  }
})(InnerItems)