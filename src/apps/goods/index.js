import React from 'react'
import API from 'apis'
import { Row, Col, Button, Modal } from 'antd'

import UEditor from 'components/UEditor'
import InnerForm from './Form'
import CRUD from 'components/CRUD'
import crudConfig from './crud'

import './index.less'

const Filter = CRUD.Filter
const Table = CRUD.Table
const Pagination = CRUD.Pagination

/**
 * 展示欢迎界面
 */
class Goods extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // 查看sku弹出层
      skuModal: {
        show: false
      },

      formModal: {
        show: false
      }
    }
  }

  // 查看详情
  preview() {}

  // 查看sku
  previewSku(show) {
    this.setState({
      skuModal: { show }
    })
  }

  addGoodsForm(show) {
    // API.createGoods({
    //   'blCid': '1232131',
    //   'brandName': 'sss',
    //   'title': '商品名称',
    //   'sku_plist': JSON.stringify({name: '123', title: 'test'})
    // })
    this.setState({
      formModal: { show }
    })
  }

  render() {
    const { skuModal, formModal } = this.state

    return (
      <div className="goods-wrap">
        <Button 
          onClick={this.addGoodsForm.bind(this, true)}
          style={{marginBottom: 10}} 
          type="ghost" 
        >添加商品
        </Button>
        
        <InnerForm 
          formModal={formModal}
          onCancel={this.addGoodsForm.bind(this, false)}
        />

        <CRUD>
          <Filter {...crudConfig.filter} />

          <Table 
            preview={this.preview.bind(this)}
            previewSku={this.previewSku.bind(this, true)}
            {...crudConfig.table} 
          />
          <Pagination />
        </CRUD>

        <Modal 
          title="SKU详情"
          visible={skuModal.show}
          onCancel={this.previewSku.bind(this, false)}
          footer={null}
          width="80%"
        >
          {
            skuModal.show ? 
            <div>123</div> : 
            null
          }
        </Modal>
      </div>
    )
  }

}

export default Goods;
