import moment from 'moment'

module.exports = [
  {
    key: 'id',
    label: '商品ID',
    dataType: 'int',
    primary: true,
    notShow: true,
    showFilter: false
  }, {
    key: 'title',
    label: '商品信息',
    dataType: 'varchar'
  }, {
    key: 'brandName',
    label: '品牌名称',
    dataType: 'varchar'
  }, {
    key: 'itemStock',
    label: '库存',
    dataType: 'int'
  }, {
    key: 'created',
    label: '创建时间',
    dataType: 'dateTime',
    render: function(record) {
      return moment(record).format('YYYY-MM-DD')
    }
  }, {
    key: 'modified',
    label: '最近修改时间',
    dataType: 'dateTime',
    render: function(record) {
      return moment(record).format('YYYY-MM-DD')
    }
  }, {
    key: 'itemStatus',
    label: '状态'
  }, {
    key: 'vendorName',
    label: '商家',
    dataType: 'varchar'
  }
]