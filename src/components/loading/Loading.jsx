import React from 'react'
import PropTypes from 'prop-types'
import loading from './loading.gif'
import './index.styl'

export default class Loading extends React.Component {
  static defaultProps = {
    title: '正在加载...'
  }
  static propTypes = {
    title: PropTypes.string
  }
  render() {
    const { title } = this.props
    return (
      <div className="loading">
        <img src={loading} alt="加载中" width="24" height="24"/>
        <p className="desc">{title}</p>
      </div>
    )
  }
}