module.exports = [
  {
    key: 'vendorId', 
    label: '商家id',
    dataType: 'int',
    primary: true,
    notShow:true,
    form: {
      widget: 'Input',
      ext: {
        options: []
      }
    }
  },
  {
    key: 'vendorType', 
    label: '类型',
    dataType: 'int',
    notShow:true,
    form: {
      showFilter: true,
      size: 24, // 一行24格 8为1/3
      widget: 'Switch',
      ext: {
        items: [{key: 0, name: '全部'}, {key: 1, name: '待审核'}, {key: 2, name: '审核通过'}, {key: 3, name: '审核不通过'}]
      }
    }
  },

  {
    key: 'vendorName',
    label: '商家名称',
    dataType: 'varchar',
    form: {
      contentSize: 6,
      showFilter: true,
      showAdd: true,
      showEdit: false
    }
  },
  {
    key: 'brandName',
    label: '品牌',
    dataType: 'varchar',
    form: {
      showAdd: false,
      showEdit: false,
    }
  },
  {
    key: 'operMode',
    label: '经营方式',
    dataType: 'varchar',
    form: {
      widget:'Radio',
      showFilter : true,
      ext: {
        options: [{key: 0, value: '全部'}, {key: 1, value: '品牌旗舰'},{key:2,value:'品牌专卖'}]
      }
    }
  },
  {
    key: 'cids',
    label: '一级类目',
    dataType: 'varchar',
    form: {
      //TODO 类目
    }
  },
  {
    key: 'vendorStatus',
    label: '状态',
    dataType: 'varchar',
    render: (text, record) => {
      if(text === '0') {
        return '待审核'
      } else if(text === '1') {
        return '审核通过'
      } else {
        return '审核不通过'
      }
    },
    form: {
    }
  },
  {
    key: 'itemNum',
    label: '商品数',
    dataType: 'int',
    form: {
    }
  },
  {
    key: 'created',
    label: '创建时间',
    dataType: 'dateTime',
    form: {
      widget : 'Between',//TODO 时间的选择框
    }
  }
]