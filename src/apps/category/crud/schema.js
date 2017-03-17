import moment from 'moment'
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
    key: 'brandLogo',
    label: '品牌Logo/中／英文名',
    dataType: 'number',
    showAdd:true,
  },{
    key: 'regState',
    label: '品牌注册国家',
    dataType: 'varchar',
    showAdd:true,
  }, {
    key: 'mainInd',
    label: '经营大类',
    dataType: 'varchar',
    showAdd:true,
  }, {
    key: 'itemNum',
    label: '商品数',
    dataType: 'int'
  }, {
    key: 'vendorNum',
    label: '商家数',
    dataType: 'dateTime',
  }, {
    key: 'created',
    label: '录入时间',
    dataType: 'name',
     showAdd:true,
    render: function(record) {
      return moment(record).format('YYYY-MM-DD')
    }
  },{
    key: 'tmarkType',
    label: '商标类型',
    dataType: 'name',
    showAdd:true,
    render: (record) => {
        if(record.tmarkType == 1){
          return <a>直营</a>
        }
      },
  }
]