import React from 'react'
import PropTypes from 'prop-types'

import './index.styl'

export default class ProgressCircle extends React.Component {
  constructor(props) {
    super(props)
    this.dashArray = Math.PI * 100
  }
  static defaultProps = {
    radius: 32,
    percent: 0
  }
  static propTypes = {
    radius: PropTypes.number,
    percent: PropTypes.number
  }
  render() {
    const { radius, percent } = this.props
    let dashOffset = (1 - percent) * this.dashArray
    return (
      <div className="progress-circle">
        <div class="progress-circle">
          <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
              <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" stroke-dasharray={this.dashArray}stroke-dashoffset={dashOffset} />
          </svg>
          {this.props.children}
        </div>
      </div>
    )
  }
}