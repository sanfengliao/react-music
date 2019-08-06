import * as types from './action-types'

export const setSinger = (singer) => ({
  type: types.SET_SINGER,
  singer
})

export const selectPlay = (list, index) => ({
  type: types.SELECT_PLAY,
  payload: {
    list,
    index
  }
})

export const randomPlay = (list) => ({
  type: types.RANDOM_PLAY,
  list
})

export const setFullScreen = (fullScreen) => ({
  type: types.SET_FULLSCREEN,
  fullScreen
})

export const setTopList = (topList) => ({
  type: types.SET_TOP_LIST,
  topList
})

export const setPlayingState = (state) => ({
  type: types.SET_PLAYING_STATE,
  state
})

export const setCurrentIndex = (index) => ({
  type: types.SET_CURRENT_INDEX,
  index
})

export const setPlayMode = (mode) => ({
  type: types.SET_PLAY_MODE,
  mode
})

export const setPlayList = (list) => ({
  type: types.SET_PLAY_LIST,
  list
})

export const saveFavoriteList = (song) =>({
  type: types.SAVE_FAVOREITE_LIST,
  song
})

export const deleteFavoriteList = (song) => ({
  type: types.DELETE_FAVORITE_LIST,
  song
})

export const deleteSongList = () => ({
  type: types.DELETE_SONG_LIST
})

export const deleteSong = (song) => ({
  type: types.DELETE_SONG,
  song
})

export const insertSong = (song) => ({
  type: types.INSERT_SONG,
  song
})

export const savePlayHistory = (song) => ({
  type: types.SAVE_PLAY_HISTORY,
  song
})

export const saveSearchHistory = (query) => ({
  type: types.SAVE_SEARCH_HISTORY,
  query
})

export const deleteSearchHistory = (query) => ({
  type: types.DELETE_SEARCH_HISTORY,
  query
})

export const clearSearchHistory = () => ({
  type: types.CLEAR_SEARCH_HISTORY
})