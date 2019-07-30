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