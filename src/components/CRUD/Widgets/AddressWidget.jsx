import React from 'react'
import { Row, Col, Select } from 'antd'
import BaseWidget from './Widget'

const Option = Select.Option

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
    
    const Widget = (
      <Row>
        <Col span={1} style={{textAlign: 'right'}}>省</Col>
        <Col span={5} style={{margin: '0 10px 0 7px'}}>
          <Select placeholder={'请选择'}>
          </Select>
        </Col>
        <Col span={1} style={{textAlign: 'right'}}>市</Col>
        <Col span={5} style={{margin: '0 10px 0 7px'}}>
          <Select placeholder={'请选择'}>
          </Select>
        </Col>
        <Col span={1} style={{textAlign: 'right'}}>区</Col>
        <Col span={5} style={{margin: '0 10px 0 7px'}}>
          <Select placeholder={'请选择'}>
          </Select>
        </Col>
      </Row>
    )

    return colWrapper(Widget, true)
  }
}