import React from 'react';
import { Row, Col, Button, Card, Input } from 'antd'

import UEditor from 'components/UEditor'

class InnerItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {

    return (
      <div {...this.props}>
        <UEditor />
      </div>
    )
  }

}

export default InnerItems