import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MusicList from '../../components/music-list/MusicList';

import "./index.styl"
import { getSingerDetail } from '../../api/singer';
import { OK_CODE } from '../../config';
import { createSong } from '../../common/js/song';

class SingerDetail extends React.Component {
  state={
    songs: []
  }
  componentWillMount() {
    if (!this.props.singer.id) {
      this.props.history.push('/singer')
      return
    }
    this._getSongList()
  }
  _getSongList = async () => {
    let res = await getSingerDetail(this.props.singer.id)
    if (res.code === OK_CODE) {
      let songs = this._normalizeSongs(res.data.list)
      this.setState({
        songs
      })
    }
  }
  _normalizeSongs(list) {
    let res = []
    list.forEach(item => {
      let { musicData } = item
      if (musicData.songmid && musicData.albummid) {
        res.push(createSong(musicData))
      }
    })
    return res
  }
  render() {
    const { name, avatar } = this.props.singer
    const { songs } = this.state
    return (
      <MusicList songs={songs} title={name} bgImage={avatar}/>  
    )
  }
}

const mapStateToProps = (state) => ({
  singer: state.get('singer')
})

export default connect(mapStateToProps, null)(withRouter(SingerDetail))