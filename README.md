#### 使用stylus预处理
* 执行`npm run eject`导出create-react-app配置文件
* 安装stylus相关依赖
```shell
npm install stylus stylus-loader -D
或
yarn add stylus stylus-loader --dev
```
* 修改`config/webpack.config.js`文件，在`return`中找到module -> rules -> oneOf，我们可以参考sass的配置方法
```javascript
// sass
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
    },
    'sass-loader'
  ),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
},
// stylus
{
  test: /\.styl$/,
  use: getStyleLoaders(
    {
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
    },
    'stylus-loader'
  ),
    sideEffects: true
}
```

#### 创建顶部导航
header和tob组件，这两个组件都相对比较简单，直接看代码
```jsx
export default class MHeader extends React.Component {
  render() {
    return (
      <div className="m-header">
        <div className="icons"></div>
        <h1 className="text">React Music</h1>
        <Link className="mine" to="/user">
          <i className="icon-mine"></i>
        </Link>
      </div>
    )
  }
}

export default class Tab extends Component {
  render() {
    return (
      <div className="tab">
        <NavLink className="tab-item" to="/recommend">
          <span className="tab-link">推荐</span>
        </NavLink>
        <NavLink className="tab-item" to="/singer">
          <span className="tab-link">歌手</span>
        </NavLink>
        <NavLink className="tab-item" to="/rank">
          <span className="tab-link">榜单</span>
        </NavLink>
        <NavLink className="tab-item" to="/search">
          <span className="tab-link">搜索</span>
        </NavLink>
      </div>
    )
  }
}
```
接下来我们需要创建4个页面，Recommend、Singer、Rank、Search
```jsx
// Recommend
class Recommend extends React.Component {
  render() {
    return (
      <div>Recommend</div>
    )
  }
}

export default Recommend

// Singer
class Singer extends React.Component {
  render() {
    return (
      <div>Singer</div>
    )
  }
}

export default Singer

// Search
import React from 'react'

class Search extends React.Component {
  render() {
    return (
      <div>Search</div>
    )
  }
}

export default Search

// Rank
import React from 'react'

class Rank extends React.Component {
  render() {
    return (
      <div>rank</div>
    )
  }
}

export default Rank
```
然后在App中配置路由
```jsx
function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <MHeader />
        <Tab />
        <Switch>
          <Route path="/recommend" component={Recommend}/>
          <Route path="/singer" component={Singer} />
          <Route path="/rank" component={Rank}/>
          <Route path="/search" component={Search} />
          <Redirect to="/recommend" />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
}

```
这样就完成了基础的导航功能了

#### Recommend页面开发
* 封装滚动组件
为什么先要封装Scroll组件呢？ 因为项目中很多地方要要用到滚动组件，所以，先封装了再说
Scroll使用了better-scroll这个库，better-scroll 是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件。
```shell
npm install better-scroll
```
better-scroll的相关文档请戳: [better-scroll文档](http://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll%20%E6%98%AF%E4%BB%80%E4%B9%88)

```jsx
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
```

Scroll向外暴露和一些方法，为了方便可以操作滚动动作。

Scroll还在componentWillReceiveProps中，刷新better-scroll，主要是为了在网络延迟的情况下，当数据请求回来页面重新渲染时，better-scroll能重新计算并正常滚动

* 轮播图组件开发

Recommend页面分为两部分，轮播图和推荐列表，轮播图图部分我们可以封装一个轮播图组件来完成

轮播图组件用到了better-scroll库

[Slider组件](https://github.com/sanfengliao/react-music/blob/master/src/components/slider/Slider.jsx)

* 推荐页面的开发

完成Scroll和轮播图组件后，就可以开发recommed页面

[Recommend页面](https://github.com/sanfengliao/react-music/blob/master/src/pages/recommend/Recommend.jsx)

