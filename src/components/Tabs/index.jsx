import React, { PropTypes } from 'react'

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

  onClick($index, item) {
    this.setState({
      active: $index
    })

    this.props.onItemClick && this.props.onItemClick($index, item)
  }

  render() {
    const { items } = this.props

    return (
      <ul className="gaosi-comp-tabs">
        {items.map((item, $index) => {
          return <li 
                   key={$index} 
                   className={$index === this.state.active ? 'active' : ''}
                   onClick={this.onClick.bind(this, $index, item)}
                  >
                    {item.name}
                  </li>
        })}
      </ul>
    )
  }
}