import React from 'react';
import './index.less';
import CRUD from 'components/CRUD';
import crudConfig from './crud';
import { Tabs,Button,Card, Col, Row } from 'antd';

const TabPane = Tabs.TabPane;

const Filter = CRUD.Filter
const Table = CRUD.Table
const Pagination = CRUD.Pagination




class Message extends React.Component {
render(){
  return(
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="全部" key="1">
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
        <TabPane tab="已发送" key="2">
            
        </TabPane>
        <TabPane tab="发送中" key="3">
            
        </TabPane>
        <TabPane tab="草稿箱" key="4">
            
        </TabPane>
      </Tabs>
    </div>
  )}
}

export default Message;