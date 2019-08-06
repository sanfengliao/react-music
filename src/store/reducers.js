import Immutable from 'immutable'
import * as types from './action-types'
import { playMode } from '../common/js/config'
import { shuffle } from '../common/js/utils';

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
  searchHistory: [],
  playHistory: [],
  favoriteList: []
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
      return state.set('sequenceList', list).set('playList', playList).set('currentIndex', index)
        .set('fullScreen', true)
        .set('playing', true)
    case types.RANDOM_PLAY:
      let randomList = shuffle(action.list)
      return state.set('mode', playMode.random)
        .set('sequenceList', action.list)
        .set('playList', randomList)
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
      return state.set('playList', action.list)
    default:
      return state
  }
}

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
