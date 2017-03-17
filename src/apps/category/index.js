import React from 'react';
import CRUD from 'components/CRUD';
import crudConfig from './crud';
import { Tabs, Card, Col, Row, Modal, Button, Form, Input,Icon } from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item

const Filter = CRUD.Filter
const Table = CRUD.Table
const Pagination = CRUD.Pagination

let uuid = 0;
class InnerForm extends React.Component {
  constructor(props) {
    super(props)
  }

  handleOk() {
    
    this.props.handleCancel()
  }
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 20, offset: 3 },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '类目' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "提示语",
            }],
          })(
            <Input placeholder="添加类目" style={{ width: '80%', marginRight: 10 }} />
          )}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        </FormItem>
      );
    });
    return (
        <div className="card-container">
        <Tabs type="card">
          <TabPane tab="前台" key="1">
            <CRUD>
              <Filter {...crudConfig.filter}/>
            </CRUD>
            <div style={{ padding: '20px' }}>
              <Row>
                <Col span="6">
                  <Card title="一级类目" bordered={false}>
                      <Form onSubmit={this.handleSubmit}>
                          {formItems}
                          <FormItem {...formItemLayoutWithOutLabel}>
                            <Button type="dashed" onClick={this.add} style={{ width: '80%' }}>
                              <Icon type="plus" />添加新类目
                            </Button>
                          </FormItem>
                          <FormItem {...formItemLayoutWithOutLabel}>
                            <Button type="primary" htmlType="submit" size="large">添加</Button>
                          </FormItem>
                        </Form>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>


          <TabPane tab="后台" key="2">
            
            <div style={{ padding: '30px' }}>
              <Row>
                <Col span="6">
                  <Card title="一级类目" bordered={false}>
                      <Form onSubmit={this.handleSubmit}>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                  <Button type="dashed" onClick={this.add} style={{ width: '80%' }}>
                    <Icon type="plus" /> 添加新类目
                  </Button>
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                  <Button type="primary" htmlType="submit" size="large">添加</Button>
                </FormItem>
              </Form>
                  </Card>
                </Col>
                <Col span="6">
                  <Card title="二级类目" bordered={false}>
                      <Form onSubmit={this.handleSubmit}>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                  <Button type="dashed" onClick={this.add} style={{ width: '80%' }}>
                    <Icon type="plus" /> 添加新类目
                  </Button>
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                  <Button type="primary" htmlType="submit" size="large">添加</Button>
                </FormItem>
              </Form>
                  </Card>
                </Col>
                <Col span="6">
                  <Card title="三级类目" bordered={false}>
                      <Form onSubmit={this.handleSubmit}>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                  <Button type="dashed" onClick={this.add} style={{ width: '80%' }}>
                    <Icon type="plus" /> 添加新类目
                  </Button>
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                  <Button type="primary" htmlType="submit" size="large">添加</Button>
                </FormItem>
              </Form>
                  </Card>
                </Col>
                <Col span="6">
                  <Card title="四级类目" bordered={false}>
                      <Form onSubmit={this.handleSubmit}>
                        {formItems}
                        <FormItem {...formItemLayoutWithOutLabel}>
                          <Button type="dashed" onClick={this.add} style={{ width: '80%' }}>
                            <Icon type="plus" /> 添加新类目
                          </Button>
                        </FormItem>
                        <FormItem {...formItemLayoutWithOutLabel}>
                          <Button type="primary" htmlType="submit" size="large">添加</Button>
                        </FormItem>
                      </Form>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

InnerForm = Form.create()(InnerForm);

export default InnerForm







