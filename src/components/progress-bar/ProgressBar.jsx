import React from 'react'
import PropTypes from 'prop-types'

import './index.styl'

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props)
    this.progressBarRef = React.createRef()
    this.progressRef = React.createRef()
    this.btnRef = React.createRef()
    this.touch = {}
  }
  static defaultProps = {
    percent: 0
  }
  static propTypes = {
    onPercentChange: PropTypes.func,
    percent: PropTypes.number
  }
  progressBarClick = (e) => {
    const react = this.progressBarRef.current.getBoundingClientRect()
    const offsetWidth = e.pageX - react.left
    this._offset(offsetWidth)
  }
  onTouchStart = (e) => {
    
  }
  onTouchMove = (e) => {

  }
  onTouchEnd = (e) => {

  }
  _offset = (offsetWidth) => {
    this.progressRef.current.style.width = offsetWidth + 'px'
    this.btnRef.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
  }
  render() {
    return (
      <div className="progress-bar" ref={this.progressBarRef} onClick={this.progressBarClick}>
        <div className="bar-inner">
          <div className="progress" ref={this.progressRef}></div>
          <div className="progress-btn-wrapper" ref={this.btnRef}
            onTouchStart={this.onTouchStart}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.onTouchEnd}
          >
            <div className="progress-btn"></div>
          </div>
        </div>
      </div>
    )
  }
}