module.exports = [
   {
    key: 'id',
    label: '商品ID',
    dataType: 'int',
    primary: true,
    notShow: false,
    showFilter: false,
    showEdit:true
  },{
    key: 'vendorid',
    label: '消息类型',
    dataType: 'number',
    widget: 'Radio',
    ext: {
        options: [
          {
            key: '0',
            value: '通知消息'
          },{
            key: '1',
            value: '促销优惠'
          }
        ]
      },
    showAdd:true,
  }, {
    key: 'vendorname',
    label: '消息标题',
    dataType: 'varchar',
    showAdd:true,
  }, {
    key: 'vendorname',
    label: '商家简介',
    dataType: 'varchar',
    showAdd:true,
  }, {
    key: 'vendorna',
    label: '消息链接',
    dataType: 'varchar',
    showAdd:true,
  },{
    key: 'vendord',
    label: '接收人',
    widget: 'Checkbox',
    ext: {
        options: [
          {
            key: '0',
            value: '全部商家'
          },{
            key: '1',
            value: '全部买家'
          }
        ]
      },
    showAdd:true,
  },{
    key: 'ss',
    label: '发送时间',
    widget: 'Radio',
    ext: {
        options: [
          {
            key: '0',
            value: '立即发送'
          },{
            key: '1',
            value: '定时发送'
          }
        ]
      },
    showAdd:true,
  }, {
    key: 'type',
    label: '消息内容',
    dataType: 'varchar'
  }, {
    key: 'typepart',
    label: '消息状态',
    dataType: 'int'
  }, {
    key: 'typereason',
    label: '操作人',
    dataType: 'dateTime',
  }, {
    key: 'reduce',
    label: '最近操作时间',
    dataType: 'name'
  }
]