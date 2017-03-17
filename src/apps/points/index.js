import React from 'react';
import './index.less';
import CRUD from 'components/CRUD';
import crudConfig from './crud';
import { Tabs,Button,Card, Col, Row } from 'antd';

const TabPane = Tabs.TabPane;

const Filter = CRUD.Filter
const Table = CRUD.Table
const Pagination = CRUD.Pagination


function callback(key) {
  console.log(key);
}

class Points extends React.Component {
render(){
  return(
    <div className="card-container">
      <Tabs onChange={callback} type="card">
        <TabPane tab="处罚管理" key="1">
            <CRUD>
              <Filter {...crudConfig.filter}/>
            </CRUD>
            <CRUD>
                <Table 
                  {...crudConfig.table} 
                />
                <Pagination />
            </CRUD>

        </TabPane>
        <TabPane tab="商家积分管理" key="2">
            <div style={{  padding: '30px' }}>
              <Row>
                <Col span="6">
                  <Card title="666666" bordered={false}>严重违规商家数</Card>
                </Col>
                <Col span="6">
                  <Card title="14670" bordered={false}>保证金总额</Card>
                </Col>
                <Col span="6">
                  <Card title="10" bordered={false}>保证金扣除金额</Card>
                </Col>
                <Col span="6">
                  <Card title="10" bordered={false}>保证余额不足商家数</Card>
                </Col>
              </Row>
            </div>
            <CRUD>
                <Filter {...crudConfig.filter}/>
                <Table 
                  {...crudConfig.table} 
                />
                <Pagination />
            </CRUD>
        </TabPane>
      </Tabs>
    </div>
  )}
}

export default Points;