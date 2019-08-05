import React from 'react'
import PropTypes from 'prop-types'

import './index.styl'

export default class Switch extends React.Component {
  state = {
    currentIndex: 0
  }
  static defaultProps = {
    switches: []
  }
  static propTypes = {
    switches: PropTypes.array,
    switchItem: PropTypes.func
  }
  switchItem = (index, e) => {
    this.setState({
      currentIndex: index
    })
    this.props.switchItem && this.props.switchItem(index)
    e.stopPropagation()
  }
  render() {
    const { switches } = this.props
    const { currentIndex } = this.state
    return (
      <ul className="switches">
        {
          switches.map((item, index) => (
            <li className={currentIndex === index ? 'switch-item active' : 'switch-item'} key={index} onClick={(e) => this.switchItem(index, e)}>{item.name}</li>
          ))
        }
      </ul>
    )
  }
}

