import React from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Row, Tooltip } from 'antd';
import {
    PlusOutlined,
} from '@ant-design/icons';
import './Welcome.css'

import {signOut} from "../../store/actions/authActions";
import {init, toggleLoading, selectServer, selectPage, addServer, acceptInvite, declineInvite} from "../../store/actions/coreActions";
import {connect} from "react-redux";

import Titlebar from '../Titlebar/Titlebar'
import Animation from '../register/Animation'
import AcceptInvite from './AcceptInvite'
import ServerForm from '../forms/ServerForm'

import io from 'socket.io-client'


class WelcomeLayout extends React.Component {
    formRef = React.createRef();
    initServer = React.createRef();

    socket;

    state = {
        showModal: false,

        formType: '',

        member: '', //alernative            ?       ?       ?

        server: '',
        serverIndex: 0,

        // modal fields
        name: '',
        description: '',
        outline: '',
        thumbnail: 'https://images-platform.99static.com//rQ20qavEFmVRazKkSzI0jmA7l50=/654x67:1154x567/fit-in/590x590/projects-files/33/3395/339514/fd6c37dc-e06c-4af0-9616-bf1d1217b8ba.png',
    }

    // socket
    componentDidMount = () => {
        this.socket = io.connect("http://illumi2.canadaeast.cloudapp.azure.com/");
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

    //server
    addServer = async(serverData) => {
        this.props.addServer(serverData, this.props.uid, this.props.accessToken)
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

    createForm = async () => {
        this.setState({
            showModal: true,
            formType: 'create',
            server: '',
        });        
    }

    // modal controller

    onModalChange = values => {
        this.setState({[values.target.id]: values.target.value})
    }

    handleOk = async (e) => {
        this.setState({
            showModal: false,
        });

        const formData = this.formRef.current.getFieldsValue()
        await this.addServer(formData)


        this.setState({
            showModal: false,
            name: '',
            description: '',
            outline: '',
            thumbnail: 'https://images-platform.99static.com//rQ20qavEFmVRazKkSzI0jmA7l50=/654x67:1154x567/fit-in/590x590/projects-files/33/3395/339514/fd6c37dc-e06c-4af0-9616-bf1d1217b8ba.png',
        });
    };

    handleCancel = e => {
        this.setState({
            showModal: false,
        });

        // if(this.formRef.current) {
        //     this.formRef.current.resetFields()
        // }
    };

    render() {
        //return <Redirect to='/'/>
        if (!this.props.auth) return <Redirect to='/'/> 
        if (!this.props.data) return this.renderLoading()        
        if (this.checkServers()) return <Redirect to='/home'/>
        return (
            <div>                              
                <div className="register-bg"></div>
                <Animation/>
                <Titlebar bg={"transparent"} />

                <Row className="welcome-page">
                    <Card bordered={false} className="welcome-card">
                        <h1 className="welcome-title">Welcome Page</h1>
                        <p className="welcome-greet">Nice to see you again!</p>
                        <a href="/signin">Go Back</a>
                    </Card>   
                </Row>

                <Tooltip placement="rightTop" title="Create Server">
                    <li id="create" onClick={this.createForm}>
                        <p  className="server-thumbnail create-server"
                            style={{background: `#333`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'}}><PlusOutlined /></p>
                    </li>
                </Tooltip>

                <AcceptInvite
                    user={this.props.data.user}
                    acceptInvite={this.acceptInvite}
                    declineInvite={this.declineInvite}
                />
                <ServerForm
                    ref = {this.initServer}
                    visible={this.state.showModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    onModalChange={this.onModalChange}
                    formRef={this.formRef}
                    formType={this.state.formType}
                    welcome={true}
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

        addServer: (serverData, uid, token) => dispatch(addServer(serverData, uid, token)),

        acceptInvite: (inviteID, token) => dispatch(acceptInvite(inviteID, token)),
        declineInvite: (inviteID, token) => dispatch(declineInvite(inviteID, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeLayout);
 