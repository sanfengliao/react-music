import React from 'react'
import PropTypes from 'prop-types'
import BSCroll from 'better-scroll'

export default class Scroll extends React.Component {
  static defaultProps = {
    probeType: 1, 
    click: true,
    data: [],
    listenScroll: false,
    pullup: false,
    overflowHidden: true
  }
  static propTypes = {
    probeType: PropTypes.number.isRequired,
    click: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    listenScroll: PropTypes.bool.isRequired,
    pullup: PropTypes.bool.isRequired,
    onScroll: PropTypes.func,
    onScrollToEnd: PropTypes.func,
    overflowHidden: PropTypes.bool
  }
  constructor(props) {
    super(props)
    this.scrollTo = this.scrollTo.bind(this)
    this.scrollToElement = this.scrollToElement.bind(this)
    this.scrollRef = React.createRef()
  }
  refresh = () => {
    this.scroll && this.scroll.refresh();
  }
  enable = () => {
    this.scroll && this.scroll.enable();
  }
  disable = () => {
    this.scroll && this.scroll.disable();
  }
  scrollTo() {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
  }
  scrollToElement() {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
  }
  componentDidMount() {
    this.scroll = new BSCroll(this.scrollRef.current, {
      click: this.props.click,
      probeType: this.props.probeType
    })

    if (this.props.listenScroll) {
      this.scroll.on('scroll', (pos) => {
        this.props.onScroll && this.props.onScroll(pos)
      })
    }

    if (this.props.pullup) {
      this.scroll.on('scrollEnd', (pos) => {
        this.props.onScrollToEnd && this.props.onScrollToEnd(pos)
      })
    }
  }
  /* 优化 */
  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data
  }
  componentDidUpdate() {
    this.scroll && this.scroll.refresh()
  }
  render() {
    let overflow = this.props.overflowHidden ? 'hidden' : ''
    return (
      <div ref={this.scrollRef} className="scroll__wrapper" style={{width: '100%', height: '100%', overflow: overflow}}>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}