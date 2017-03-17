import React from 'react';
import CRUD from 'components/CRUD';
import crudConfig from '../crud';
import { Tabs, Modal, Button,abs, Card, Col, Row, Checkbox,Input } from 'antd';
const Filter = CRUD.Filter
const Table = CRUD.Table
const Pagination = CRUD.Pagination
class SaleTable extends React.Component {
  render() {
    return (
      <CRUD>
        <Table 
        
          {...crudConfig.table} 
        />
      </CRUD>

    )
  }
}



export default SaleTable







