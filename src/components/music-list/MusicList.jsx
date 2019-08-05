import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Scroll from '../scroll/Scroll'

import './index.styl'
import Loading from '../loading/Loading';
import SongList from '../song-list/SongList';
import { selectPlay, randomPlay } from '../../store/actions'

const RESERVED_HEIGHT = 40

class MusicList extends React.Component {
  state = {
    scrollY: 0
  }
  constructor(props) {
    super(props)
    this.bgImageRef = React.createRef()
    this.listRef = React.createRef()
    this.layerRef = React.createRef()
    this.filterRef = React.createRef()
    this.playBtnRef = React.createRef()
    this.listenScroll = true
    this.probeType = 3
  }
  static defaultProps = {
    title: '',
    bgImage: '',
    songs: []
  }
  static propTypes = {
    title: PropTypes.string,
    bgImage: PropTypes.string,
    songs: PropTypes.array
  }
  goBack = () => {
    this.props.history.goBack()
  }

  onScroll = (pos) => {
    let newVal = pos.y
    let translateY = Math.max(this.minTransalteY, newVal)
    let scale = 1
    let zIndex = 0
    const percent = Math.abs(newVal / this.imageHeight)
    if (newVal > 0) {
      scale += percent
      zIndex = 10
    }
    this.layerRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    //this.filterRef.current.style.backdropFilter = `blur(${blur}px)`
    if (newVal < this.minTransalteY) {
      zIndex = 10
      this.bgImageRef.current.style.paddingTop = 0
      this.bgImageRef.current.style.height = `${RESERVED_HEIGHT}px`
      this.playBtnRef.current.style.display = 'none'
    } else {
      this.bgImageRef.current.style.paddingTop = '70%'
      this.bgImageRef.current.style.height = 0
      this.playBtnRef.current.style.display = 'block'
    }
    this.bgImageRef.current.style.transform = `scale(${scale})`
    this.bgImageRef.current.style.zIndex = zIndex
       
  }

  onSelect = (song, index) => {
    this.props.selectPlay(this.props.songs, index)
  }

  randomPlay = () => {
    this.props.randomPlay(this.props.songs)
  }

  componentDidMount() {
    this.imageHeight = this.bgImageRef.current.clientHeight
    this.minTransalteY = -this.imageHeight + 40
    this.listRef.current.style.top = `${this.imageHeight}px`
  }
  render() {
    const { title, bgImage, songs } = this.props
    const bgImageStyle = `url(${bgImage})`
    return (
      <div className="music-list">
        <div className="back" onClick={this.goBack}>
          <i className="icon-back"></i>
        </div>
        <h1 className="title">{title}</h1>
        <div ref={this.bgImageRef} className="bg-image" style={{backgroundImage: bgImageStyle}}>
          <div className="player-wrapper">
            <div className="play" ref={this.playBtnRef} onClick={this.randomPlay}>
              <i className="icon-play"></i>
              <span className="text">随机播放全部</span>
            </div>
          </div>
          <div className="filter" ref={this.filterRef}></div>
        </div>
        <div className="bg-layer" ref={this.layerRef}></div>
        <div ref={this.listRef} className="list">
          <Scroll overflowHidden={false} data={songs} listenScroll={this.listenScroll} probeType={this.probeType} onScroll={this.onScroll}>
            <div className="song-list-wrapper">
              <SongList songs={songs} onSelect={this.onSelect}/>
            </div>
          </Scroll>
          {
            !this.props.songs.length && (
              <div className="loading-container">
                <Loading />
              </div>
            )
          }
        </div>
      </div>
    )
  }
}


export default connect(null, {
  selectPlay,
  randomPlay
})(withRouter(MusicList)) 