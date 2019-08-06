import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Scroll from '../scroll/Scroll'
import Loading from '../loading/Loading'
import NoResult from '../no-result/NoResult'
import { search } from '../../api/search';
import { OK_CODE } from '../../config';
import { createSong } from '../../common/js/song'
import  Singer from '../../common/js/singer'
import { setSinger, insertSong } from '../../store/actions'
const TYPE_SINGER = 'singer'
const perpage = 20

class Suggest extends React.Component {
  static defaultProps = {
    showSinger: true,
    query: ''
  }
  static propTypes = {
    showSinger: PropTypes.bool,
    query: PropTypes.string,
    selectItem: PropTypes.func,
    onBeforeScrollStart: PropTypes.func
  }
  state={
    page: 1,
    pullup: true,
    beforeScroll: true,
    hasMore: true,
    result: []
  }
  suggestRef=React.createRef()
  onScrollToEnd = () => {
    if (!this.state.hasMore) {
      return
    }
    let page = this.state.page + 1
    this.setState({
      page: page
    })
    search(this.query, page, this.props.showSinger, perpage).then((res) => {
      if (res.code === OK_CODE) {
        let result = this.result.concat(this._genResult(res.data))
        this.setState({
          result
        })
        this._checkMore(res.data)
      }
    })
  }
  onBeforeScrollStart = () => {
    this.props.onBeforeScrollStart && this.props.onBeforeScrollStart()
  }
  selectItem = (item) => {
    if (item.type === TYPE_SINGER) {
      const singer = new Singer({
        id: item.singermid,
        name: item.singername
      })
      this.props.history.push(`/search/${singer.id}`)
      this.props.setSinger(singer)
    } else {
      this.props.insertSong(item)
    }
    this.props.selectItem && this.props.selectItem(item)
  }
  getIconCls(item) {
    if (item.type === TYPE_SINGER) {
      return 'icon-mine'
    } else {
      return 'icon-music'
    }
  }
  getDisplayName(item) {
    if (item.type === TYPE_SINGER) {
      return item.singername
    } else {
      return `${item.name}-${item.singer}`
    }
  }
  search = async (query) => {
    this.setState({
      page: 1,
      hasMore: true
    })
    this.suggestRef.scrollTo(0, 0)
    let res = await search(query, 1, this.props.showSinger, perpage)
    if (res.code === OK_CODE) {
      let result = this._getResult(res.data)
      this.setState({
        result
      })
    }
  }

  _genResult(data) {
    let ret = []
    if (data.zhida && data.zhida.singerid) {
      ret.push({...data.zhida, ...{type: TYPE_SINGER}})
    }
    if (data.song) {
      ret = ret.concat(this._normalizeSongs(data.song.list))
    }
    return ret
  }
  _normalizeSongs(list) {
    let ret = []
    list.forEach((musicData) => {
      if (musicData.songid && musicData.albummid) {
        ret.push(createSong(musicData))
      }
    })
    return ret
  }

  _checkMore = (data) => {
    const song = data.song
    if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
      this.setState({
        hasMore: false
      })
    }
  }
  
  shouldComponentUpdate(newProps) {
    return newProps.query !== this.props.query
  }
  componentWillReceiveProps(props) {
    this.search(props.query)
  }
  render() {
    const { pullup, beforeScroll, result, hasMore} = this.state
    return (
      <div className="suggest">
        <Scroll ref={ref => this.suggestRef = ref} data={result} pullup={pullup} beforeScroll={beforeScroll} onScrollToEnd={this.onScrollToEnd} onBeforeScrollStart={this.onBeforeScrollStart}>
          <ul className="suggest-list">
            {
              result.map((item, index) => (
                <li key={index}  className="suggest-item" onClick={(e) => this.selectItem(item)}>
                  <div className="icon">
                    <i className={this.getIconCls(item)}></i>
                  </div>
                  <div className="name">
                    <p className="text">{this.getDisplayName(item)}</p>
                  </div>
                </li>
              ))
            }
            {
              hasMore && <Loading />
            }
          </ul>
        </Scroll>
        {
          !hasMore && !result.length && (
            <div className="no-result-wrapper">
              <NoResult title="抱歉, 暂无搜索结果"/>
            </div>
          )
        }
      </div>
    )
  }
}

export default connect(null, {
  setSinger,
  insertSong
})(withRouter(Suggest))