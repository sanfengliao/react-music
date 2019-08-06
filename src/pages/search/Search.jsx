import React from 'react'
import { Route } from 'react-router-dom'
import SingerDetail from '../singer-detail/SingerDetail'
import wrapAnimation from '../../components/wrapper-animation/wrapperAnimation'
import SearchBox from '../../components/search-box/SearchBox'
import SearchList from '../../components/search-list/SearchList'
import Scroll from '../../components/scroll/Scroll'
import Suggest from '../../components/suggest/Suggest'
import { getHotKey } from '../../api/search';
import { OK_CODE } from '../../config/index'
import { connect } from 'react-redux'
import { saveSearchHistory, deleteSearchHistory, clearSearchHistory } from '../../store/actions'
import Confirm from '../../components/confirm/Comfirm'

import './index.styl'
class Search extends React.Component {
  state={
    query: '',
    hotkey: [],
    visible: false
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

  onQueryChange = (query) => {
    this.setState({
      query: query
    })
  }

  clearHistory = () => {
    this.setState({
      visible: true
    })
  }

  onOk = () => {
    this.setState({
      visible: false
    })
    this.props.clearSearchHistory()
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  onBeforeScrollStart = () => {
    this.searchBoxRef.blur()
  }

  render() {
    const { hotkey, query, visible } = this.state
    const { searchHistory } = this.props
    const shortcut = hotkey.concat(searchHistory)
    return (
      <div className="search">
        <div className="search-box-wrapper">
          <SearchBox ref={ ref => this.searchBoxRef = ref} onQueryChange={this.onQueryChange}/>
        </div>
        <div className="shortcut-wrapper">
          <div className="shortcut">
            <Scroll data={shortcut}>
              <div>
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
                    <span className="clear" onClick={this.clearHistory}>
                        <i className="icon-clear"></i>
                    </span>
                  </h1>
                  <SearchList searches={searchHistory} onSeleteItem={this.addQuery} onDeleteItem={this.props.deleteSearchHistory}/>
                </div>
              </div>
            </Scroll>
          </div>
        </div>
        <div className="search-result" style={{display: query.length ? 'block': 'none'}}>
          <Suggest query={query} onSeleteItem={this.props.saveSearchHistory} onBeforeScrollStart={this.onBeforeScrollStart}/>
        </div>
        <Confirm visible={visible} text="确定清空所有搜索历史" okText="确定" onOk={this.onOK} onCancel={this.onCancel}/>
        <Route path="/search/:id" component={SingerDetail} />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  searchHistory: state.get('searchHistory').toJS()
})
export default connect(mapStateToProps, {
  saveSearchHistory,
  deleteSearchHistory,
  clearSearchHistory
})(wrapAnimation(Search))