import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch,HashRouter} from 'react-router-dom'
import './App.scss';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import NavBar from './components/NavBar/NavBar';
import MainView from './components/MainView/MainView';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDove, faDog, faCat } from '@fortawesome/free-solid-svg-icons';


class App extends Component {
  render() {
    return(
        <HashRouter basename={"/"}>
          <Switch>
              <Route exact path="/" component={MainView}/>
              <Route exact path="/profile" component={Profile}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
          </Switch>
        </HashRouter>
    )
  }
}

const fonts = [ faDove, faCat, faDog ];
library.add(fonts);

export default App;
