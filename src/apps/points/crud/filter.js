module.exports = {
  show: false,
  notShowSearch: false,
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
            name: '待财务审核'
          }, {
            key: 2,
            name: '财务已通过'
          }, {
            key: 3,
            name: '财务已驳回'
          }
        ]
      }
    },
    {
      key: 'name',
      label: '商家名称',
      dataType: 'varchar',
      widget: 'Input',

      labelSize: 8,
      
      ext: {
        size:24,
        options: [
          {
            key: '0',
            value: '全部'
          }
        ]
      }
    },
    {
      key: 'type',
      label: '违规类型',
      dataType: 'varchar',
      widget: 'Select',
      labelSize: 8,
      ext: {
        options: [
          {
            key: '0',
            value: '全部'
          },{
            key: '1',
            value: 'yi'
          }
        ]
      }
    },{
      key: 'typepart',
      label: '违规模块',
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
      key: 'typereason',
      label: '违规原因',
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
      key: 'reduce',
      label: '扣分',
      dataType: 'number',
      widget: 'Input',
      labelSize: 8,
      ext: {
        options: [
          {
            key: '0'
          },
          {
            key: '2'
          }
        ]
      }
    }
    ,{
      key: 'reducemoney',
      label: '扣保证金',
      dataType: 'number',
      widget: 'Input',
      labelSize: 8,
      ext: {
        options: [
          {
            key: '0'
          }
        ]
      }
    }
  ]
}









