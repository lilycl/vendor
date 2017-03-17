import React from 'react'
import { Checkbox } from 'antd'
import BaseWidget from './Widget'
const CheckboxGroup = Checkbox.Group

@BaseWidget
export default class extends React.Component {
  constructor () {
    super()

    this.state = {
      options: []
    }
  }

  render () {
    const { field, getFieldDecorator, colWrapper } = this.props
    let options = []

    if (field && field.ext) {
      options = field.ext.options || []
    }

    return colWrapper(getFieldDecorator(field.key, {})(
      <CheckboxGroup 
        options={options.map(o => {
          return {label: o.value, value: o.key}
        })} 
      />
    ))
  }
}