import React from 'react';
import './index.less';
import CRUD from 'components/CRUD';
import crudConfig from './crud';
import { Tabs,Button,Card, Col, Row,Checkbox,Input,Select } from 'antd';

const TabPane = Tabs.TabPane;

const Filter = CRUD.Filter
const Table = CRUD.Table
const Pagination = CRUD.Pagination

class Finance extends React.Component {
render(){
  return(
    <div>商家设置
      <div>基本信息
          <ul className="vendor-info">
              <li>
              <label>公司名称*</label>
              <span>
                  千禧科技股份有限公司  
              </span>
              </li>
              <li>
              <label>入驻平台*</label>
              <span>
                  <Checkbox>质选</Checkbox>
                  <Checkbox>米动商城</Checkbox>
              </span>
              </li>
              <li>
              <label>一级类目*</label>
              <span>
                  运动>运动鞋 运动>运动鞋 运动>运动鞋   
              </span>
              </li>
              <li>
              <label>商家联系人*</label>
              <span>
                  李千玺     
              </span>
              </li>  
              <li>
              <label>商家邮箱*</label>
              <span>
                  12346578@qq.com       
              </span>
              </li>
          </ul>
      </div>
      <div>
        基本信息
        <span>商家入驻说明</span>
        
      </div>
    </div>
  )}
}

export default Finance;