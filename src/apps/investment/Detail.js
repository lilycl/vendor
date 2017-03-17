import React from 'react'

import { Tabs, Modal, Row, Col, Form  } from 'antd'

const FormItem = Form.Item
const TabPane = Tabs.TabPane

/**
 * 展示欢迎界面
 */
export default class extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		const { detail } = this.props

		return (
      <div>
        <FormItem 
              key={'brandName'}
              label={'品牌名称'}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              style={{marginBottom: '10px'}}
          >
              {detail.brandName}
          </FormItem>
          <FormItem 
              key={'vendorName'}
              label={'商家名称'}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              style={{marginBottom: '10px'}}
          >
              {detail.vendorName}
          </FormItem>
      </div>
		)
	}

}
