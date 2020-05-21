import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainLayout from '../components/layout/Layout'
import Register from '../components/register/Register'



const BaseRouter = () => (
    <Switch>
        <Route path="/" component={Register}></Route>
        <Route path="/home" component={MainLayout}></Route>
    </Switch>
)

export default BaseRouter;