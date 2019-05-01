import React, { Component } from 'react';
import { Route, Switch,HashRouter, Router} from 'react-router-dom'
import './App.scss';

import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import NavBar from './components/NavBar/NavBar';
import MainView from './components/MainView/MainView';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faCaretUp, faHome, faCommentAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import PetDetail from './components/PetDetail/PetDetail';
import SearchView from './components/SearchView/SearchView';
import DiscussionPosts from './components/DiscussionPosts/DiscussionPosts';


/**
 * reference: https://www.npmjs.com/package/history
 * https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4
 */

class App extends Component {
  render() {
    return(
        <HashRouter basename={"/"}>
          <Switch>
              <Route exact path="/" component={MainView}/>
              {/*<Route exact path="/profile" component={Profile}/>*/}
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path="/pet/:id" component={PetDetail}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/search" component={SearchView}/>
          </Switch>
        </HashRouter>
    )
  }
}


const fonts = [ faPencilAlt, faCaretUp, faCommentAlt, faHome, faSignOutAlt ];

library.add(fonts);

export default App;
