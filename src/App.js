import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Switch,HashRouter} from 'react-router-dom'

import './App.scss';

import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';

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

              <Route exact path="/pet/:id" component={PetDetail}/>

              <Route exact path='/search' onUpate = {() => window.scrollTo(0,0)} component = {SearchView}/>

              <Route exact path="/login" component={Login}/>
          </Switch>
        </HashRouter>
    )
  }
}

export default App;
