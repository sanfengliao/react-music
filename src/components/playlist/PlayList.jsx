import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import playerWrap from '../playerwrap/player-wrap';
import { playMode } from '../../common/js/config';
import Scroll from '../scroll/Scroll';
import Confirm from '../confirm/Comfirm'
import { deleteSongList, deleteSong } from '../../store/actions'

import "./index.styl"

function UlCom(props) {
  return (
    <ul>{props.children}</ul>
  )
}

class PlayList extends React.Component {
  refreshDelay=120
  static defaultProps = {
    visible: false
  }
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
  }
  state={
    confirmVisible: false
  }
  modeText = () => {
    return this.props.mode === playMode.sequence ? '顺序播放' : this.props.mode === playMode.random ? '随机播放' : '单曲循环'
  }

  getCurrentIcon(item) {
    if (this.props.currentSong.id === item.id) {
      return 'icon-play'
    }
    return ''
  }

  close = (e) => {
    e.stopPropagation()
    this.props.onClose && this.props.onClose()
  }
  onClearConfirm = () => {
    this.setState({
      confirmVisible: true
    })
  }

  onOk = () => {
    this.props.deleteSongList()
    this.setState({
      confirmVisible: false
    })
    this.props.onClose && this.props.onClose()
  }

  onCancel = () => {
    this.setState({
      confirmVisible: false
    })
  }

  onDeleteOne = (item, e) => {
    e.stopPropagation()
    console.log('---')
    this.props.deleteSong(item)
  }

  selectItem = (item, index) => {
    if (this.props.mode === playMode.random) {
      index = this.props.playlist.findIndex((song) => {
        return song.id === item.id
      })
    }
    this.props.setCurrentIndex(index)
    this.props.setPlayingState(true)
  }

  render() {
    const { sequenceList, visible } = this.props
    const { confirmVisible } = this.state
    return (
      <CSSTransition in={visible} unmountOnExit mountOnEnter timeout={300} classNames="list-fade">
        <div className="playlist">
          <div className="list-wrapper">
            <div className="list-header">
              <h1 className="title">
                <i className={'icon ' + this.props.iconMode()} onClick={this.props.changeMode}></i>
                <span className="text">{this.modeText()}</span>
                <span className="clear" onClick={this.onClearConfirm}><i className="icon-clear"></i></span>
              </h1>
            </div>
            <div className="list-content">
              <Scroll data={sequenceList}>
                <TransitionGroup component={UlCom}>
                    {
                      sequenceList.map((item, index) => (
                        <CSSTransition key={item.id} classNames="list" timeout={300}>
                          <li onClick={(e) => this.selectItem(item, index)} className="list-item">
                            <i className={'current ' + this.getCurrentIcon(item)}></i>
                            <span className="text">{item.name}</span>
                            <span className="like" onClick={e => {e.stopPropagation(); this.props.toggleFavorite(item)}}>
                              <i className={this.props.getFavoriteIcon(item)}></i>
                            </span>
                            <span className="delete" onClick={e => {this.onDeleteOne(item, e)}}>
                              <i className="icon-delete"></i>
                            </span>
                          </li>
                        </CSSTransition>
                      ))
                    }
                </TransitionGroup>
              </Scroll>
            </div>
            <div className="list-operate">
              <div className="add">
                <i className="icon-add"></i>
                <span className="text">添加歌曲到播放队列</span>
              </div>
            </div>
            <div className="list-close" onClick={this.close}>
              <span>关闭</span>
            </div>
          </div>
          <Confirm visible={confirmVisible} text="是否清空播放列表" okText="确认" onOk={this.onOk} onCancel={this.onCancel} />
        </div>
      </CSSTransition>
    )
  }
}

export default connect(null, {
  deleteSongList,
  deleteSong
})(playerWrap(PlayList))