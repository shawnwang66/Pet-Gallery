import React, { Component } from 'react';
import { Route, Switch,HashRouter} from 'react-router-dom'
import './App.scss';

import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import PetDetail from './components/PetDetail/PetDetail'
import MainView from './components/MainView/MainView';


class App extends Component {
  render() {
    return(
        <HashRouter basename={"/"}>
          <Switch>
              <Route exact path="/" component={MainView}/>
              <Route exact path="/profile" component={Profile}/>
              <Route exact path="/pet/:id" component={PetDetail}/>
              <Route exact path="/login" component={Login}/>
          </Switch>
        </HashRouter>
    )
  }
}

export default App;
