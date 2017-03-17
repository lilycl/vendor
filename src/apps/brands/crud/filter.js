module.exports = {
  show: false,
  notShowSearch: false,
  schema: [
    {
      key: 'brandname',
      label: '选择类目',
      dataType: 'varchar',
      widget: 'Switch',
      labelSize: 10,
      ext: {
        items: [
          {
            key: '0',
            name: '全部'
          }
        ]
      }
    },{
      key: 'brandtime',
      label: '录入时间段',
      dataType: 'datetime',
      widget: 'Input',
    },{
      key: 'search',
      label: '输入搜索条件',
      labelSize: 8,
      dataType: 'varchar',
      widget: 'Input'
    }
  ]
}









