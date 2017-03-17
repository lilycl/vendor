module.exports = {
  show: false,
  notShowSearch: true,
  schema: [
    {
      key: 'type',
      label: '类型',
      widget: 'Switch',
      ext: {
        items: [
          {
            key: 0,
            name: '男子'
          }, {
            key: 1,
            name: '女子'
          }, {
            key: 2,
            name: '男童'
          }, {
            key: 3,
            name: '女童'
          }
        ]
      }
    },
  ]
}









