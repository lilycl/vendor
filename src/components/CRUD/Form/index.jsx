import React from 'react'
import {
  Form, Modal, message, notification, Affix, Alert
} from 'antd'

import PubSub from 'pubsub-js'
import { 
  ON_FORM_DELETE, ON_FORM_SHOW, ON_REFRESH, RESET_FIELD, FORM_EDIT_INIT, ON_CLOSE_ERRORS
} from '../events'

const FormItem = Form.Item

/**
 * 内部表格组件
 */
class InnerForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false, // modal是否可见
      modalTitle: '新增',   // modal标题
      modalInsert: true,   // 当前modal是用来insert还是update
      errors: {
        show: false, // 是否显示错误信息
        message: ''
      },
    }

    this.editform = {}
  }

  componentDidMount() {
    // 监听打开编辑框事件
    PubSub.subscribe(ON_FORM_SHOW, this.openFormModal.bind(this))
    // 删除事件
    PubSub.subscribe(ON_FORM_DELETE, this.handleDelete.bind(this))
    // 关闭错误提示
    PubSub.subscribe(ON_CLOSE_ERRORS, this.validateFields.bind(this, true))
  }

  // 打开表单编辑框
  openFormModal(name, params) {
    // 关闭弹窗时取消各组件的订阅
    if(!params.show) {
      PubSub.unsubscribe(FORM_EDIT_INIT)
    }

    if(params.isEdit) {
      this.onEditShow(params.record)
    }else {
      this.setState({ modalVisible: params.show, modalTitle: '新增', modalInsert: true })
    }
  }

  // 显示编辑状态时
  onEditShow(record) {
    this.editform = Object.assign({}, record)

    for(var key in this.editform) {
      if(this.editform.hasOwnProperty(key) && this.editform[key]) {
        this.editform[key] = this.editform[key].toString()
      }
    }
    
    // 通知触发修改显示
    this.props.form.setFieldsValue(this.editform)
    this.publishSub(FORM_EDIT_INIT, this.editform)
    
    this.setState({modalVisible: true, modalTitle: '更新', modalInsert: false})
  }

  // 发布一个通知
  publishSub(name, param) {
    setTimeout(() => {
      PubSub.publish(name, param)
    }, 0)
  }

  /**
   * 进行表单验证
   * 
   * @param close 
   */
  validateFields(close) {
    const { form } = this.props
    let pass = false

    form.validateFields((err, values) => {
      if(!err) {
        this.setState({ errors: { show: false, message: '' }})
      }else if(!close) {
        let message = []
        for(let key in err) {
          message.push(err[key].errors.map(error => {
            return <div>{error.message}</div>
          }))
        }
        this.setState({ errors: {
          show: true, message
        }})
      }

      pass = !err
    })

    return pass
  }

  /**
   * 点击modal中确认按钮的回调
   */
  handleModalOk() {
    const { form, schema } = this.props
    const { modalInsert } = this.state
    const filedsValue = form.getFieldsValue()

    if(this.validateFields()) {
      if (modalInsert) {
        // 插入固定传入的值
        // 如果showAdd且是Insert操作或者showEdit且是更新操作是才插入
        schema.forEach(s => {
          if(s.fixed 
            && (
              (modalInsert && s.showAdd) 
              || (!modalInsert && s.showEdit)
            )
          ) {
            filedsValue[s.key] = s.fixed
          }
        })

        this.handleInsert(filedsValue)
      } else {
        this.handleUpdate(Object.assign(this.editform, filedsValue))
      }
    }

  }

  /**
   * 真正去处理新增数据
   */
  handleInsert(obj) {
    const hide = message.loading('正在新增...', 0)
    const { ajax, onInsert} = this.props

    ajax.add(obj).then(ret => {
      hide()

      if(ret.data.status !== '100') throw ret.data.msg
      if(ret.data.status === '100') {
        notification.success({
          message: '新增成功',
          duration: 3,
        })
        this.publishSub(ON_REFRESH)
        this.openFormModal(null, {show: false})
        onInsert && onInsert.call(null, ret.data.data)
      }
    }).catch(err => notification.error({
      message: '新增失败',
      description: err ? `请联系管理员, 错误信息: ${err}`:'请求insert接口出错, 请联系管理员',
      duration: 3,
    }))
  }

  /**
   * 真正去更新数据
   */
  handleUpdate(obj) {
    let formObj = JSON.parse(JSON.stringify(obj))
    let form = {}
    const { ajax, onUpdate, schema } = this.props
    const hide = message.loading('正在更新...', 0)

    // 筛选掉不存在edit中的项目
    schema.forEach(field => {
      if(field.primary || field.showEdit) {
        form[field.key] = formObj[field.key]
      }
    })

    ajax.edit(form).then(ret => {
      hide()
      // err就是一个字符串
      // res是一个Response对象, 其中的body字段才是服务端真正返回的数据
      if(ret.data.status !== '100') throw ret.data.errorMessage
      if(ret.data.status === '100') {
        notification.success({
          message: '更新成功',
          duration: 3,
        })
      }

      this.publishSub(ON_REFRESH)
      this.openFormModal(null, {show: false})
      onUpdate && onUpdate.call(null, ret.data.data)
    }).catch(err => {
      notification.error({
        message: '更新失败',
        description: typeof err === 'string' ? err : `请联系管理员, 错误状态: ${err.status}`,
        duration: 3,
      })
      hide()
    })
  }

  /**
   * 真正去删除数据
   */
  handleDelete(name, param) {
    const { ajax, onDelete } = this.props
    const hide = message.loading('正在删除...', 0)
    ajax.delete({[this.primaryKey]: param.record[this.primaryKey]}).then(ret => {
      hide()
      // err就是一个字符串
      // res是一个Response对象, 其中的body字段才是服务端真正返回的数据
      if(ret.data.status !== '100') throw ret.data.msg
      if(ret.data.status === '100') {
        notification.success({
          message: '删除成功',
          duration: 3,
        })
      }
      this.publishSub(ON_REFRESH)
      onDelete && onDetele.call(null, ret.data)
    }).catch(err => notification.error({
      message: '删除失败',
      description: err ? `请联系管理员, 错误信息: ${err}`:'请求insert接口出错, 请联系管理员',
      duration: 3,
    }))
  }

  // 获取表单组件
  getWidget(key, type, field) {
    if(type) {
      const Widget = require(`../Widgets/${type}Widget`)
      return <Widget type={'form'} key={key} field={field} {...this.props.form} validate={this.validateFields.bind(this)}/>
    }

    return null
  }

  render() {
    // 生成表单项
    const formItems = []

    const { schema } = this.props
    const { modalInsert, errors } = this.state

    schema.forEach((field, $index) => {
      if (modalInsert && field.showAdd) {
        formItems.push(this.getWidget($index, field.widget, field))
      }

      if (!modalInsert && field.showEdit) {
        formItems.push(this.getWidget($index, field.widget, field))
      }
      
      // 设置当前主键
      if(field.primary) {
        this.primaryKey = field.key
        this.primaryKeyType = field.dataType
      }
    })

    return (
      <Modal
        width='80%'
        title={this.state.modalTitle}
        visible={this.state.modalVisible}
        onOk={this.handleModalOk.bind(this)}
        onCancel={this.openFormModal.bind(this, null, {show: false})}
        maskClosable={false}
      >
        {/*<div style={{width: '90%', margin: '0 auto', display: errors.show ? 'block' : 'none'}}>
          <Alert message={errors.message} type="error" showIcon />
        </div>*/}
        <Form horizontal>
          {this.state.modalVisible ? 
           formItems :
           null
          }
        </Form>
      </Modal>
    )
  }

}

InnerForm = Form.create()(InnerForm)

export default InnerForm
