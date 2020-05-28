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
  
  toggleTheme = () => {
    this.setState({
      darkMode: !this.state.darkMode,
    });
  };

  render() {
    return (
      <HashRouter>
        <div className="App">          
          <div className={this.state.darkMode ? " ": "light-mode"}>
            <BaseRouter toggleTheme = {this.toggleTheme}/>
          </div>
        </div>
      </HashRouter> 
    );
  }
}

export default App;
