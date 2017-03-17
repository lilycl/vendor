import React from 'react';
import { Row, Col, Button, Modal, Steps, Cascader } from 'antd'

import FormItems from './FormItems'
import Editor from './Editor'

const Step = Steps.Step

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // 当前步骤
      current: 1,
      // 类目列表
      categoryList: [{
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
        }],
      }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
          value: 'nanjing',
          label: 'Nanjing',
        }],
      }],
      // 提交的表单
      form: {}
    }
  }

  onFormChange(form) {
    this.state.form = Object.assign(this.state.form, form)

    this.setState({
      form: this.state.form
    })
  }

  onCascaderChange() {}

  gotoNext() {
    this.setState({
      current: this.state.current + 1
    })
  }

  gotoPre() {
    this.setState({
      current: this.state.current - 1
    })
  }

  render() {
    const { formModal, onCancel } = this.props
    const { categoryList, current } = this.state

    return (
      <div className="goods-add-edit-wrap">
        <Modal 
          title="SKU详情"
          visible={formModal.show}
          onCancel={onCancel}
          footer={null}
          width="90%"
        >
          <Steps style={{margin: '10px 0 0 0'}} size="small" current={this.state.current}>
            <Step title="选择商品品类" />
            <Step title="编辑基本信息" />
            <Step title="编辑商品详情" />
          </Steps>

          <div style={{display: this.state.current === 0 ? 'block' : 'none'}}>
            <Cascader 
              options={categoryList} 
              onChange={this.onCascaderChange}
            >
              <a style={{margin: '40px 10px 50px', display: 'block'}}>
                选择商品类目
              </a> 
            </Cascader>
          </div>

          <FormItems
            form={this.state.form}
            onFormChange={this.onFormChange.bind(this)}
            style={{display: this.state.current === 1 ? 'block' : 'none', padding: 15, margin: '15px 0'}}
          />

          <Editor 
            form={this.state.form}
            onFormChange={this.onFormChange.bind(this)}
            style={{display: this.state.current === 2 ? 'block' : 'none', padding: 15, margin: '15px 0'}}
          />

          <div style={{textAlign: 'center'}}>
            <Button style={{marginRight: 15, display: current === 0 ? 'none' : 'inline-block'}} type="primary" onClick={this.gotoPre.bind(this)}>上一步</Button>
            <Button style={{display: current === 2 ? 'none' : 'inline-block'}} type="primary" onClick={this.gotoNext.bind(this)}>下一步</Button>
            <Button style={{display: current === 2 ? 'inline-block' : 'none'}} type="primary">完成</Button>
          </div>
        </Modal>
      </div>
    )
  }

}
