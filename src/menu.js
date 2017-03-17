/**
 * 定义sidebar中的菜单项
 *
 * 一些约定:
 * 1.菜单最多3层;
 * 2.只有顶层的菜单可以带图标;
 * 3.只有"叶子"节点才能跳转;
 * 4.所有的key都不能重复;
 */
const menus = [
  {
    key: 'index',  // route时url中的值
    name: '概况',  // 在菜单中显示的名称
    icon: 'smile',  // 只有顶层菜单可以带图标
  },
  {
    key: 'investment',
    name: '招商',
    icon: 'pay-circle',
  },
  {
    key: 'goods',
    name: '商品',
    icon: 'appstore',
  },
  {
    key: 'category',
    name: '类目',
    icon: 'appstore',
  },
  {
    key: 'brand',
    name: '品牌',
    icon: 'appstore',
  },
  {
    key: 'transaction',
    name: '交易',
    icon: 'pay-circle-o',
  },
  {
    key: 'customer',
    name: '客服',
    icon: 'customer-service',
  },
  {
    key: 'data',
    name: '数据',
    icon: 'inbox',
  },
  {
    key: 'message',
    name: '消息',
    icon: 'message',
  },
  {
    key: 'setting',
    name: '设置',
    icon: 'appstore',
  },
  {
    key: 'points',
    name: '积分',
    icon: 'star',
  },
];

if(true) {
  menus.push({
    key: 'finance',
    name: '财务',
    icon: 'appstore',
  })
}

module.exports = menus