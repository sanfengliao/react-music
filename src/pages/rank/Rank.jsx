import React from 'react'
import { withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import TopList from '../top-list/TopList'
import Scroll from '../../components/scroll/Scroll';
import Loading from '../../components/loading/Loading';
import wrapAnimation from '../../components/wrapper-animation/wrapperAnimation'
import { getTopList } from '../../api/rank';
import { setTopList } from '../../store/actions'
import { OK_CODE } from '../../config/index'

import "./index.styl"


class Rank extends React.Component {
  state={
    topList: []
  }
  componentDidMount() {
    this._getTopList()
  }
  _getTopList = async () => {
    let res = await getTopList()
    if (res.code === OK_CODE) {
      this.setState({
        topList: res.data.topList
      })
    }
  }

  selectItem = (item) => {
    this.props.history.push(`/rank/${item.id}`)
    this.props.setTopList(item)
  }

  render() {
    const { topList } = this.state
    return (
      <div className="rank">
        {
          topList.length > 0&& (
            <Scroll data={topList}>
              <ul>
                {
                  topList.map((item, index) =>(
                    <li key={index} className="top-item" onClick={(e) => this.selectItem(item)}>
                      <div className="icon">
                        <img width="100" height="100" src={item.picUrl} />
                      </div>
                      <ul className="songList">
                        {
                          item.songList.map((song, index) => (
                            <li className="song" key={index}>
                              <span>{index + 1}</span>
                              <span>{song.songname + song.singername}</span>
                            </li>
                          ))
                        }
                      </ul>
                    </li>
                  ))
                }
              </ul>
            </Scroll>
          )
        }
        {
          !topList.length && (
            <div className="loading-container">
              <Loading />
            </div>
          )
        }
        <Route path="/rank/:id" component={TopList}/>
      </div>
    )
  }
}

export default connect(null, {
  setTopList
})(withRouter(wrapAnimation(Rank)))