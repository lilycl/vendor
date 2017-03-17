import React, { PropTypes } from 'react'
import classNames from 'classnames';

import './index.less'

/**
 * tab切换组件
 */
const propTypes = {
  // 传入的项目
  items: PropTypes.array,
  // 项目被点击时
  onItemClick: PropTypes.func
}

export default class extends React.Component {
  propTypes: propTypes
  
  constructor (props) {
    super(props)

    this.state = {
      active: props.defaultActive || 0
    }
  }

  onClick($index, key, item) {
    this.setState({
      active: $index
    })

    this.props.onItemClick && this.props.onItemClick($index, key, item)
  }

  render() {
    const { config, prefixCls } = this.props

    return (
      <ul className={classNames('gaosi-comp-itemselect', prefixCls ? 'gaosi-comp-itemselect-' + prefixCls : '')}>
        {config.items.map((item, $index) => {
          return <li 
                   key={$index} 
                   className={$index === this.state.active ? 'active' : ''}
                   onClick={this.onClick.bind(this, $index, config.key, item)}
                  >
                    {item.name}
                  </li>
        })}
      </ul>
    )
  }
}