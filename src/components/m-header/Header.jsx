import React from 'react'
import { Link } from 'react-router-dom'
import './index.styl'
export default class MHeader extends React.Component {
  render() {
    return (
      <div className="m-header">
        <div className="icons"></div>
        <h1 className="text">React Music</h1>
        <Link className="mine" to="/user">
          <i className="icon-mine"></i>
        </Link>
      </div>
    )
  }
}