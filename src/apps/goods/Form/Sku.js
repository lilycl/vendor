import React from 'react';
import { 
  Row, Col, Button, Form, Card, Input, Icon, Select, Checkbox
} from 'antd'

import Uploader from 'components/Uploader'

// sku = {
//   // 数据列表
//   list: [
//     {
//       name: '尺寸',
//       values: [
//         { name: '100', pic: '' },
//         { name: '200' }
//       ]
//     },{
//       name: '颜色',
//       values: [
//         { name: '红' },
//         { name: '黑' }
//       ]
//     },{
//       name: '规格',
//       values: [
//         { name: '大' },
//         { name: '小' }
//       ]
//     }
//   ],
//   // 价格
//   prices: {
//     '0-0-0': 100,
//     '0-1-0': 200
//   },
//   //库存
//   stock: {
//     '0-0-0': 100,
//     '0-1-0': 200
//   },
//   // 商家编码
//   code: {
//     '0-0-0': 'AB111',
//     '0-1-0': 'AB222'
//   }
// }

const FormItem = Form.Item
const Option = Select.Option

class Sku extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      skudata: {
        list: [],
        // 价格
        prices: {},
        //库存
        stock: {},
        // 商家编码
        code: {}
      },

      showimg: false
    }
  }

  // 规格变化时
  onSizeChange($index, name) {
    const { skudata } = this.state
    skudata.list[$index].name = name
    this.setState({ skudata })
    this.callbackValues()
  }

  // 增加SKU规格
  onAddSku() {
    const { skudata } = this.state
    skudata.list.push({ name: '', values: [{name: ''}] })
    this.setState({ skudata })
    this.callbackValues()
  }

  // 删除SKU规格
  onRemoveSku($index) {
    const { skudata } = this.state
    skudata.list.splice($index, 1)
    this.setState({ skudata })
    this.callbackValues()
  }

  // 显示sku图片上传
  onShowImg() {
    this.setState({ showimg: !this.state.showimg })
    this.callbackValues()
  }

  // 添加SKU子选项
  onAddSkuChildren($index) {
    const { skudata } = this.state
    skudata.list[$index].values.push({name: ''})
    this.setState({ skudata })
    this.callbackValues()
  }

  // 删除SKU子选项
  onRemoveSkuChildren($index, $skuIndex) {
    const { skudata } = this.state
    skudata.list[$index].values.splice($skuIndex, 1)
    this.setState({ skudata })
    this.callbackValues()
  }

  // 设置SKU值
  onSkuChildrenValueChange($index, $skuIndex, e) {
    const { skudata } = this.state
    skudata.list[$index].values[$skuIndex].name = e.target.value
    this.setState({ skudata })
    this.callbackValues()
  }

  // 设置sku价格 库存 条形码
  onInputSkuValue(key, pos, e) {
    const { skudata } = this.state
    skudata[key][pos] = `${e.target.value}`
    this.setState({ skudata })
    this.callbackValues()
  }

  // 将结果SKU传递给外部组件
  callbackValues() {
    this.props.onChange &&
    this.props.onChange(this.state.skudata)
  }

  // 获取规格节点
  getSizeHtml() {
    const { skudata, showimg } = this.state
    const items = ['颜色', '尺寸', '重量']

    const title = (sku, $index) => (
      <div style={{width: 140}}>
        商品规格：
        <Select defaultValue={sku.name} onChange={this.onSizeChange.bind(this, $index)}>
          {items.map((item, $index) => {
            return (
              <Option key={$index} value={item} >
                {item}
              </Option>
            )
          })}
        </Select>&nbsp;&nbsp;&nbsp;&nbsp;
        {$index === 0 &&
         <Checkbox checked={showimg}
            onChange={this.onShowImg.bind(this)}
         >显示添加图片</Checkbox>
        }
      </div>
    )

    const panel = (sku, $index, $skuIndex) => {
      return (
        <div style={{display: 'inline-block', width: 100, position: 'relative', float: 'left', marginRight: 10}}>
          {$skuIndex > 0 &&
          <Icon 
            style={{position: 'absolute', right: -3, zIndex: 1, top: -3, cursor: 'pointer'}} 
            type="close-circle" 
            onClick={this.onRemoveSkuChildren.bind(this, $index, $skuIndex)}
          />}

          <Input 
            size='small' 
            onChange={this.onSkuChildrenValueChange.bind(this, $index, $skuIndex)} 
          />

          {$index === 0 && showimg && 
           <Uploader style={{marginTop: 10}} single />
          }
        </div>
      )
    }

    return skudata.list.map((sku, $index) => {
      return (
        <Card 
          title={title(sku, $index)} 
          extra={<Icon onClick={this.onRemoveSku.bind(this, $index)} 
          type="close" />} 
          style={{ marginBottom: 10 }}
        >
          {sku.values.map((value, $skuIndex) => {
            return panel(sku, $index, $skuIndex)
          })}
          <Button onClick={this.onAddSkuChildren.bind(this, $index)} type="primary" icon='plus' size='small'>添加</Button>
          <div style={{clear: 'both'}}></div>
        </Card>
      )
    })
  }

  // 获取SKU表格
  getSkuTable() {
    const { skudata: { list } } = this.state
    let skuitems = null

    switch(list.length) {
      case 1:
        skuitems = list[0].values.map((item, $index) => {
          return (
            <tr>
              <td>{item.name}</td>
              <td><Input onChange={this.onInputSkuValue.bind(this, 'prices', `${$index}`)} /></td>
              <td><Input onChange={this.onInputSkuValue.bind(this, 'stock', `${$index}`)} /></td>
              <td><Input onChange={this.onInputSkuValue.bind(this, 'code', `${$index}`)} /></td>
            </tr>
          )
        })
      break
      case 2:
        skuitems = list[0].values.map((item, $index) => {
          return list[1].values.map((child, $childIndex) => {
            return (
              <tr>
                {$childIndex === 0 && <td rowSpan={list[1].values.length}>{item.name}</td>}
                <td>{child.name}</td>
                <td><Input onChange={this.onInputSkuValue.bind(this, 'prices', `${$index}-${$childIndex}`)} /></td>
                <td><Input onChange={this.onInputSkuValue.bind(this, 'stock', `${$index}-${$childIndex}`)} /></td>
                <td><Input onChange={this.onInputSkuValue.bind(this, 'code', `${$index}-${$childIndex}`)} /></td>
              </tr>
            )
          })
        })
      break
      case 3:
        skuitems = list[0].values.map((item, $index) => {
          return list[1].values.map((child, $childIndex) => {
            return list[2].values.map((exchild, $exchildIndex) => {
              return (
                <tr>
                  {$childIndex === 0 && $exchildIndex === 0 && 
                   <td rowSpan={list[1].values.length * list[2].values.length}>{item.name}</td>
                  }
                  {$exchildIndex === 0 &&
                   <td rowSpan={list[2].values.length}>{child.name}</td>
                  }
                  <td>{exchild.name}</td>
                  <td><Input onChange={this.onInputSkuValue.bind(this, 'prices', `${$index}-${$childIndex}-${$exchildIndex}`)} /></td>
                  <td><Input onChange={this.onInputSkuValue.bind(this, 'stock', `${$index}-${$childIndex}-${$exchildIndex}`)} /></td>
                  <td><Input onChange={this.onInputSkuValue.bind(this, 'code', `${$index}-${$childIndex}-${$exchildIndex}`)} /></td>
                </tr>
              )
            })
          })
        })
      break
    }
    
    return list.length > 0 && list[0].values[0].name !== '' ? (
      <table cellSpacing="0" cellPadding="0" className="sku-table-wrap">
        <tr>
          {list.map(item => {
            return <td>{item.name}</td>
          })}
          <td>价格（元）</td>
          <td>库存</td>
          <td>条形码</td>
        </tr>
        {skuitems}
      </table>
    ) : null
  }

  render() {
    const { form: { getFieldDecorator }, formItemLayout } = this.props

    return (
      <Form {...this.props} horizontal>
        <Card style={{marginTop: 20}} title="库存／规格">
          {this.getSizeHtml()}

          {this.state.skudata.list.length < 3 &&
           <Button onClick={this.onAddSku.bind(this)} type='ghost'>添加规格项目</Button>
          }

          <div style={{marginTop: 10}}>
            SKU库存
            {this.getSkuTable()}
          </div>
        </Card>
      </Form>
    )
  }

}

export default Form.create()(Sku)