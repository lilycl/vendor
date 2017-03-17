import React from 'react'
import BaseWidget from './Widget'
import {DatePicker, InputNumber, Input} from 'antd'

import PubSub from 'pubsub-js'

const Search = Input.Search
import { FORM_EDIT_INIT } from '../events'

@BaseWidget
export default class extends React.Component {
  constructor() {
    super()

    PubSub.subscribe(FORM_EDIT_INIT, this.init.bind(this))
  }

  init(msg, data) {
    const { type, field, setFieldsValue } = this.props

    setFieldsValue({
      [field.key]: data[field.key],
    })

  }

  onChange(e){
    const { type, field, setFieldsValue, validateFields } = this.props

    setFieldsValue({
      [field.key]: e.target.value,
    })
    
    this.props.validateFields([field.key],{rules: field.rules},(err,values)=>{
      if(err) {
        return;
      } else {
        console.log('Received values of form: ', values);
      }
    })
  }

  render() {
    const {field, colWrapper} = this.props
    let Widget = {}
    switch (field.dataType) {
      case 'int':
        Widget = (<InputNumber size="default"/>)
        break
      case 'float':
        Widget = (<InputNumber step={0.01} size="default"/>)
        break
      case 'datetime':
        Widget = (
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder={field.placeholder || '请选择日期'}/>)
        break
      default:
        Widget = (
          <Input
            placeholder={field.placeholder}
            size="default"/>)
    }

    return colWrapper(Widget,false,{
      onChange:this.onChange.bind(this)
    })
  }
}