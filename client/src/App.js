import React from 'react';
import 'antd/dist/antd.dark.less';

import './App.css'
import BaseRouter from './router/BaseRouter';
import {HashRouter } from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <div className="App">          
          <div>
            <BaseRouter/>
          </div>
        </div>
      </HashRouter> 
    );
  }
}

export default App;
