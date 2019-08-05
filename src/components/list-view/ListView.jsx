import React from 'react'
import PropTypes from 'prop-types'
import Scroll from '../scroll/Scroll'
import Loading from '../loading/Loading'

import './index.styl'
import { attr } from '../../common/js/dom';

const TITLE_HEIGHT = 30
const ANCHOR_HEIGHT = 18

class ListView extends React.Component {
  static defaultProps = {
    data: []
  }
  static propTypes = {
    data: PropTypes.array,
    onSelectItem: PropTypes.func
  }
  state = {
    scrollY: 0,
    currentIndex: 0,
    diff: -1
  }
  constructor(props) {
    super(props)
    this.listenScroll = true
    this.probeType = 3
    this.scrollRef = React.createRef()
    this.fixedTitleRef = React.createRef()
    this.touch = {}
    this.heightList = []
  }
  onScroll = (pos) => {
    this.setState({
      scrollY: pos.y
    })
    this.onScrollYChange(pos.y)
  }

  onSelectItem = (item, e) => {
    e.stopPropagation()
    this.props.onSelectItem && this.props.onSelectItem(item)
  }

  onTouchStart = (e) => {
    let index = attr(e.target, 'index')
    this.touch.y1 = e.touches[0].pageY
    this.touch.index = index
    this._ScrollTo(index)
  }

  onTouchMove = (e) => {
    this.touch.y2 = e.touches[0].pageY
    let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
    let index = parseInt(this.touch.index) + delta
    this._ScrollTo(index)
  }

  _ScrollTo = (index) => {
    
    if (!index && index !== 0) {
      return
    }
    if (index < 0) {
      index = 0
    } else if (index > this.heightList.length - 2) {
      index = this.heightList.length - 2
    }
    let scrollY = -this.heightList[index]
    this.setState({
      scrollY,
    })
    this.onScrollYChange(scrollY)
    this.scrollRef.scrollToElement(this.listGroupRefs[index], 0)
  }

  onScrollYChange = (newY) => {
    const heightList = this.heightList
    // 当滚动到顶部，newY>0
    if (newY > 0) {
      this.setState({
        currentIndex: 0
      })
      return
    }
    // 在中间部分滚动
    for (let i = 0; i < heightList.length - 1; i++) {
      let height1 = heightList[i]
      let height2 = heightList[i + 1]
      if (-newY >= height1 && -newY < height2) {
        this.setState({
          currentIndex: i,
          diff: height2 + newY
        })
        this.onDiffChange(height2 + newY)
        return
      }
    }
    // 当滚动到底部，且-newY大于最后一个元素的上限
    this.setState({
      currentIndex: heightList.length - 2
    })
  }

  onDiffChange = (newVal) => {
    let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
    if (this.fixedTop === fixedTop) {
      return
    }
    this.fixedTop = fixedTop
    this.fixedTitleRef.current.style.transform = `translate3d(0,${fixedTop}px,0)`
  }

  componentWillReceiveProps(props) {
    this.listGroupRefs = []
    for (let i = 0; i < props.data.length; ++i) {
      this.listGroupRefs.push(React.createRef())
    }
  }

  getFixedTitle = () => {
    let { scrollY, currentIndex } = this.state
    let { data } = this.props
    if (scrollY > 0) {
      return ''
    }
    return data[currentIndex] ? data[currentIndex].title : ''
  }

  _calculateHeight = () => {
    this.heightList = []
    const list = this.listGroupRefs
    let height = 0
    this.heightList.push(height)
    for (let i = 0; i < list.length; i++) {
      let item = list[i]
      height += item.clientHeight
      this.heightList.push(height)
    }
  }

  componentDidUpdate() {
    this._calculateHeight()
  }
  render() {
    const { data } = this.props
    const { currentIndex } = this.state
    const shorcut = data.map(item => item.title.substr(0, 1))
    const fixedTitle = this.getFixedTitle()
    return (
      <div className="listview">
        <Scroll data={data}  ref={(ref) => this.scrollRef = ref} listenScroll={this.listenScroll} probeType={this.probeType}  onScroll={this.onScroll}>
          <ul>
            {
              data.map((group, index) => (
                <li key={group.title} className="list-group" ref={ref => this.listGroupRefs[index] = ref}>
                  <h2 className="list-group-title">{group.title}</h2>
                  <ul>
                    {
                      group.items.map((item, index) => (
                        <li key={item.name} className="list-group-item" onClick={(e) => this.onSelectItem(item, e)}>
                          <img className="avatar" src={item.avatar} alt="头像" />
                          <span className="name">{item.name}</span>
                        </li>
                      ))
                    }
                  </ul>
                </li>
              ))
            }
          </ul>
        </Scroll>
        <div className="list-shortcut" onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove}>
        <ul>
            {
              shorcut.map((item, index) => (
                <li className={currentIndex === index ? 'current item' : 'item'} key={item} data-index={index}>
                  {item}
                </li>
              ))
            }
          </ul>
        </div>
        {
          fixedTitle.length > 0 && (
            <div className="list-fixed" ref={this.fixedTitleRef}>
              <div className="fixed-title">{fixedTitle}</div>
            </div>
          )
        }
        {
          data.length === 0 && (
            <div className="loading-container">
              <Loading />
            </div>
          )
        }
      </div>
    )
  }
}

export default ListView