import React, { Fragment } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import MHeader from './components/m-header/Header'
import Tab from './components/tab/Tab'

import './App.styl'
import Recommend from './pages/recommend/Recommend';
import SingerList from './pages/singer-list/SingerList'
import Rank from './pages/rank/Rank';
import Search from './pages/search/Search';
import Player from './components/player/Player';
import UserCenter from './pages/user-center/UserCenter';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <MHeader />
        <Tab />
        <Route path="/" render={() => <Redirect to="/recommend" />} />
        <Route path="/recommend" children={(props) => <Recommend {...props} />} />
        <Route path="/singer" children={(props) => <SingerList {...props} />} />
        <Route path="/rank" children={(props) => <Rank {...props} />} />
        <Route path="/search" children={(props) => <Search {...props} />} />
        <Route path="/user" children={(props) => <UserCenter {...props} />}/>
        <Player />
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
