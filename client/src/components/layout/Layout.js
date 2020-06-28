import React from 'react';
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import './Layout.css'

import {signOut} from "../../store/actions/authActions";

import {
  init, clearSession, toggleLoading, 
  selectServer, selectPage, 
  addServer, editServer, deleteServer, leaveServer,
  addPage, editPage, deletePage, addRoom,
  addEvent, editEvent, deleteEvent,
  editProfile, deleteMessage,
  editMember, addInvite, acceptInvite,
  declineInvite
} from "../../store/actions/coreActions";

import {connect} from "react-redux";
import io from 'socket.io-client';

import InnerRouter from '../../router/InnerRouter'
import Page from '../dash/Page'
import Sidebar from "./Sidebar";
import InnerSidebar from './InnerSidebar';
import InnerHeader from './InnerHeader';
import Titlebar from '../Titlebar/Titlebar'

/*

#1: socket emit during every dispatch

#2: socket emit called from backend after every call to server

*/

const { Content } = Layout;

class MainLayout extends React.Component {

  socket;

  componentDidMount = () => {
    this.socket = io.connect("http://localhost:4000");
    console.log(this.socket.connected)
    this.initSocket();
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
    this.props.init(this.props.uid, this.props.accessToken);
  }

  endSession = async() => {
    console.log('end session')
    this.socket.emit('forceDisconnect')

    await this.props.signOut()  
    console.log(this.props.uid)
    this.props.clearSession()
  }

  // server CRUD
  addServer = async(serverData) => {
    this.props.addServer(serverData, this.props.uid, this.props.accessToken)
  }

  editServer = async(serverData, serverID) => {
    this.props.editServer(serverData, serverID, this.props.accessToken)
  }

  deleteServer = async(serverID, serverIndex) => {
    this.props.deleteServer(serverID, serverIndex, this.props.accessToken)
  }

  leaveServer = async(memberID, serverIndex) => {
    this.props.leaveServer(memberID, serverIndex, this.props.accessToken)
  }

  // page CRUD
  addPage = async(pageData) => {
    this.props.addPage(pageData, this.props.data.user.members[this.props.serverIndex].server.id, this.props.accessToken)
  }

  editPage = async(pageData, pageID) => {
    this.props.editPage(pageData, pageID, this.props.accessToken)
  }

  deletePage = async(pageID) => {
    this.props.deletePage(pageID, this.props.accessToken)
  }

  addRoom = async(pageID) => {
    this.props.addRoom(pageID, this.props.accessToken)
  }

  //event CRUD
  addEvent = async(eventData) => {
    this.props.addEvent(eventData, this.props.data.user.members[this.props.serverIndex].server.id, this.props.accessToken)
  }

  editEvent = async(eventData, eventID) => {
    this.props.editEvent(eventData, eventID, this.props.accessToken)
  }

  deleteEvent = async(eventID) => {
    this.props.deleteEvent(eventID, this.props.accessToken)
  }

  editProfile = async(profileData) => {
    this.props.editProfile(profileData, this.props.uid, this.props.accessToken)
  }  
  
  deleteMessage = async(messageID) => {
    this.props.deleteMessage(messageID, this.props.accessToken)
  }

  editMember = async(memberData, memberID) => {
    this.props.editMember(memberData, memberID, this.props.accessToken)
  }

  addInvite = async(inviteData, senderID) => {
    this.props.addInvite(inviteData, senderID, this.props.accessToken)
  }

  acceptInvite = async(inviteID) => {
    this.props.acceptInvite(inviteID, this.props.accessToken)
  }

  declineInvite = async(inviteID) => {
    this.props.declineInvite(inviteID, this.props.accessToken)
  }

  render() {
    if (!this.props.auth) return <Redirect to='/'/> 
      return (        
        <div>
          <Titlebar bg={["#171a1c", "#141618"]} title={"illumi"} />
          <Layout className="main-layout">            
              <Sidebar
                bg={["#171a1c", "#141618"]}
                members={this.props.data.user.members}

                selectServer={this.props.selectServer}
                serverIndex={this.props.serverIndex}

                addServer={this.addServer}
                deleteServer={this.deleteServer}
                editServer={this.editServer}
                leaveServer={this.leaveServer}
                />

              <InnerSidebar 
                server={this.props.data.user.members[this.props.serverIndex].server}
                selectPage={this.props.selectPage}
                user={this.props.data.user}
                collapsed={false}
                signout={this.endSession}
                addPage={this.addPage}
                editProfile = {this.editProfile}
                addInvite={this.addInvite}
                acceptInvite={this.acceptInvite}
                declineInvite={this.declineInvite}
                />

              <Layout className="inner-layout">
                  <InnerHeader 
                    server={this.props.data.user.members[this.props.serverIndex].server}
                    page={this.props.data.user.members[this.props.serverIndex].server.pages[this.props.pageIndex]}
                    addPage={this.addPage}
                    editPage={this.editPage}
                    deletePage={this.deletePage}
                    addRoom={this.addRoom}
                    />

                  <Content className="main-content">                  
                      <InnerRouter 
                        page={this.props.data.user.members[this.props.serverIndex].server.pages[this.props.pageIndex]}
                        server={this.props.data.user.members[this.props.serverIndex].server}
                        uid={this.props.uid}
                        member={this.props.data.user.members[this.props.serverIndex]}
                        token={this.props.accessToken}
                        signout={this.endSession}
                        addEvent={this.addEvent}
                        deleteEvent={this.deleteEvent}
                        editEvent={this.editEvent}
                        deleteMessage={this.deleteMessage}
                        editMember={this.editMember}
                        />
                  </Content>

              </Layout>
          </Layout>
        </div>
      );
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
        clearSession: () => dispatch(clearSession()),

        toggleLoading: () => dispatch(toggleLoading()),

        selectServer: (index) => dispatch(selectServer(index)),
        selectPage: (index) => dispatch(selectPage(index)),

        addServer: (serverData, uid, token) => dispatch(addServer(serverData, uid, token)),
        addPage: (pageData, serverID, token) => dispatch(addPage(pageData, serverID, token)),
        addRoom: (pageID, token) => dispatch(addRoom(pageID, token)),
        addEvent: (eventData, serverID, token) => dispatch(addEvent(eventData, serverID, token)),
        addInvite: (inviteData, senderID, token) => dispatch(addInvite(inviteData, senderID, token)),
        
        acceptInvite: (inviteID, token) => dispatch(acceptInvite(inviteID, token)),
        declineInvite: (inviteID, token) => dispatch(declineInvite(inviteID, token)),

        leaveServer: (memberID, serverIndex, token) => dispatch(leaveServer(memberID, serverIndex, token)),

        editProfile: (profileData, uid, token) => dispatch(editProfile(profileData, uid, token)),
        editServer: (serverData, serverID, token) => dispatch(editServer(serverData, serverID, token)),
        editPage: (pageData, pageID, token) => dispatch(editPage(pageData, pageID, token)),
        editEvent: (eventData, eventID, token) => dispatch(editEvent(eventData, eventID, token)),
        editMember: (memberData, memberID, token) => dispatch(editMember(memberData, memberID, token)),

        deleteServer: (serverID, serverIndex, token) => dispatch(deleteServer(serverID, serverIndex, token)),
        deletePage: (pageID, token) => dispatch(deletePage(pageID, token)),
        deleteEvent: (eventID, token) => dispatch(deleteEvent(eventID, token)),
        deleteMessage: (messageID, token) => dispatch(deleteMessage(messageID, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
