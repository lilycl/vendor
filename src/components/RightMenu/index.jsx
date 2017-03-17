import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

import './index.less'

const propTypes = {
  // 菜单项目
  items: PropTypes.array.isRequired,
  // 菜单是否打开
  open: PropTypes.bool,
  // 菜单弹出位置位置
  position: PropTypes.object,
  // 菜单关闭回调
  onMenuClose: PropTypes.func,
  // 菜单点击回调
  onMenuClick: PropTypes.func,
  // 菜单组件样式前缀
  prefixCls: PropTypes.string
}

export default class extends React.Component{
  constructor () {
    super()
  }

	propTypes: propTypes

  componentDidMount() {
    this.getContainer()

    // 监听关闭右键菜单选项
    document.body.addEventListener('click', () => {
      this.props.onMenuClose && this.props.onMenuClose()
    }, false)

    window.__right_menu_click__ = this.onMenuClick.bind(this)
  }

  componentWillUnmount() {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
      document.body.removeChild(this.container);
      this.container = null;
    }
  }

  getContainer() {
    const { items, prefixCls = 'gaosi-rightmenu' } = this.props

    if (!this.container) {
      this.container = document.createElement('div')
      this.container.setAttribute('class', prefixCls)
      document.body.appendChild(this.container)
    }

    this.container.innerHTML = items.map((item, $index) => {
      return `<a onclick="__right_menu_click__(${$index})" key="${item.key}">${item.name}</a>`
    }).join('')
    
    return this.container
  }

  onMenuClick($index) {
    const { items, onMenuClick } = this.props
    
    window.event.preventDefault()
    window.event.stopPropagation()

    onMenuClick && onMenuClick(items[$index])
  }

  render () {
    const { open, position, items } = this.props

    this._items = items

    this.getContainer().setAttribute('style', 
      `display:${open ? 'block' : 'none'};left: ${position.left};top: ${position.top}`
    )

    return (
      <div></div>
    )
  }
}