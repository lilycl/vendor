import React from 'react'
import { Switch } from 'antd'
import BaseWidget from './Widget'

@BaseWidget
export default class extends React.Component {
  constructor (props) {
    super(props)
    const { field } = props
  }

  componentDidMount() {
  }

  // 切换选项
  onChange(value) {
    const { field, setFieldsValue, handleSubmit } = this.props

    setFieldsValue({
      [field.key]: value
    })

    handleSubmit()
  }

  render () {
    const { field, getFieldDecorator } = this.props

    return getFieldDecorator(field.key, {})(
      <div style={{padding: '10px 20px'}}>
        <span style={{display: 'inline-block', marginRight: 10}}>{field.ext.title}</span>
        <Switch onChange={this.onChange.bind(this)} defaultChecked={false} />
      </div>
    )
  }
}