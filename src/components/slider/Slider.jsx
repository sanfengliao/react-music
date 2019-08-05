import React from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import './index.styl'

class Slider extends React.Component {
  static defaultProps = {
    loop: true,
    autoPlay: true,
    interval: 1000
  }
  static propTypes = {
    loop: PropTypes.bool.isRequired, // 是否循环
    autoPlay: PropTypes.bool.isRequired, // 是否自动播放
    interval: PropTypes.number.isRequired // 图片轮播间隔
  }
  constructor(props) {
    super(props)
    this.sliderRef = React.createRef()
    this.sliderGroupRef = React.createRef()
    this.sliderItemRefs = []
    this.dots = []
    for (let i = 0; i < props.children.length; ++i) {
      this.sliderItemRefs.push(React.createRef())
      this.dots.push(i)
    }
    this.state = {
      currentIndex: 0
    }
  }
  componentDidMount() {
    this._initialSliderWidth()
    this._initialBScroll()
    if (this.props.autoPlay) {
      this._autoPlay()
    }
    window.addEventListener('resize', () => {
      console.log('resize')
      if (!this.slider) {
        return
      }
      this._initialSliderWidth()
      this.slider.refresh()
    })
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  // 初始化轮播元素宽度和轮播元素父元素宽度
  _initialSliderWidth = () => {
    const { children } = this.props
    // 获取最外层父元素的宽度
    let clientWidth = this.sliderRef.current.clientWidth
    // 初始化轮播元素宽度
    for (let i = 0; i < children.length; ++i) {
      this.sliderItemRefs[i].current.style.width = clientWidth + 'px'
    }
    let width = children.length * clientWidth
    if (this.props.loop) {
      width += 2 * clientWidth
    }
    // 轮播元素父元素宽度
    this.sliderGroupRef.current.style.width = width + 'px'
  }
  // 初始化better-scroll
  _initialBScroll = () => {
    this.slider = new BScroll(this.sliderRef.current, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: this.props.loop,
        speed: 400,
        threshold: 0.3
      }
    })

    // 修改小圆点激活的位置
    this.slider.on('scrollEnd', () => {
      let currentIndex = this.slider.getCurrentPage().pageX
      this.setState({
        currentIndex
      })
    })
  }
  // 自动轮播
  _autoPlay = () => {
    this.timer = setInterval(() => {
      this.slider.next(400)
    }, this.props.interval);
  }
  render() {
    const { currentIndex } = this.state
    return (
      <div className="slider" ref={this.sliderRef}>
        <div className="slider-group" ref={this.sliderGroupRef}>
          {
            React.Children.map(this.props.children, (Child, index) => {
              return (
              <div className="slider-item" ref={this.sliderItemRefs[index]}>
                {Child}
              </div>)
            })
          }
        </div>
        <div className="dots">
          {
            this.dots.map((item, index) => {
              return (
                <span key={index} className={currentIndex === index ? 'dot active': 'dot'}></span>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Slider