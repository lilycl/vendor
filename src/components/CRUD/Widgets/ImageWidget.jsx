import React from 'react'
import { Button, Icon } from 'antd'
import BaseWidget from './Widget'

@BaseWidget
export default class extends React.Component {
  constructor() {
    super()

    this.state = {
      filename: null,
    }
  }

  onSelectFile(e) {
    const { field, setFieldsValue } = this.props
    var files = this.refs.fileUpload.files;
    setFieldsValue({
      [field.key]: files[0]
    })

    this.setState({
      filename: files[0].name
    })
  }

  render() {
    const { field, colWrapper } = this.props

    const Widget = (
      <Button type="ghost">
        <Icon type="upload" /> {this.state.filename || '点击上传文件'}
        <input 
          ref='fileUpload'
          style={
            {width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: '0'}
          }
          type="file" 
          onChange={this.onSelectFile.bind(this)} 
          accept="*.zip"
        />
      </Button>
    )

    return colWrapper(Widget, true)
  }
}