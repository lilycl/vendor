import React from 'react'
import BaseWidget from './Widget'
import { Input } from 'antd'

const Search = Input.Search

@BaseWidget
export default class extends React.Component {
  constructor() {
    super()
  }

  handleSearch(value) {
    const { field, setFieldsValue, handleSubmit ,getFieldsValue } = this.props
    if(value.trim()) {
      setFieldsValue({
        [field.key]: value.trim()
      })
    }
    handleSubmit && handleSubmit(window.event)
  }

  render() {
    const {field, colWrapper} = this.props

    const Widget = (
      <Search 
        style={{width: '200px'}}
        placeholder={field.placeholder || '请选择日期'} 
        onSearch={this.handleSearch.bind(this)} 
      />
    )
    
    return colWrapper(Widget)
  }
}