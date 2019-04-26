import React, { Component,ScrollView } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import MainView from './components/MainView/MainView'
import { library } from '@fortawesome/fontawesome-svg-core'


class App extends Component {
  render() {
    return (
        <div className='main'>
          <NavBar expanded={true}/>
          <MainView/>
        </div>

    );
  }
}

export default App;
