module.exports = {
  show: false,
  notShowSearch: false,
  schema: [
    {
      key: 'catname',
      label: '选择类目',
      dataType: 'varchar',
      widget: 'Select',
      labelSize: 8,
      ext: {
        options: [
          {
            key: '0',
            value: '类目0'
          },
          {
            key: '1',
            value: '类目1'
          },
          {
            key: '2',
            value: '类目2'
          }
        ]
      }
    },{
      key: 'brandcnt',
      label: '创建时间段',
      dataType: 'datetime',
      widget: 'Input',
      labelSize: 8,
    },{
      key: 'category',
      label: '经营方式',
      dataType: 'varchar',
      widget: 'Radio',
      ext: {
        options: [
          {
            key: '0',
            value: '全部'
          },
          {
            key: '1',
            value: '品牌旗舰'
          },
          {
            key: '2',
            value: '品牌专卖'
          },

        ]
      }
    },{
      key: 'brandcnt',
      label: '商家名称',
      dataType: 'varchar',
      widget: 'Input',
      labelSize: 8,
    }

  ]
}









