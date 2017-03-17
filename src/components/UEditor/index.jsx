import React from 'react';
import { Row, Col } from 'antd'
import './index.less';

/**
 * 展示欢迎界面
 */
class UEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      content: ''
    }
  }

  componentDidMount() {
    this.um = UM.getEditor('myEditor')

    this.um.addListener( 'contentChange', ( editor ) => {
      const content = this.um.getContent()
      this.setState({ content })
      this.props.onChange &&
      this.props.onChange(content)
    })
  }

  render() {
    return (
      <Row>
        <Col span={12}>
          <div className='ueditor-preview-wrap'>
            <div className='ueditor-preview-detail' dangerouslySetInnerHTML={{__html: this.state.content}}>
            </div>
          </div>
        </Col>
        <Col span={12} style={{textAlign: 'right'}}>
          <div style={{textAlign: 'left'}}>
            <script type="text/plain" id="myEditor" style={{width:'375px',height:'400px'}}>
              <p>这里我可以写一些输入提示</p>
            </script>
          </div>
        </Col>
      </Row>
    )
  }

}

export default UEditor;
