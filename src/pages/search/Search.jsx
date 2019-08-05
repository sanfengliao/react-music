import React from 'react'
import wrapAnimation from '../../components/wrapper-animation/wrapperAnimation'
import SearchBox from '../../components/search-box/SearchBox'
import { getHotKey } from '../../api/search';
import { OK_CODE } from '../../config/index'

import './index.styl'
class Search extends React.Component {
  state={
    query: '',
    hotkey: []
  }
  searchBoxRef = React.createRef()
  componentDidMount() {
    this._getHotKey()
  }
  _getHotKey = async () => {
    let res = await getHotKey()
    if (res.code === OK_CODE) {
      this.setState({
        hotkey: res.data.hotkey.slice(0, 10)
      })
    }
  }
  addQuery = (query) => {
    this.searchBoxRef.setQuery(query)
  }
  render() {
    const { hotkey } = this.state
    console.log(hotkey)
    return (
      <div className="search">
        <div className="search-box-wrapper">
          <SearchBox ref={ ref => this.searchBoxRef = ref}/>
        </div>
        <div className="shortcut-wrapper">
          <div className="shortcut">
            <div className="hot-key">
              <h1 className="title">热门搜索</h1>
              <ul>
                {
                  hotkey.map((item, index) => (
                    <li onClick={() => this.addQuery(item.k)} className="item" key={index}>{item.k}</li>
                  ))
                }
              </ul>
            </div>
            <div className="search-history">
              <h1 className="title">
                <span className="text">搜索历史</span>
                <span className="clear">
                    <i className="icon-clear"></i>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default wrapAnimation(Search)