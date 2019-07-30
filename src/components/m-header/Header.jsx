import React from 'react'
import { } from 'react-router-dom'
import './index.styl'
export default class MHeader extends React.Component {
  render() {
    return (<div class="m-header">
      <div class="icon"></div>
      <h1>React Music</h1>
      <a class="mine">
        <i class="icon-mime"></i>
      </a>
    </div>
    )
  }
}