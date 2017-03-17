import React, { PropTypes } from 'react'

import './index.less'

/**
 * 头像组件
 */

export default class extends React.Component {
  constructor () {
    super()

    this.state = {}
  }
  render() {
    return (
      <div 
        className="gaosi-comp-avatar" 
        {...this.props}
      >
        <img src="/assets/images/userphoto.png" />
      </div>
    )
  }
}