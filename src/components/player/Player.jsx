import React from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

import ProgressBar from '../progress-bar/ProgressBar'
import ProgressCircle from '../progress-circle/ProgressCircle'

import { setFullScreen } from '../../store/actions'
import { playMode } from '../../common/js/config'

import "./index.styl"

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.audioRef = React.createRef()
  }
  state = {
    currentTime: 0,
    radius: 32,
    currentShow: 'cd',
    songReady: true
  }
  back = () => {
    this.props.setFullScreen(false)
  }
  format(interval) {
    interval = interval | 0
    const minute = interval / 60 | 0
    const second = this._pad(interval % 60)
    return `${minute}:${second}`
  }
  _pad = (num, n = 2) => {
    let len = num.toString().length
    while (len < n) {
      num = '0' + num
      len++
    }
    return num
  }
  onPercentChange = (percent) => {

  }

  changeMode = () => {

  }
  
  iconMode = () => {
    return this.props.mode === playMode.sequence ? 'icon-sequence' : this.props.mode === playMode.loop ? 'icon-loop' : 'icon-random'
  }

  disableCls = () => {
    return this.state.songReady ? '' : 'disable'
  }

  playIcon = () => {
    return this.props.playing ? 'icon-pause' : 'icon-play'
  }

  next = () => {

  }

  toggleFavorite = () => {

  }

  getFavoriteIcon = (song) => {
    if (this.isFavorite(song)) {
      return 'icon-favorite'
    }
    return 'icon-not-favorite'
  }

  isFavorite = (song) => {
    const index = this.props.favoriteList.findIndex((item) => {
      return item.id === song.id
    })
    return index > -1
  }

  open = () => {
    this.props.setFullScreen(true)
  }

  cdCls = () => {
    return this.props.playing ? 'play' : 'play-pause'
  }

  showPlaylist = () => {

  }

  togglePlaying = () => {
    
  }

  miniIcon = () => {
    return this.props.playing ? 'icon-pause-mini' : 'icon-play-mini'
  }

  dotCls = (show) => {
    let cl = this.state.currentShow === 'show' ? 'active' : ''
    return 'dot ' + cl
  }


  ready = () => {

  }

  error = () => {

  }


  onTimeUpdate = () => {

  }

  end = () => {

  }

  render() {
    const { fullScreen, currentSong, playList } = this.props
    const { currentTime, radius } = this.state
    let percent = currentTime / currentSong.duration
    let display = playList.length > 0 ? 'block': 'none'
    return (
      <div className="player" style={{display: display}}>
        <CSSTransition in={fullScreen} timeout={400} classNames="normal">
          <div className="normal-player">
            <div className="background">
              <img width="100%" height="100%" src={currentSong.image} alt={currentSong.name}/>
            </div>
            <div className="top">
              <div className="back" onClick={this.back}>
                <i className="icon-back"></i>
              </div>
              <h1 className="title">{currentSong.name}</h1>
              <h2 className="subtitle">{currentSong.singer}</h2>
            </div>
            <div className="middle">
              <div className="middle-l">
                <div className="cd-wrapper">
                  <div className={'cd ' + this.cdCls()}>
                    <img src={currentSong.image} alt={currentSong.name} className="image"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="dot-wrapper">
                <span className={this.dotCls('cd')}></span>
                <span className={this.dotCls('lyric')}></span>
              </div>
              <div className="progress-wrapper">
                <span className="time time-l">
                  {this.format(currentTime)}
                </span>
                <div className="progress-bar-wrapper">
                  <ProgressBar percent={percent} onPercentChange={this.onPercentChange}/>
                </div>
                <div className="time time-r">{this.format(currentSong.duration)}</div>
              </div>
              <div className="operators">
                <div className="icon i-left" onClick={this.changeMode}>
                  <i className={this.iconMode()}></i>
                </div>
                <div className={"icon i-left " + this.disableCls()}>
                  <i onClick={this.prev} className="icon-prev"></i>
                </div>
                <div className={"icon i-center " + this.disableCls()}>
                  <i onClick={this.togglePlaying} className={this.playIcon()}></i>
                </div>
                <div className={"icon i-right" + this.disableCls()}>
                  <i onClick={this.next} className="icon-next"></i>
                </div>
                <div className="icon i-right">
                  <i onClick={() => this.toggleFavorite(currentSong)} className={this.getFavoriteIcon(currentSong)}></i>
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition in={!fullScreen} timeout={400} classNames="mini">
          <div className="mini-player" onClick={this.open}>
            <div className="icon">
              <img className={this.cdCls()} width="40" height="40" src={currentSong.image} />
            </div>
            <div className="text">
              <h2 className="name" >{currentSong.name}</h2>
              <p className="desc">{currentSong.singer}</p>
            </div>
            <div className="control">
              <ProgressCircle radius={radius} percent={percent}>
                <i onClick={this.togglePlaying} className={'icon-mini ' + this.miniIcon()}></i>
              </ProgressCircle>
            </div>
            <div className="control" onClick={this.showPlaylist}>
              <i className="icon-playlist"></i>
            </div>
          </div>
        </CSSTransition>
        <audio ref={this.audioRef} src={currentSong.url} onPlay={this.ready} onError={this.error} onTimeUpdate={this.onTimeUpdate}
           onEnded={this.end}></audio>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentIndex: state.get('currentIndex'),
  fullScreen: state.get('fullScreen'),
  playing: state.get('playing'),
  playList: state.get('playList'),
  currentSong: state.get('playList')[state.get('currentIndex')] || {},
  sequenceList: state.get('sequeceList'),
  mode: state.get('mode'),
  favoriteList: state.get('favoriteList')
})


export default connect(mapStateToProps, {
  setFullScreen
})(Player)