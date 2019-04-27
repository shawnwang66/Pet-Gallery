import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch, HashRouter} from 'react-router-dom'
import './App.scss';
import Profile from './components/Profile/Profile'
import NavBar from './components/NavBar/NavBar';
import MainView from './components/MainView/MainView'
import SearchView from './components/SearchView/SearchView'

import { library } from '@fortawesome/fontawesome-svg-core'

// Reference: https://github.com/ReactTraining/react-router/issues/2019

class App extends Component {
  render() {
    return(
        <HashRouter basename={"/"}>
          <Switch>
              <Route exact path="/" component={MainView}/>
              <Route exact path="/profile" component={Profile}/>
              <Route exact path='/search' onUpate = {() => window.scrollTo(0,0)} component = {SearchView}/>
              <Route/>
          </Switch>
        </HashRouter>
    )
  }
}

export default App;
