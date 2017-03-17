import React from 'react';
import './index.less';
import CRUD from 'components/CRUD';
import crudConfig from './crud';
import { Tabs,Button,Card, Col, Row } from 'antd';

const TabPane = Tabs.TabPane;

const Filter = CRUD.Filter
const Table = CRUD.Table
const Pagination = CRUD.Pagination


class Transaction extends React.Component {
render(){
  return(
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="全部" key="1">
          
        </TabPane>
        <TabPane tab="正向交易" key="2">
            
        </TabPane>
        <TabPane tab="逆向交易" key="3">
            
        </TabPane>
        <TabPane tab="换货" key="4">
            
        </TabPane>
        <TabPane tab="申诉中" key="5">
            
        </TabPane>
      </Tabs>
    </div>
  )}
}

export default Transaction;