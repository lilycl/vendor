import React from 'react'
import API from 'apis'

module.exports = {

  table: {
    schema: require('./schema'),
    
    // 请求配置
    ajax: {
      query: API.brand.get,
      add: API.brand.save,//post
      edit: API.brand.update,//put
      delete: API.brand.delete,//delete
    },

    // 是否显示checkbox
    rowSelection: false,

    // 按钮整体配置
    buttons: {
      add: { show: true},
      edit: { show: true },
      delete: { show: true },
      width: 90,
      actions: [
        {
          render: (record) => {
            return <a>查看品牌信息</a>
          },
          style: {display: 'block'},
          events: [
            {name: 'onClick', action: 'previewSku'}
          ]
        },
        {
          style: {display: 'block'},
          render: (record) => {
            return <a>查看售卖店铺</a>
          },
          events: [
            {name: 'onClick', action: 'preview'}
          ]
        }
      ]
    }
  },

  // Filter面板配置
  filter: require('./filter')
}