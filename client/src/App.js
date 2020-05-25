import React from 'react';
import 'antd/dist/antd.dark.css';

import Titlebar from './components/Titlebar/Titlebar'
import './App.css'
import BaseRouter from './router/BaseRouter';
import {HashRouter} from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <div className="App">
          <Titlebar></Titlebar>
          <BaseRouter />
      </div>
    </HashRouter>
    
  );
}

export default App;
