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
    loop: PropTypes.bool.isRequired,
    autoPlay: PropTypes.bool.isRequired,
    interval: PropTypes.number.isRequired
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
  _initialSliderWidth = () => {
    const { children } = this.props
    let clientWidth = this.sliderRef.current.clientWidth
    for (let i = 0; i < children.length; ++i) {
      this.sliderItemRefs[i].current.style.width = clientWidth + 'px'
    }
    let width = children.length * clientWidth
    if (this.props.loop) {
      width += 2 * clientWidth
    }
    this.sliderGroupRef.current.style.width = width + 'px'
  }
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
    this.slider.on('scrollEnd', () => {
      let currentIndex = this.slider.getCurrentPage().pageX
      this.setState({
        currentIndex
      })
    })
  }
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