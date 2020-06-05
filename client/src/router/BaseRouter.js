import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainLayout from '../components/layout/Layout'
import RegisterLayout from '../components/register/RegisterLayout'
import WelcomeLayout from '../components/welcome/WelcomeLayout'

const BaseRouter = (props) => (
    <Switch>
        <Route exact path="/" component={RegisterLayout}></Route>
        <Route exact path="/signin" component={RegisterLayout}></Route>
        <Route exact path="/home" component={MainLayout}></Route>
        <Route exact path="/welcome" component={WelcomeLayout}></Route>
    </Switch>
)

export default BaseRouter;