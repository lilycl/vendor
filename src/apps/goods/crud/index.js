import React from 'react'
import API from 'apis'

module.exports = {

  table: {
    schema: require('./schema'),
    
    // 请求配置
    ajax: {
      query: API.getGoodsList
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
          render: (record) => {
            if(record.itemStock > 1000){
              return <a>SKU</a>
            }
          },
          events: [
            {name: 'onClick', action: 'previewSku'}
          ]
        }
      ]
    }
  },

  // Filter面板配置
  filter: require('./filter')
}