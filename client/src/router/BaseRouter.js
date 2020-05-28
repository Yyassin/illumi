import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainLayout from '../components/layout/Layout'
import RegisterLayout from '../components/register/RegisterLayout'
import { OmitProps } from 'antd/lib/transfer/renderListBody';

const BaseRouter = (props) => (
    <Switch>
        <Route exact path="/" component={RegisterLayout}></Route>
        <Route exact path="/signin" component={RegisterLayout}></Route>
        <Route path="/home" component={() => <MainLayout toggleTheme={props.toggleTheme}/>}></Route>
    </Switch>
)

export default BaseRouter;