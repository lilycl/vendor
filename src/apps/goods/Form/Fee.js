import React from 'react';
import { Row, Col, Button, Form, Card, Input, Radio } from 'antd'

const RadioGroup = Radio.Group
const FormItem = Form.Item

class InnerFee extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { form:{ getFieldDecorator }, formItemLayout } = this.props

    return (
      <Form {...this.props} horizontal>
        <Card style={{marginTop: 20}} title="运费／其它">
          <FormItem
            label={'运费设置'}
            {...formItemLayout}
          >
            <a>去设置</a>
          </FormItem>
          <FormItem
            label={'商品限购'}
            {...formItemLayout}
          >
            {getFieldDecorator('limits', {initialValue: 1})(
              <RadioGroup>
                <Radio value={'0'}>不限购</Radio>
                <Radio value={'1'}>每个ID限购一件</Radio>
                <Radio value={'5'}>每个ID限购5件</Radio>
                <Radio value={'-5'}>5件起购</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label={'库存计数'}
            {...formItemLayout}
          >
            {getFieldDecorator('stockType', {initialValue: 1})(
              <RadioGroup>
                <Radio value={'1'}>买家拍下减库存</Radio>
                <Radio value={'2'}>买家付款减库存</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label={'支持发票类型'}
            {...formItemLayout}
          >
            {getFieldDecorator('invType', {initialValue: 1})(
              <RadioGroup>
                <Radio value={'1'}>纸质发票</Radio>
                <Radio value={'2'}>电子发票</Radio>
                <Radio value={'3'}>纸质+电子发票</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label={'退换货承诺'}
            {...formItemLayout}
          >
            {getFieldDecorator('srvPromise', {initialValue: 1})(
              <RadioGroup>
                <Radio value={'1'}>是</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label={'支持发保修'}
            {...formItemLayout}
          >
            {getFieldDecorator('isGuarantee', {initialValue: 1})(
              <RadioGroup>
                <Radio value={'1'}>是</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Card>
      </Form>
    )
  }

}

export default Form.create({
  onValuesChange() {
    
  }
})(InnerFee)