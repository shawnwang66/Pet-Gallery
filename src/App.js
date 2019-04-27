import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch,HashRouter} from 'react-router-dom'
import './App.scss';
import Profile from './components/Profile/Profile'
import MainView from './components/MainView/MainView'


class App extends Component {
  render() {
    return(
        <HashRouter basename={"/"}>
          <Switch>
              <Route exact path="/" component={MainView}/>
              <Route exact path="/profile" component={Profile}/>
          </Switch>
        </HashRouter>
    )
  }
}

export default App;
