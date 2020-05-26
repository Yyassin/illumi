import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Chat from '../components/dash/Chat'
import Home2 from '../components/dash/Home2'

const InnerRouter = () => (
    <Switch>
        <Route exact path="/home/" component={Chat}></Route>
        <Route exact path="/home/2/" component={Home2}></Route>
        <Route exact path="/home/3/" component={Chat}></Route>
    </Switch>
)

export default InnerRouter;