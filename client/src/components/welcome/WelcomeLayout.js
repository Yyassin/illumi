import React from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Row } from 'antd';
import './Welcome.css'

import {signOut} from "../../store/actions/authActions";
import {init, toggleLoading, selectServer, selectPage} from "../../store/actions/coreActions";
import {connect} from "react-redux";

import Titlebar from '../Titlebar/Titlebar'


class WelcomeLayout extends React.Component {

    componentDidMount = async() => {
        this.fetchData()
    }
    
    fetchData = async() => {
        await this.props.toggleLoading()
        this.props.init(this.props.uid, this.props.accessToken)
    }

    checkServers = () => {
        if(this.props.data.user.members.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        //return <Redirect to='/'/>
        if (!this.props.auth) return <Redirect to='/'/> 
        if (!this.props.data) return <div/>        
        if (this.checkServers()) return <Redirect to='/home'/>
        return (
            <div>
                <Titlebar bg={["#171a1c", "#141618"]} title={"illumi"} />

                <Row className="welcome-page">
                    <Card bordered={false} className="register-card">
                        <h1 className="welcome-title">Welcome Page</h1>
                        <p className="welcome-greet">Nice to see you again!</p>
                        <a href="/signin">Go Back</a>
                    </Card>   
                </Row>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // auth state
        accessToken: state.auth.accessToken,
        uid: state.auth.uid,
        auth: state.auth.auth,

        // core state
        loading: state.core.loading,
        data: state.core.data,
        serverIndex: state.core.serverIndex,
        pageIndex: state.core.pageIndex
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (token) => dispatch(signOut(token)),
        init: (uid, token) => dispatch(init(uid, token)),

        toggleLoading: () => dispatch(toggleLoading()),
        selectServer: (index) => dispatch(selectServer(index)),
        selectPage: (index) => dispatch(selectPage(index)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeLayout);
 