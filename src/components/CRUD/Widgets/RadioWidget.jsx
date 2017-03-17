import React from 'react'
import { Radio } from 'antd'
import BaseWidget from './Widget'

const RadioGroup = Radio.Group;

@BaseWidget
export default class extends React.Component {
  constructor () {
    super()

    this.state = {
      options: []
    }
  }

  render () {
    const { field, colWrapper } = this.props
    let options = []

    if (field && field.ext) {
      options = field.ext.options || []
    }

    return colWrapper((
      <RadioGroup>
        {options.map(o => {
          return (
            <Radio key={o.key} value={o.key}>{o.value}</Radio>
          )
        })}
      </RadioGroup>
    ))
  }
}