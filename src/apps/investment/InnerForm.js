import React from 'react';

import { Tabs, Card, Col, Row, Modal, Button, Form, Select,Input,Checkbox, Cascader } from 'antd';

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

class InnerForm extends React.Component {
  constructor(props) {
    super(props)
  }

  handleOk() {
    
    this.props.handleCancel()
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };
    const options = [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake',
        }],
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
        }],
      }],
    }];
    return (
      <Modal title="新增商家"
        visible={this.props.visible}
        onOk={this.handleOk.bind(this)}
        onCancel={this.props.handleCancel}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="公司名称"
            hasFeedback
          >
            {getFieldDecorator('text', {
              rules: [{
                required: true, type: 'string', message: '',
              }, {
                message: '',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="入驻平台"
            hasFeedback
          >
            {getFieldDecorator('Checkbox', {
            rules: [
            { required: true, message: '请选择' },
            ],
            })(
              <div>
                  <Checkbox>质选</Checkbox>
                  <Checkbox>米动商城</Checkbox>
              </div>

            )}
          </FormItem>
            <FormItem
            {...formItemLayout}
            label="一级类目"
            hasFeedback
          >
            {getFieldDecorator('Cascader', {
            rules: [
            { required: true, message: '请选择' },
            ],
            })(
              <div>
                   
                  <Cascader style={{display:'inline'}} options={options}  placeholder="选择类目" />
              </div>

            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="商家联系人"
            hasFeedback
          >
            {getFieldDecorator('email', {
              rules: [{
                required: true, type: 'string', message: '',
              }, {
                message: '',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="商家邮箱 "
            hasFeedback
          >
            {getFieldDecorator('email', {
              rules: [{
                required: true, type: 'string', message: '',
              }, {
                message: '',
              }],
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

InnerForm = Form.create()(InnerForm);

export default InnerForm







