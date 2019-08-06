import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

import './index.styl'

function UlCom(props) {
  return (
    <ul>{props.children}</ul>
  )
}

export default class SearchList extends React.Component {
  static defaultProps = {
    searches: []
  }
  static propTypes = {
    searches: PropTypes.array,
    onSelectItem: PropTypes.func,
    onDeleteItem: PropTypes.func
  }
  onSelectItem = (item, e) => {
    e.stopPropagation()
    this.props.onSelectItem && this.props.onSelectItem(item)
  }

  onDeleteItem = (item, e) => {
    e.stopPropagation()
    this.props.onDeleteItem && this.props.onDeleteItem(item)
  }

  render() {
    const { searches } = this.props
    return (
      <div className="search-list" v-show="searches.length">
        <TransitionGroup component={UlCom}>
            {
              searches.map((item, index) => (
                <CSSTransition  key={item} classNames='search-list' timeout={300}>
                  <li className="search-item" onClick={(e) => this.onSelectItem(item, e)}>
                    <span className="text">{item}</span>
                    <span className="icon" onClick={(e) => this.onDeleteItem(item, e)}>
                      <i className="icon-delete"></i>
                    </span>
                  </li>
                </CSSTransition>
              ))
            }  
        </TransitionGroup>
      </div>
    )
  }
}