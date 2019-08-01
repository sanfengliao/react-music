import React from 'react'
import { getRecommend } from '../../api/recommend';
import { OK_CODE } from '../../config';
import Slider from '../../components/slider/Slider';
import Scroll from '../../components/scroll/Scroll'

import './index.styl'

class Recommend extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slider: [],
      songList: []
    }
  }
  
  componentDidMount() {
    console.log('recommend mouted')
    this._getRecommend()
  }
  _getRecommend = async () => {
    let result = await getRecommend()
    if (result.code === OK_CODE) {
      this.setState({
        slider: result.data.slider,
        songList: result.data.songList
      })
    }
  }
  render() {
    const { slider, songList } = this.state 
    return (
      <div className="recommend">
        <Scroll data={songList}>
          <div className="slider-wrapper">
            {
              slider.length && (
                <Slider>
                  {
                    slider.map((item, index) => (
                      <div key={item.id}>
                        <a href={item.linkUrl}>
                          <img src={item.picUrl} alt="轮播图"/>
                        </a>
                      </div>
                    ))
                  }
                </Slider>
              )
            } 
          </div>
          <div className="recommend-list">
            <h1 className="list-title">热门榜单</h1>
            <ul>
              {
                songList.map((item, index) => (
                  <li key={item.id} className="item">
                    <div className="icon">
                      <img src={item.picUrl} alt={item.songListDesc} width="60" height="60" />
                    </div>
                    <div className="text">
                      <h2 className="name">{item.songListAuthor}</h2>
                      <p className="desc">{item.songListDesc}</p>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </Scroll>
      </div>
    )
  }
}

export default Recommend