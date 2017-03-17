import Loading from '../loading'
import React from 'react'
import { Button, Upload, Icon, message } from 'antd'
import BaseWidget from './Widget'
import Uploader from 'components/Uploader'

import PubSub from 'pubsub-js'
import { FORM_EDIT_INIT } from '../events'

@BaseWidget
export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filename: null
    }

    PubSub.subscribe(FORM_EDIT_INIT, this.init.bind(this))
  }

  init(msg, data) {
    const { type, field, setFieldsValue } = this.props

    setFieldsValue({
      [field.key]: data[field.key]
    })

    this.setState({
      filename: data[field.key]
    })
  }

  onVideoUoloaded(info) {
    const { type, field, setFieldsValue } = this.props
    
    this.setState({
      filename: `${info.file.name}`
    })

    setFieldsValue({
      [field.key]: `${info.file.response.body.url}`
    })
  }

  render() {
    const { field, colWrapper } = this.props

    const Widget = (
      <div>
        <Uploader
          initurl={this.state.filename}
          api={field.ext.action}
          onSuccess={this.onVideoUoloaded.bind(this)} 
        />
      </div>
    )

    return colWrapper(Widget)
  }
}