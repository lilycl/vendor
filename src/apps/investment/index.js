import React from 'react';
import './index.less';
import { Tabs, Card, Col, Row, Modal, Button,Checkbox,Input } from 'antd';
import InnerForm from './InnerForm'
import vendorDetail from './vendorDetail'
import CRUD from 'components/CRUD';
import crudConfig from './crud';

const Filter = CRUD.Filter
const Table = CRUD.Table
const Pagination = CRUD.Pagination
const TabPane = Tabs.TabPane


class Investment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 查看sku弹出层
      visible: false,
      vendorInfo: {
        show: false
      },
       violation: {
        show: false
      },

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
   vendorInfo(show) {
    this.setState({
      vendorInfo: { show }
    })
  }
  violation(show) {
    this.setState({
      violation: { show }
    })
  }

  // 查看sku
  previewSku(show) {
    this.setState({
      skuModal: { show }
    })
  }
 
  render() {
    const { vendorInfo, formModal ,violation} = this.state
    return (
      <div className="card-container">
        <Button  id="inverstment-btn" type="default" onClick={this.showModal.bind(this)}>+ 新增商家</Button>
        <Tabs type="card">
          <TabPane tab="全部 (100) " key="1">
            <div style={{ padding: '10px' }}>
                <CRUD>
                  <Filter {...crudConfig.filter}/>
                </CRUD>
                <CRUD>
                  <Table 
                    vendorInfo={this.vendorInfo.bind(this)}
                    previewSku={this.previewSku.bind(this, true)} 
                    {...crudConfig.table} 
                  />
                  <Pagination />
                </CRUD>
                <Modal 
                  title="查看商家"
                  visible={vendorInfo.show}
                  onCancel={this.vendorInfo.bind(this, false)}
                  footer={null}
                  width="80%"
                >
                {
                  vendorInfo.show ? 
                  <div>
                      <ul className="vendor-info">
                          <li>
                            <label>*公司名称</label>
                            <span>千玺科技股份有限公司</span>
                          </li>
                          <li>
                            <label>*入驻平台</label>
                            <span>
                              <Checkbox>质选</Checkbox>
                              <Checkbox>米动商城</Checkbox>
                            </span>
                          </li>
                          <li>
                            <label>*一级类目</label>
                            <span>
                               运动>运动鞋   
                            </span>
                          </li>
                          <li>
                            <label>*商家联系人</label>
                            <span>
                               李千玺     
                            </span>
                          </li> 
                          <li>
                            <label>*商家邮箱</label>
                            <span>
                               12346578@qq.com       
                            </span>
                          </li>
                      </ul>
                      <div>
                          <h2>基本信息</h2>
                          <ul className="vendor-info">
                             <li>
                                <label>*商家名称</label>
                                <span>千玺科技股份有限公司</span>
                              </li> 
                              <li>
                                <label>*商家简介</label>
                                <span>千玺科技股份有限公司</span>
                              </li>
                              <li>
                                <label>*商家logo</label>
                                <img src=""/>
                              </li>
                          </ul>
                          <div className="firstContact">
                              <h3>第一联系人</h3>
                              <ul>
                                 <li>
                                    <label>*姓名</label>
                                    <span>大三元</span>
                                  </li>
                              </ul>
                          </div>
                          <div className="firstContact">
                              <h3>第二联系人</h3>
                              <ul>
                                 <li>
                                    <label>*姓名</label>
                                    <span>大三元</span>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div> : 
                  null
                }
              </Modal>
            </div>
          </TabPane>
          <TabPane tab="待审核（60）" key="2">
            <div style={{ padding: '10px' }}>
                <CRUD>
                  <Filter {...crudConfig.filter}/>
                </CRUD>
                <CRUD>
                  <Table 
                    {...crudConfig.table1} 
                  />
                  <Pagination />
              </CRUD> 
            </div>
          </TabPane>
          <TabPane tab="审核通过（6）" key="3">
              <div style={{ padding: '10px' }}>
                <CRUD>
                  <Filter {...crudConfig.filter}/>
                </CRUD>
                <CRUD>
                  <Table 
                    violation={this.violation.bind(this)}
                    {...crudConfig.table2} 
                  />
                  <Pagination />
              </CRUD>
              <Modal 
                title=""
                visible={violation.show}
                onCancel={this.violation.bind(this, false)}
                width="40%"
              >
                {
                  violation.show ? 
                  <form>
                    <Input type="textarea" defaultValue="输入违规理由" rows={4} /> 
                  </form> : 
                  null
                }
              </Modal>

            </div>
          </TabPane>
          <TabPane tab="审核不通过（64）" key="4">
              <div style={{ padding: '10px' }}>
                <CRUD>
                  <Filter {...crudConfig.filter}/>
                </CRUD>
                <CRUD>
                  <Table 
                    
                    {...crudConfig.table} 
                  />
                  <Pagination />
              </CRUD> 
            </div>
          </TabPane>
        </Tabs>
        
        <InnerForm 
          visible={this.state.visible} 
          handleCancel={this.handleCancel.bind(this)} 
        />
      </div>
    )
  }
}

export default Investment;










