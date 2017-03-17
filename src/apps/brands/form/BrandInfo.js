import React from 'react';
import CRUD from 'components/CRUD';
import crudConfig from '../crud';
import { Tabs, Modal, Button,abs, Card, Col, Row, Checkbox,Input } from 'antd';
const Filter = CRUD.Filter
const Table = CRUD.Table
const Pagination = CRUD.Pagination
class BrandInfo extends React.Component {
  render() {
    return (
        <div>
            <ul className="vendor-info">
                <li>
                <label>*品牌Logo/中／英文名</label>
                <span>Adidas</span>
                </li>
                <li>
                <label>*品牌注册国家</label>
                <span>
                    <Checkbox>质选</Checkbox>
                    <Checkbox>米动商城</Checkbox>
                </span>
                </li>
                <li>
                <label>*经营大类</label>
                <span>
                    运动>运动鞋   
                </span>
                </li>
                <li>
                <label>*商品数</label>
                <span>
                    李千玺     
                </span>
                </li> 
                <li>
                <label>*商家数</label>
                <span>
                    12346578@qq.com       
                </span>
                </li>
                <li>
                <label>*录入时间</label>
                <span>
                    李千玺     
                </span>
                </li> 
                <li>
                <label>*商标类型</label>
                <span>
                    12346578@qq.com       
                </span>
                </li>
            </ul>
        </div> 

    )
  }
}



export default BrandInfo







