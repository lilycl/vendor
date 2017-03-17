import React from 'react'
import { Select } from 'antd'
import BaseWidget from './Widget'
const Option = Select.Option

@BaseWidget
export default class extends React.Component {
  constructor (props) {
    super(props)
    const { field } = props
    this.state = {
      options: field && field.ext ? field.ext.options : [],
      multiple: field && field.ext && !!field.ext.multiple
    }
  }

  render () {
    const { field, colWrapper } = this.props
    const { options, multiple } = this.state
    return colWrapper((
      <Select
        multiple={multiple}
        placeholder={field.placeholder || '请选择'} 
      >
        {options.map(o => {
          return (
            <Option
              key={o.key} 
              value={o.key}
            >
              {o.value}
            </Option>
          )
        })}
      </Select>
    ), false, {
      initialValue: field.defaultValue || options[0].key
    })
  }
}