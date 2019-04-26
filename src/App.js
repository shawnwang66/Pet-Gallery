import React, { Component,ScrollView } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { library } from '@fortawesome/fontawesome-svg-core'


class App extends Component {
  render() {
    return (
        <div className='main'>
          <NavBar expanded={true}/>
        </div>

    );
  }
}

export default App;
