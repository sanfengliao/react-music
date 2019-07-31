import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import './index.styl'

export default class Tab extends Component {
  render() {
    return (
      <div className="tab">
        <NavLink className="tab-item" to="/recommend">
          <span className="tab-link">推荐</span>
        </NavLink>
        <NavLink className="tab-item" to="/singer">
          <span className="tab-link">歌手</span>
        </NavLink>
        <NavLink className="tab-item" to="/rank">
          <span className="tab-link">榜单</span>
        </NavLink>
        <NavLink className="tab-item" to="/search">
          <span className="tab-link">搜索</span>
        </NavLink>
      </div>
    )
  }
}