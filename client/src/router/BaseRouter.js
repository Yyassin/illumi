import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainLayout from '../components/layout/Layout'
import RegisterLayout from '../components/register/RegisterLayout'

const BaseRouter = () => (
    <Switch>
        <Route exact path="/" component={RegisterLayout}></Route>
        <Route exact path="/signin" component={RegisterLayout}></Route>
        <Route path="/home" component={MainLayout}></Route>
    </Switch>
)

export default BaseRouter;