module.exports = [
  {
    key: 'id', 
    label: '交易ID',
    dataType: 'int',
    primary: true,
    notShow: true,
    form: {
      showFilter: false,
      
    }
  },

  {
    key: 'time',
    label: '交易时间',
    dataType: 'dateTime',
    form: {
      showFilter:false,
      ext: {
        
      }
    }
  },

  {
    key: 'title',
    label: '商品信息',
    dataType: 'varchar',
    form: {
      ext: {
        
      }
    }
  },

  {
    key: 'vendorName',
    label: '商家',
    dataType: 'varchar',
    form: {
      ext: {
        options: []
      }
    }
  },
  {
    key: 'cat',
    label: '类目',
    dataType: 'varchar',
    form: {
      ext: {
        options: []
      }
    }
  },
    {
    key: 'itemNum',
    label: '数量',
    dataType: 'int',
    form: {
      ext: {
        options: []
      }
    }
  },
    {
    key: 'price',
    label: '价格',
    dataType: 'float',
    form: {
      ext: {
        options: []
      }
    }
  }
]