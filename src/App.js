import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch,HashRouter} from 'react-router-dom'
import './App.scss';
import Profile from './components/Profile'

class App extends Component {
  render() {
    return(
        <HashRouter basename={"/"}>
          <Switch>
            <Route exact path="/" component={Profile}/>
          </Switch>
        </HashRouter>
    )
  }
}

export default App;
