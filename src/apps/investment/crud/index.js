import API from 'apis'

module.exports = {

  table: {
    schema: require('./schema'),
    
    // 请求配置
    ajax: {
      query: function() {return {then: function(done){done({data: {body: {list: [
        {title: '测试一'}
      ]}}})}}}
    },

    // 是否显示checkbox
    rowSelection: false,

    // 按钮整体配置
    buttons: {
      add: { show: false},
      edit: { show: false },
      delete: { show: false },
      actions: [
        {
          render: '查看',
          style: {display: 'block'},
          events: [
            {name: 'onClick', action: 'vendorInfo'}
          ]
        },
      ]
    }
  },
  table1: {
    schema: require('./schema'),
    
    // 请求配置
    ajax: {
      query: function() {return {then: function(done){done({data: {body: {list: [
        {title: '测试一'}
      ]}}})}}}
    },

    // 是否显示checkbox
    rowSelection: false,

    // 按钮整体配置
    buttons: {
      add: { show: false},
      edit: { show: false },
      delete: { show: false },
      actions: [
        {
          render: '查看',
          style: {display: 'block'},
          events: [
            {name: 'onClick', action: 'preview'}
          ]
        },
         {
          render: '审核',
          style: {display: 'block'},
          events: [
            {name: 'onClick', action: 'preview'}
          ]
        },
      ]
    }
  },
   table2: {
    schema: require('./schema'),
    
    // 请求配置
    ajax: {
      query: function() {return {then: function(done){done({data: {body: {list: [
        {title: '测试一'}
      ]}}})}}}
    },

    // 是否显示checkbox
    rowSelection: false,

    // 按钮整体配置
    buttons: {
      add: { show: false},
      edit: { show: false },
      delete: { show: false },
      actions: [
        {
          render: '查看',
          style: {display: 'block'},
          events: [
            {name: 'onClick', action: 'preview'}
          ]
        },
         {
          render: '违规下线',
          style: {display: 'block'},
          events: [
            {name: 'onClick', action: 'violation'}
          ]
        },
      ]
    }
  },

  // Filter面板配置
  filter: require('./filter')
}