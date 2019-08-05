import React from 'react'
import PropTypes from 'prop-types'

import './index.styl'

const BTN_WIDTH = 16 // 按钮的大小

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
    this.touch.initial = true
    this.touch.startX = e.touches[0].pageX
    this.touch.left = this.progressRef.current.clientWidth
  }
  onTouchMove = (e) => {
    const deltaX = e.touches[0].pageX - this.touch.startX
    const offsetWidth = Math.min(this.progressBarRef.current.clientWidth - BTN_WIDTH, Math.max(0, deltaX + this.touch.left))
    this._offset(offsetWidth)
  }
  onTouchEnd = (e) => {
    this.touch.inital = false
  }
  _offset = (offsetWidth) => {
    this.progressRef.current.style.width = offsetWidth + 'px'
    this.btnRef.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
  }
  _trigerParent() {
    const barWidth = this.progressBarRef.current.clientWidth - BTN_WIDTH
    const percent = this.progressRef.current.clientWidth / barWidth
    this.props.onPercentChange && this.props.onPercentChange(percent)
  }

  componentDidUpdate() {
    let percent = this.props.percent
    if (percent > 0 && !this.touch.inital) {
      const barWidth = this.progressBarRef.current.clientWidth - BTN_WIDTH
      const offset = barWidth * percent
      this.offset(offset)
    }
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