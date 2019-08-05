import React from 'react'
import { CSSTransition } from 'react-transition-group'

import './index.styl'
function wrapAnimation(Component) {
  return class extends React.Component{
    render() {
      return (
        <CSSTransition
          in={this.props.match !== null}
          classNames="slide"
          timeout={300}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <Component {...this.props}/>
        </CSSTransition>
      )
    }
  }
}

export default wrapAnimation