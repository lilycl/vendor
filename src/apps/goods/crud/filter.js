
module.exports = {
  show: false,
  notShowSearch: true,
  position: 'left',
  schema: [
    {
      key: 'type',
      label: '类型',
      widget: 'Switch',
      ext: {
        items: [
          {
            key: 0,
            name: '全部'
          }, {
            key: 1,
            name: '上架'
          }, {
            key: 2,
            name: '下架'
          }
        ]
      }
    },{
      key: 'category',
      label: '选择类目',
      dataType: 'varchar',
      widget: 'Select',
      ext: {
        options: [
          {
            key: '0',
            value: '全部'
          }
        ]
      }
    }
  ]
}