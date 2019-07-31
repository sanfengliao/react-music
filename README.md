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
```javascript
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
```javascript
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
```javascript
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