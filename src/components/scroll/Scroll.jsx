import React from 'react'
import PropTypes from 'prop-types'
import BSCroll from 'better-scroll'

export default class Scroll extends React.Component {
  static defaultProps = {
    probeType: 1, 
    click: true,
    data: [],
    listenScroll: false,
    pullup: false
  }
  static propTypes = {
    probeType: PropTypes.number.isRequired,
    click: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    listenScroll: PropTypes.bool.isRequired,
    pullup: PropTypes.bool.isRequired,
    onScroll: PropTypes.func,
    onScrollToEnd: PropTypes.func
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
      this.scroll && this.scroll.scrollTo.apply(this.BSCroll, arguments);
  }
  scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.BSCroll, arguments);
  }
  componentDidMount() {
    console.log('scroll mounted')
    this.scroll = new BSCroll(this.scrollRef.current, {
      click: this.props.click,
      probeType: this.props.probeType
    })

    if (this.listenScroll) {
      this.scroll.on('scroll', (pos) => {
        this.props.onScroll && this.props.onScroll(pos)
      })
    }

    if (this.pullup) {
      this.scroll.on('scrollEnd', (pos) => {
        this.props.onScrollToEnd && this.props.onScrollToEnd(pos)
      })
    }
  }
  componentWillReceiveProps() {
    console.log('receive props')
    this.scroll && this.scroll.refresh()
  }
  render() {
    console.log('render')
    return (
      <div ref={this.scrollRef} className="scroll__wrapper" style={{height: '100%', overflow: 'hidden'}}>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}