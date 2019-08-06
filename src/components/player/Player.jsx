import React from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

import ProgressBar from '../progress-bar/ProgressBar'
import ProgressCircle from '../progress-circle/ProgressCircle'
import PlayList from '../playlist/PlayList'

import { setFullScreen, savePlayHistory } from '../../store/actions'
import { playMode } from '../../common/js/config'
import playerWrap from '../../components/playerwrap/player-wrap'

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
    songReady: true,
    playListShow: false,
    playError: true
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
    const currentTime = this.audioRef.current.duration * percent
    this.audioRef.current.currentTime = currentTime
  }

  disableCls = () => {
    return this.state.songReady ? '' : 'disable'
  }

  playIcon = () => {
    return this.props.playing ? 'icon-pause' : 'icon-play'
  }

  onPlayListClose = () => {
    this.setState({
      playListShow: false
    })
  }

  prev = () => {
    if (!this.state.songReady) {
      return
    }
    const { playList, currentIndex, playing } = this.props
    if (playList.length === 1) {
      this.loop()
      return
    }
    let index = currentIndex - 1;
    if (index === -1) {
      index = playList.length-1;
    }
    if (!playing) {
      this.togglePlaying();
    }
    this.props.setCurrentIndex(index);
    this.setState({
      songReady: false,
      currentTime: 0
    })
  }

  next = () => {
    if (!this.state.songReady) {
      return
    }
    const { playList, currentIndex, playing } = this.props
    if (playList.length === 1) {
      this.loop()
      return
    }
    let index = currentIndex + 1
    if (index === playList.length){
      index = 0
    }
    if (!playing) {
      this.togglePlaying()
    }
    this.props.setCurrentIndex(index)
    this.setState({
      songReady: false,
      currentTime: 0
    })
  }

  
  loop() {
    this.audioRef.currentTime = 0
    this.audioRef.play()
  }
  open = () => {
    this.props.setFullScreen(true)
  }

  cdCls = () => {
    return this.props.playing ? 'play' : 'play-pause'
  }

  showPlaylist = (e) => {
    e.stopPropagation()
    this.setState({
      playListShow: true
    })
  }

  togglePlaying = (e) => {
    e.stopPropagation()
    this.props.setPlayingState(!this.props.playing)
  }

  miniIcon = () => {
    return this.props.playing ? 'icon-pause-mini' : 'icon-play-mini'
  }

  dotCls = (show) => {
    let cl = this.state.currentShow === 'show' ? 'active' : ''
    return 'dot ' + cl
  }


  ready = (e) => {
    this.setState({
      songReady: true
    })
    this.props.savePlayHistory(this.props.currentSong)
  }

  error = (e) => {
    this.setState({
      playError: true
    })
  }

  onTimeUpdate = (e) => {
    this.setState({
      currentTime: e.target.currentTime
    })
  }

  end = (e) => {
    if (this.props.mode === playMode.loop) {
      this.loop()
    } else {
      this.next()
    }
  }

  componentDidMount() {
    if (!this.state.playError) {
      this.audioRef.play && this.audioRef.play()
    }
  }

  componentDidUpdate() {
    if (!this.state.playError) {
      if (this.props.playing) {
        this.audioRef.play && this.audioRef.play()
      } else {
        this.audioRef.play && this.audioRef.pause()
      }
    }
  }

  render() {
    const { fullScreen, currentSong, playList } = this.props
    const { currentTime, radius, playListShow } = this.state
    let percent = currentTime / currentSong.duration
    let display = playList.length > 0 ? 'block': 'none'
    return (
      <div className="player" style={{display: display}}>
        <CSSTransition in={fullScreen} unmountOnExit mountOnEnter timeout={400} classNames="normal">
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
                <div className="icon i-left" onClick={this.props.changeMode}>
                  <i className={this.props.iconMode()}></i>
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
                  <i onClick={() => this.props.toggleFavorite(currentSong)} className={this.props.getFavoriteIcon(currentSong)}></i>
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
        <PlayList visible={playListShow} onClose={this.onPlayListClose}/>
        <audio ref={ref => this.audioRef = ref} src={currentSong.url} onPlay={this.ready} onError={this.error} onTimeUpdate={this.onTimeUpdate}
           onEnded={this.end}></audio>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentIndex: state.get('currentIndex'),
  fullScreen: state.get('fullScreen'),
  playing: state.get('playing'),
})


export default connect(mapStateToProps, {
  setFullScreen,
  savePlayHistory
})(playerWrap(Player))