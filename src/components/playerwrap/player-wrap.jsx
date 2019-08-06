import React from 'react'
import { connect } from 'react-redux'

import { setCurrentIndex, setPlayList, setPlayMode, setPlayingState, saveFavoriteList, deleteFavoriteList } from '../../store/actions'
import { playMode } from '../../common/js/config'
import { shuffle } from '../../common/js/utils';

function playerWrap(Component) {
  class WrapComponent extends React.Component {
    iconMode = () => {
      return this.props.mode === playMode.sequence ? 'icon-sequence' : this.props.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    }

    changeMode = () => {
      const mode = (this.props.mode + 1) % 3
      this.props.setPlayMode(mode)
      let list = []
      if (mode === playMode.random) {
        list = shuffle(this.props.sequenceList)
      } else {
        list = this.props.sequenceList
      }
      this._resetCurrentIndex(list)
      this.props.setPlayList(list)
    }
    
    _resetCurrentIndex = (list) => {
      let index = list.findIndex((item) => {
        return item.id === this.props.currentSong.id;
      })
      this.props.setCurrentIndex(index);
    }

    isFavorite = (song) => {
      const index = this.props.favoriteList.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1
    }

    getFavoriteIcon = (song) => {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    }

    toggleFavorite = (song) => {
      if (this.isFavorite(song)) {
        this.props.deleteFavoriteList(song)
      } else {
        this.props.saveFavoriteList(song)
      }
    }

    render() {
      return (
        <Component {...this.props} iconMode={this.iconMode} changeMode={this.changeMode} getFavoriteIcon={this.getFavoriteIcon} toggleFavorite={this.toggleFavorite} />
      )
    }
  }

  return connect(
  state => ({
    sequenceList: state.get('sequenceList').toJS(),
    playList: state.get('playList').toJS(),
    currentSong: state.get('playList').get(state.get('currentIndex')) || {},
    mode: state.get('mode'),
    favoriteList: state.get('favoriteList').toJS()
  }), {
    setCurrentIndex,
    setPlayMode,
    setPlayList,
    setPlayingState,
    saveFavoriteList,
    deleteFavoriteList
  })(WrapComponent)
}

export default playerWrap