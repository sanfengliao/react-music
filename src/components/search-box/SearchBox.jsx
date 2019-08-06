import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from '../../common/js/utils';

import './index.styl'

export default class SearchBox extends React.PureComponent {
  static defaultProps = {
    placeholder: '请输入歌手、歌曲'
  }
  static propTypes ={
    onQueryChange: PropTypes.func,
    placeholder: PropTypes.string,
  }
  state = {
    query: ''
  }
  onChange = (e) => {
    this.setState({
      query: e.target.value
    })
    this.props.onQueryChange && this.props.onQueryChange(e.target.value)
  }
  inputRef = React.createRef()
  clear = () => {
    this.setState({
      query: ''
    })
    this.props.onQueryChange && this.props.onQueryChange('')
  }
  setQuery = (query) => {
    this.setState({
      query
    })
    this.props.onQueryChange && this.props.onQueryChange(query)
  }
  blur = () => {
    this.inputRef.blur()
  }
  render() {
    return (
      <div className="search-box">
        <i className="icon-search"></i>
        <input ref={ref => this.inputRef = ref} className="box" onChange={this.onChange} value={this.state.query} placeholder={this.props.placeholder} />
        {
          this.state.query && <i onClick={this.clear} className="icon-dismiss"></i>
        }
      </div>
    )
  }
}