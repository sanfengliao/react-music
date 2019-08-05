import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


import Switches from '../../components/switch/Switch'
import Scroll from '../../components/scroll/Scroll'
import SongList from '../../components/song-list/SongList'
import NoResult from '../../components/no-result/NoResult'
import wrapAnimation from '../../components/wrapper-animation/wrapperAnimation'
import { randomPlay } from '../../store/actions'

import './index.styl'

class UserCenter extends React.Component {
  state={
    currentIndex: 0,
    switches: [
      {
        name: '我喜欢的'
      },
      {
        name: '最近听的'
      }
    ]
  }
  playBtnRef = React.createRef()
  listWrapperRef = React.createRef()
  back = () => {
    this.props.history.goBack()
  }
  switchItem = (index) => {
    console.log(index)
    this.setState({
      currentIndex: index
    })
  }
  random = () => {

  }
  onSelectSong = () => {

  }

  noResult = () => {
    if (this.state.currentIndex === 0) {
      return !this.props.favoriteList.length
    } else {
      return !this.props.playHistory.length
    }
  }

  noResultDesc = () => {
    if (this.state.currentIndex === 0) {
      return '暂无收藏歌曲'
    } else {
      return '你还没有听过歌曲'
    }
  }
  render() {
    const { switches, currentIndex } = this.state
    const { favoriteList, playHistory } = this.props
    return (
      <div className="user-center">
        <div className="back" onClick={this.back}>
          <i className="icon-back"></i>
        </div>
        <div className="switches-wrapper">
          <Switches switchItem={this.switchItem} switches={switches}/>
        </div>
        <div ref={this.playBtnRef} className="play-btn" onClick={this.random}>
          <i className="icon-play"></i>
          <span className="text">随机播放全部</span>
        </div>
        <div ref={this.listWrapperRef} className="list-wrapper">
          {
            currentIndex === 0 && (
              <Scroll data={favoriteList}>
                <div className="list-inner">
                  <SongList songs={favoriteList} onSelectSong={this.onSelectSong}/>
                </div>
              </Scroll>
            )
          }
          {
            currentIndex === 1 && (
              <Scroll data={favoriteList}>
                <div className="list-inner">
                  <SongList songs={playHistory} onSelectSong={this.onSelectSong}/>
                </div>
              </Scroll>
            )
          }
        </div>
        {
          this.noResult() && (
            <div className="no-result-wrapper">
              <NoResult title={this.noResultDesc()}/>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  favoriteList: state.get('favoriteList').toJS(),
  playHistory: state.get('playHistory').toJS()
})


export default connect(mapStateToProps, {
  randomPlay
})(withRouter(wrapAnimation(UserCenter)))