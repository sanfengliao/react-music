import Immutable from 'immutable'
import * as types from './action-types'
import { playMode } from '../common/js/config'
import { shuffle } from '../common/js/utils';
import { saveFavorite, deleteFavorite, loadFavorite, savePlay, loadPlay, loadSearch } from '../common/js/cache';

const initialState = Immutable.fromJS({
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
})

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case types.SET_SINGER:
      return state.set('singer', action.singer)
    case types.SELECT_PLAY:
      let { list, index } = action.payload
      let playList
      if (state.get('mode') === playMode.random) {
        playList = shuffle(list)
        index = findIndex(playList, list[index])
      } else {
        playList = list
      }
      return state.set('sequenceList', Immutable.List(list)).set('playList', Immutable.List(playList)).set('currentIndex', index)
        .set('fullScreen', true)
        .set('playing', true)
    case types.RANDOM_PLAY:
      let randomList = shuffle(action.list)
      return state.set('mode', playMode.random)
        .set('sequenceList', Immutable.List(action.list))
        .set('playList', Immutable.List(randomList))
        .set('currentIndex', 0)
        .set('fullScreen', true)
        .set('playing', true)
    case types.SET_FULLSCREEN:
      return state.set('fullScreen', action.fullScreen)
    case types.SET_TOP_LIST:
      return state.set('topList', action.topList)
    case types.SET_PLAYING_STATE:
      return state.set('playing', action.state)
    case types.SET_CURRENT_INDEX:
      return state.set('currentIndex', action.index)
    case types.SET_PLAY_MODE:
      return state.set('mode', action.mode)
    case types.SET_PLAY_LIST:
      return state.set('playList', Immutable.List(action.list))
    case types.SAVE_FAVOREITE_LIST:
      return state.set('favoriteList', Immutable.List(saveFavorite(action.song)))
    case types.DELETE_FAVORITE_LIST:
      return state.set('favoriteList', Immutable.List(deleteFavorite(action.song)))
    case types.DELETE_SONG_LIST:
      return state.set('currentIndex', -1).set('playList', Immutable.List([])).set('sequenceList', Immutable.List([])).set('playing', false)
    case types.DELETE_SONG:
      let _playList = state.get('playList').toJS().slice()
      let sequenceList = state.get('sequenceList').toJS().slice()
      let currentIndex = state.get('currentIndex')
      let pIndex = findIndex(_playList, action.song)
      _playList.splice(pIndex, 1)
      let sIndex = findIndex(sequenceList, action.song)
      sequenceList.splice(sIndex, 1)
      if (currentIndex > pIndex || currentIndex === _playList.length){
        currentIndex--
      }
      let newState = state.set('playList', Immutable.List(_playList)).set('sequenceList', Immutable.List(sequenceList)).set('currentIndex', currentIndex)
      if (!_playList.length) {
        return newState.set('playing', false)
      } else {
        return newState.set('playing', true)
      }
    case types.INSERT_SONG:
      let __playList = state.get('playList').toJS().slice()
      let _sequenceList = state.get('sequenceList').toJS().slice()
      let _currentIndex = state.get('currentIndex')
      let _currentSong = __playList[_currentIndex]
      let fpIndex = findIndex(__playList, action.song)
      _currentIndex++
      __playList.splice(_currentIndex, 0, action.song)
      if (fpIndex > -1) {
        if (_currentIndex > fpIndex) {
          __playList.splice(fpIndex, 1)
          _currentIndex--
        } else {
          __playList.splice(fpIndex + 1, 1)
        }
      }

      let currentSIndex = findIndex(_sequenceList, _currentSong) + 1

      let fsIndex = findIndex(_sequenceList, action.song)

      _sequenceList.splice(currentSIndex, 0, action.song)

      if (fsIndex > -1) {
        if (currentSIndex > fsIndex) {
          _sequenceList.splice(fsIndex, 1)
        } else {
          _sequenceList.splice(fsIndex + 1, 1)
        }
      }
      return state.set('playList', Immutable.List(__playList)).set('sequenceList', Immutable.List(_sequenceList)).set('currentIndex', _currentIndex).set('fullScreen', true).set('playing', true)
    case types.SAVE_PLAY_HISTORY:
      return state.set('playHistory', Immutable.List(savePlay(action.song)))
    default:
      return state
  }
}

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
