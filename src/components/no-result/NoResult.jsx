import React from 'react'
import PropTypes from 'prop-types'

import './index.styl'

export default class NoResult extends React.Component {
  static defaultProps = {
    title: '这里什么都没有'
  }
  static propTypes = {
    title: PropTypes.string
  }
  render() {
    return (
      <div className="no-result">
        <div className="no-result-icon"></div>
        <p className="no-result-text">{this.props.title}</p>
      </div>
    )
  }
}