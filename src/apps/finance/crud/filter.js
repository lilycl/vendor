module.exports = {
  show: false,
  notShowSearch: false,
  position: 'left',
  schema: [
    {
      key: 'brandname',
      label: '消息类型',
      dataType: 'varchar',
      widget: 'Select',
      labelSize: 8,
      ext: {
        options: [
          {
            key: '0',
            value: '全部'
          }
        ]
      }
    },{
      key: 'brandcnt',
      label: '消息内容',
      dataType: 'varchar',
      widget: 'Input',
      labelSize: 8,
    }

  ]
}









