import React from 'react'
import { Radio } from 'antd'
import BaseWidget from './Widget'

/**
 * between类型比较特殊, 普通元素每个宽度是8, int和float的between元素宽度也是8, 但datetime类型的between元素宽度是16
 * 否则排版出来不能对齐, 太丑了, 逼死强迫症
 * 而且普通的transform函数返回是一个object, 而这个函数返回是一个array, 就是因为datetime的between要占用两列
 *
 * @param field
 */
@BaseWidget
export default class extends React.Component {
  constructor () {
    super()
  }

  render () {
    const { field } = this.props
    const cols = [];

    let beginFormItem;
    let endFormItem;

    switch (field.dataType) {
      case 'int':
        beginFormItem = (<InputNumber size="default"
                                      placeholder={field.placeholderBegin || '最小值'} />);
        endFormItem = (<InputNumber size="default"
                                    placeholder={field.placeholderEnd || '最大值'} />);
        cols.push(this.betweenColWrapper(beginFormItem, endFormItem, field));
        break;
      case 'float':
        beginFormItem = (<InputNumber step={0.01} size="default"
                                      placeholder={field.placeholderBegin || '最小值'} />);
        endFormItem = (<InputNumber step={0.01} size="default"
                                    placeholder={field.placeholderEnd || '最大值'} />);
        cols.push(this.betweenColWrapper(beginFormItem, endFormItem, field));
        break;
      // datetime类型的between要占用两个Col
      // 不写辅助函数了, 直接这里写jsx吧...
      case 'datetime':
        cols.push(
          <Col key={`${field.key}Begin`} sm={8}>
            <FormItem key={`${field.key}Begin`} label={field.title} labelCol={{ span: 10 }} wrapperCol={{ span:14 }}>
              <DatePicker showTime format="yyyy-MM-dd HH:mm:ss"
                placeholder={field.placeholderBegin || '开始日期'} />
            </FormItem>
          </Col>
        );
        cols.push(<Col key={`${field.key}End`} sm={8}>
          <FormItem key={`${field.key}End`} labelCol={{ span: 10 }} wrapperCol={{ span:14 }}>
            <DatePicker showTime format="yyyy-MM-dd HH:mm:ss"
                placeholder={field.placeholderEnd || '结束日期'} />
          </FormItem>
        </Col>);
        break;
    }
    return cols;
  }
}