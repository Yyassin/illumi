import React, { createRef} from 'react';
import 'antd/dist/antd.dark.css';

import Titlebar from './components/Titlebar/Titlebar'
import './App.css'
import BaseRouter from './router/BaseRouter';
import {HashRouter } from 'react-router-dom';

class App extends React.Component {

  state = {
    darkTheme: true
  }

  modeDiv = createRef()

  // componentDidMount = () => {
  // }

  toggleTheme = (child) => {
    
    // this.modeDiv.current.classList.toggle('light-theme');
    //=lse ifs-> add more themes (with refs and classlist)
    if (child.key === 'light') {
      //need to add to body since nav sits outside .app
      document.body.classList.add('light-theme')
      this.setState({
        darkTheme: false,
      });
    } else {
      document.body.classList.remove('light-theme')
      this.setState({
        darkTheme: true,
      });
    }
    
  };

  render() {
    return (
      <HashRouter>
        <div className="App">          
          <div className={this.state.darkTheme ? "dark-theme" : "light-theme"}>
            <BaseRouter darkTheme={this.state.darkTheme} toggleTheme = {this.toggleTheme}/>
          </div>
        </div>
      </HashRouter> 
    );
  }
}

export default App;
