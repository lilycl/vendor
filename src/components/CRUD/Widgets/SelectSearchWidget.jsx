import React from 'react'
import BaseWidget from './Widget'
import { Select, Row, Col } from 'antd'
const Option = Select.Option

let timeout;
let currentValue;

@BaseWidget
class SelectSearch extends React.Component {
  constructor (props) {
    super(props)
    const { field } = props

    this.state = {
      options: field && field.ext ? field.ext.options : [],
      multiple: field && field.ext && !!field.ext.multiple,
    }
  }

  getScheduleList(value, callback) {
    const { field } = this.props
    
    if(!field.ext.combobox) return false;

    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    
    const { ajax:{query} ,fixed } = field.ext
    const tmpObj = Object.assign({},fixed,{ [field.ext.key] : value || ''})
    
    const getOptionList = () => {
      query(tmpObj).then(res => {
        if(res.data.body.list) {
          const list = res.data.body.list.map((item,index)=>{
            return {
              key: item.id + '',
              value: item.name || item[field.ext.key]
            }
          })
          callback(list)
        } else {
          callback([])
        }
      })
    }

    timeout = setTimeout(getOptionList, 300);
  }

  handleChange(value) {
    const { field, setFieldsValue } = this.props
    //debugger;
    if(value === undefined) {
      this.handleSelect(undefined)
    }

    this.getScheduleList(value, (options) => {
      this.setState({ options })
    })

  }

  handleSelect(value) {
    const { field, setFieldsValue } = this.props
    
    setFieldsValue({
      [field.key]: value
    })
  }
  
  render () {
    const { field, colWrapper, getFieldDecorator } = this.props
    const { options, multiple } = this.state

    const SearchInput = (
      <Row>
        {getFieldDecorator(field.key, Object.assign({rules: field.rules}, options))(<div></div>)}
        <Select
          multiple={multiple}
          combobox={field.ext.combobox || false }
          placeholder={field.placeholder || '请选择'}
          notFoundContent={field.ext.notFoundContent || 'not found'}
          allowClear={field.ext.allowClear || true}
          style={this.props.style || null}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSelect={this.handleSelect.bind(this)}
          onChange={this.handleChange.bind(this)}
          optionLabelProp='children'
        >
          {
            options.map(o => {
              return (
                <Option
                  key={o.key}
                  value={o.key}
                >
                  {o.value}
                </Option>
              )
            })
          }
        </Select>
      </Row>
    )

    return colWrapper(SearchInput,true)
  }
}

SelectSearch.defaultProps = {

} 

export default SelectSearch

function noop(value, option){}