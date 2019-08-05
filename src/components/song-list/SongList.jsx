import React from 'react'
import PropTypes from 'prop-types'
import "./index.styl"

export default class SongList extends React.Component {
  static defaultProps = {
    songs: [],
    rank: false
  }
  static propTypes = {
    songs: PropTypes.array,
    rank: PropTypes.bool,
    onSelect: PropTypes.func
  }

  getRankCls(index) {
    if (index <= 2) {
      return `icon icon${index}`
    } else {
      return 'text'
    }
  }

  getRankText(index) {
    if (index > 2) {
      return index + 1
    }
  }

  getDesc(song) {
    return `${song.singer}·${song.album}`
  }

  onSelectItem = (item, index) => {
    this.props.onSelect && this.props.onSelect(item, index)
  }

  render() {
    const { songs, rank } = this.props
    return (
      <div className="song-list">
        <ul>
          {
            songs.map((song, index) => (
              <li key={song.id} className="item" onClick={(e) => this.onSelectItem(song, index)}>
                {
                  rank && (
                    <div className="song-rank">
                      <span className={this.getRankCls(index)}>{this.getRankText(index)}</span>
                    </div>
                  )
                }
                <div className="content">
                  <h2 className="name">{song.name}</h2>
                  <p className="desc">{this.getDesc(song)}</p>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}