import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import MusicList from '../../components/music-list/MusicList';
import { getMusicList } from '../../api/rank';
import { OK_CODE } from '../../config';
import { createSong } from '../../common/js/song'

class TopList extends React.Component {
  state={
    rank: true,
    songs: []
  }
  componentWillMount() {
    if (!this.props.topList.id) {
      this.props.history.push('/rank')
    }
  }
  componentDidMount() {
    this._getMusicList()
  }
  _getMusicList = async () => {
    let res = await getMusicList(this.props.topList.id)
    if (res.code === OK_CODE) {
      this.setState({
        songs: this._normalizeSongs(res.songlist)
      })
    }
  }

  _normalizeSongs(list) {
    let ret = []
    list.forEach((item) => {
      const musicData = item.data
      if (musicData.songid && musicData.albummid) {
        ret.push(createSong(musicData))
      }
    })
    return ret
  }

  render() {
    const { rank, songs } = this.state
    const { topList } = this.props
    const title = topList.topTitle
    const bgImage = songs.length > 0 ? songs[0].image : ''
    return (
      <div className="toplist">
        <MusicList rank={rank} songs={songs} title={title} bgImage={bgImage}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  topList: state.get('topList')
})

export default connect(mapStateToProps, null)(withRouter(TopList))

