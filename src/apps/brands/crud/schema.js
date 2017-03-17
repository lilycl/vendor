import moment from 'moment'
import React from 'react';
module.exports = [
  {
    key: 'brandId',
    label: '商品ID',
    dataType: 'int',
    primary: true,
    notShow: false,
    showFilter: false,
    showEdit:true
  },{
    key: 'brandName',
    label: '品牌名称',
    showAdd:true,
    showEdit:true,
    notShow: true,
    widget: 'Input',
    rules: [
      { required: true, message: '请选择品牌名称', type: 'string' },
    ],
  },{
    key: 'brandLogo',
    label: '品牌Logo/中／英文名',
    widget: 'Image',
    showAdd:true,
    showEdit:true,
    render: function(record) {
      return <img src={record} style={{ width: '120px' }}/>
    },
  },{
    key: 'regState',
    label: '品牌注册国家',
    dataType: 'varchar',
    showAdd:true,
    showEdit:true,
    widget: 'SelectSearch',
    ext: {
      options: window.countrydata
    },
    rules: [
      { required: true, message: '请选择品牌注册国家', type: 'string' },
    ],
  }, {
    key: 'mainInd',
    label: '经营大类',
    dataType: 'varchar',
    showAdd:true,
    showEdit:true,
    widget: 'Select',
    ext: {
      options: [
        {key: '0', value: '商品'},
        {key: '1', value: '普通'}
      ]
    },
    rules: [
      { required: true, message: '请选择经营大类', type: 'string' },
    ],
  }, {
    key: 'itemNum',
    label: '商品数',
    showAdd:true,
    showEdit:true,
    dataType: 'int',
    rules: [
      { required: true, message: '请输入商品数', type: 'number' },
    ],
  }, {
    key: 'vendorNum',
    label: '商家数',
    showAdd:true,
    showEdit:true,
    dataType: 'int',
    rules: [
      { required: true, message: '请输入商家数', type: 'number' },
    ],
  }, {
    key: 'created',
    label: '录入时间',
    dataType: 'datetime',
    showEdit:true,
    showAdd:true,
    render: function(record) {
      return moment(record).format('YYYY-MM-DD')
    }
  },{
    key: 'tmarkType',
    label: '商标类型',
    showAdd:true,
    showEdit:true,
    widget: 'Select',
    ext: {
      options: [
        {key: 0, value: '商品'},
        {key: 1, value: '普通'}
      ]
    },
  },{
    key: 'site',
    label: '品牌官网',
    showAdd:true,
    showEdit:true,
    notShow: true,
    widget: 'Input',
  },{
    key: 'link',
    label: '百度词条链接',
    showAdd:true,
    showEdit:true,
    notShow: true,
    widget: 'Input',
  }
]