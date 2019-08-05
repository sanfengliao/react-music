import React from 'react'
import { withRouter, Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import ListView from '../../components/list-view/ListView'
import { getSingerList } from '../../api/singer'
import Singer from '../../common/js/singer'
import { OK_CODE } from '../../config'
import { setSinger } from '../../store/actions'
import './index.styl'
import SingerDetail from '../singer-detail/SingerDetail';
import wrapAnimation from '../../components/wrapper-animation/wrapperAnimation';

const HOT_NAME = '热门'
const HOT_NAME_LEN = 10

class SingerList extends React.Component {
  state = {
    singerList: []
  }
  componentDidMount() {
    this._getSingerList()
  }
  _getSingerList = async () => {
    let res = await getSingerList()
    if (res.code === OK_CODE) {
      this._normalizeData(res.data.list)
    }
  }
  _normalizeData = (list) => {
    let map = {
      hot: {
        title: HOT_NAME,
        items: []
      }
    }
    list.forEach((item, index) => {
      if (index < HOT_NAME_LEN) {
        map.hot.items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
      }
      let key = item.Findex
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
    })
    let hot = [], res = []
    for (let key in map) {
      let val = map[key]
      if (val.title === HOT_NAME) {
        hot.push(val)
      } else if (/[a-zA-Z]/.test(val.title)) {
        res.push(val)
      }
    }
    res.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0);
    })
    hot = hot.concat(res)
    this.setState({
      singerList: hot
    })
  }
  onSelectItem = (item) => {
    this.props.setSinger(item)
    this.props.history.push(`/singer/${item.id}`)
  }
  render() {
    return (
      <div className="singer-list">
        <ListView data={this.state.singerList} onSelectItem={this.onSelectItem}/>
        <Route path="/singer/:id" render={(props) => {
          return(
            <CSSTransition in={true} classNames="slide" timeout={3000}>
              <SingerDetail />
            </CSSTransition>
          )
        }} />
      </div>
    )
  }
}



export default connect(null, {
  setSinger
})(withRouter(wrapAnimation(SingerList)))