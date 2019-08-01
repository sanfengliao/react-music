import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import "./index.styl"

export default class extends React.Component {
  static defaultProps = {
    text: '',
    okText: '确认',
    cancelText: '取消',
    visible: false
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    visible: PropTypes.bool.isRequired
  }
  onOk = (e) => {
    this.props.onOk && this.props.onOk()
    e.stopPropagation()
  }
  onCancel = (e) => {
    this.props.onCancel && this.props.onCancel()
    e.stopPropagation()
  }
  render() {
    const { visible, okText, cancelText, text } = this.props
    return (
      <CSSTransition in={visible} timeout={200} classNames="confirm-fade" unmountOnExit>
        <div className="confirm">
          <div className="confirm-wrapper">
            <div className="confirm-content">
              <p className="text">{text}</p>
              <div className="operate">
                <div onClick={this.onOk} className="operate-btn left">{okText}</div>
                <div onClick={this.onCancel} className="operate-btn">{cancelText}</div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    )
  }
}