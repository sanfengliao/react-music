import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import MHeader from './components/m-header/Header'
import Tab from './components/tab/Tab'

import './App.styl'
import Recommend from './pages/recommend/Recommend';
import SingerList from './pages/singer-list/SingerList'
import Rank from './pages/rank/Rank';
import Search from './pages/search/Search';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <MHeader />
        <Tab />
        <Switch>
          <Route path="/recommend" component={Recommend}/>
          <Route path="/singer" component={SingerList} />
          <Route path="/rank" component={Rank}/>
          <Route path="/search" component={Search} />
          <Redirect to="/recommend" />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
