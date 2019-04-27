import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch,HashRouter} from 'react-router-dom'
import './App.scss';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import MainView from './components/MainView/MainView';
import { library } from '@fortawesome/fontawesome-svg-core';


class App extends Component {
  render() {
    return(
        <HashRouter basename={"/"}>
          <Switch>
              <Route exact path="/" component={MainView}/>
              <Route exact path="/profile" component={Profile}/>
              <Route exact path="/login" component={Login}/>
          </Switch>
        </HashRouter>
    )
  }
}

export default App;
