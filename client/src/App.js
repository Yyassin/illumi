import React, { createRef} from 'react';
import 'antd/dist/antd.dark.css';

import Titlebar from './components/Titlebar/Titlebar'
import './App.css'
import BaseRouter from './router/BaseRouter';
import {HashRouter } from 'react-router-dom';

class App extends React.Component {

  // state = {
  //   darkMode: true
  // }
  modeDiv = createRef()

  componentDidMount = () => {
    console.log(this.modeDiv)
    console.log(this.modeDiv.current)
  }
  toggleTheme = () => {
    this.modeDiv.current.classList.toggle('light-mode');
    // this.setState({
    //   darkMode: !this.state.darkMode,
    // });
    console.log(this.modeDiv.current)
  };

  render() {
    return (
      <HashRouter>
        <div className="App">          
          <div ref={this.modeDiv} className="">
            <BaseRouter toggleTheme = {this.toggleTheme}/>
          </div>
        </div>
      </HashRouter> 
    );
  }
}

export default App;
