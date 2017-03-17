import React from 'react';
import API from 'apis'
import './index.less';
import CRUD from 'components/CRUD';
import crudConfig from './crud';
import { Tabs, Modal, Button } from 'antd';
import BrandInfo from './form/BrandInfo'
import SaleTable from './form/SaleTable'
const TabPane = Tabs.TabPane;

const Filter = CRUD.Filter
const Table = CRUD.Table
const Pagination = CRUD.Pagination

class Brands extends React.Component {
  
constructor(props) {
    super(props)

    this.state = {
      // 查看sku弹出层
      skuModal: {
        show: false
      },
      skuModals: {
        show: false
      },

      formModal: {
        show: true
      },
      visible: false,
    }
  }

  getInitialState() {
    return { visible: false };
  }
  
  showModal() {
    this.setState({
      visible: true,
    });
  }
  showModals() {
    this.setState({
      visible: true,
    });
  }
   // 查看详情


  // 查看sku
  previewSku(show) {
    API.brandDetail({
     'brandId': '1006474755',
    })
    this.setState({
      skuModal: { show }
    })
  }
  preview(show) {
    this.setState({
      skuModals: { show }
    })
  }
  handleOk() {
    this.setState({
      visible: false,
    });
  }
  handleCancel(e) {
    this.setState({
      visible: false,
    });
  }


  render() {
    const { skuModal,skuModals, formModal } = this.state
    return (
      <div className="card-container">
        <CRUD>
          <Filter {...crudConfig.filter}/>
          <Table 
          previewSku={this.previewSku.bind(this, true)}
          preview={this.preview.bind(this, true)}
            {...crudConfig.table} 
          />
          <Pagination />
        </CRUD>

        <Modal 
          title="查看品牌信息"
          visible={skuModal.show}
          onCancel={this.previewSku.bind(this, false)}
          footer={null}
          width="80%"
        >
          {
            skuModal.show ? 
            <div>
              <BrandInfo/>
            </div> : 
            null
          }
        </Modal>
        <Modal 
          title="查看售卖信息"
          visible={skuModals.show}
          onCancel={this.preview.bind(this, false)}
          footer={null}
          width="80%"
        >
          {
            skuModals.show ? 
            <div>
              <SaleTable/>
            </div> : 
            null
          }
        </Modal>
      </div>
      
    )
  }
}

export default Brands;










