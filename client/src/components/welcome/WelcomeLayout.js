import React from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Row } from 'antd';
import './Welcome.css'

import {signOut} from "../../store/actions/authActions";
import {init, toggleLoading, selectServer, selectPage, acceptInvite, declineInvite} from "../../store/actions/coreActions";
import {connect} from "react-redux";

import Titlebar from '../Titlebar/Titlebar'
import AcceptInvite from './AcceptInvite'

import io from 'socket.io-client';


class WelcomeLayout extends React.Component {

    socket;

    // socket
    componentDidMount = () => {
        this.socket = io.connect("http://localhost:4000");
        this.initSocket();
        this.fetchData();
      }
    
      componentWillUnmount = () => {
        
        this.socket.emit('forceDisconnect')
        this.socket.close();
      
      }
    
      initSocket = () => {
        this.socket.on('invalid token', () => {
            this.endSession();                    
        })
    
        this.socket.on("refresh", () => {
          this.fetchData()
        })
      }
    
      fetchData = async() => {
        await this.props.toggleLoading()
        this.props.init(this.props.uid, this.props.accessToken);
      }
    
      endSession = async() => {
        console.log('end session')
        this.socket.emit('forceDisconnect')
    
        await this.props.signOut()  
        console.log(this.props.uid)
        this.props.clearSession()
      }

    // invites
    acceptInvite = async(inviteID) => {
        this.props.acceptInvite(inviteID, this.props.accessToken)
    }
    
    declineInvite = async(inviteID) => {
        this.props.declineInvite(inviteID, this.props.accessToken)
    }

    checkServers = () => {
        if(this.props.data.user.members.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    renderLoading() {
        return (
        <div className="container">
            <svg className="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                <circle cx="170" cy="170" r="160" stroke="#7289da"/>
                <circle cx="170" cy="170" r="135" stroke="#2c2f33 "/>
                <circle cx="170" cy="170" r="110" stroke="#7289da"/>
                <circle cx="170" cy="170" r="85" stroke="#2c2f33"/>
            </svg>            
        </div>
        )
    }

    render() {
        //return <Redirect to='/'/>
        if (!this.props.auth) return <Redirect to='/'/> 
        if (!this.props.data) return this.renderLoading()        
        if (this.checkServers()) return <Redirect to='/home'/>
        return (
            <div>
                <Titlebar bg={["#171a1c", "#141618"]} title={"illumi"} />

                <Row className="welcome-page">
                    <Card bordered={false} className="welcome-card">
                        <h1 className="welcome-title">Welcome Page</h1>
                        <p className="welcome-greet">Nice to see you again!</p>
                        <a href="/signin">Go Back</a>
                    </Card>   
                </Row>

                <AcceptInvite
                    user={this.props.data.user}
                    acceptInvite={this.acceptInvite}
                    declineInvite={this.declineInvite}
                />
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

        acceptInvite: (inviteID, token) => dispatch(acceptInvite(inviteID, token)),
        declineInvite: (inviteID, token) => dispatch(declineInvite(inviteID, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeLayout);
 