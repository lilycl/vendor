import React from 'react'
import { Tag } from 'antd'
import BaseWidget from './Widget'
import ItemSelect from 'components/ItemSelect'

import PubSub from 'pubsub-js'
import { FORM_EDIT_INIT, RESET_FIELD } from '../events'

const CheckableTag = Tag.CheckableTag

/**
 * 选择切换
 */
@BaseWidget
export default class extends React.Component {
  constructor (props) {
    super(props)

    const { field } = props

    this.state = {
      // 当前选中项
      active: 0,

      items: field && field.ext ? field.ext.items : []
    }

    PubSub.subscribe(FORM_EDIT_INIT, this.init.bind(this))
    PubSub.subscribe(RESET_FIELD, this.resetField.bind(this))
  }
  resetField() {
    this.defaultId = null
    const { field, setFieldsValue,getFieldsValue } = this.props
    const items = field.ext.items
    setFieldsValue({
      [field.key]: items[this.state.active].key
    })
  }
  //初始化配置
  init(msg, data) {
    const { field, setFieldsValue,getFieldsValue } = this.props
    const items = field.ext.items
    setFieldsValue({
      [field.key]: items[this.state.active].key
    })
  }

  // 初次加载设置filter初始值
  componentDidMount () {
    const { field, setFieldsValue } = this.props
    if (field && field.ext) {
      const items = field.ext.items
      setFieldsValue({
        [field.key]: items[this.state.active].key
      })
    }
  }

  onItemClick ($index, key, item) {
    const { field, setFieldsValue, handleSubmit } = this.props
    
    if (this.state.active !== $index) {
      this.setState({
        active: $index
      })

      setFieldsValue({
        [field.key]: item.key
      })

      handleSubmit && handleSubmit(window.event)
    }
  }

  render() {
    const { field, type, colWrapper } = this.props


    if (this.state.items.length > 0) {
      return colWrapper((
        <ItemSelect 
          config={{items: this.state.items}} 
          onItemClick={this.onItemClick.bind(this)}
        />
      ))
    } else {
      return null
    }
  }
}