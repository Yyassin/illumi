import React from 'react';
import 'antd/dist/antd.dark.css';

import Titlebar from './components/Titlebar/Titlebar'
import './App.css'
import BaseRouter from './router/BaseRouter';
import {HashRouter } from 'react-router-dom';

class App extends React.Component {

  state = {
    darkMode: true
  }

  render() {
    return (
      <HashRouter>
        <div className="App">          
          <div className={this.state.darkMode ? " ": "light-mode"}>
            <BaseRouter />
          </div>
        </div>
      </HashRouter> 
    );
  }
}

export default App;
