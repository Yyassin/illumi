import React from 'react';
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import './Layout.css'

import {signOut} from "../../store/actions/authActions";

import {
  init, clearSession, toggleLoading, 
  selectServer, selectPage, 
  addServer, editServer, deleteServer, 
  addPage, editPage, deletePage,
  editProfile, deleteMessage,
  editMember, addInvite, acceptInvite
} from "../../store/actions/coreActions";

import {connect} from "react-redux";

//import InnerRouter from '../../router/InnerRouter
import Page from '../dash/Page'
import Sidebar from "./Sidebar";
import InnerSidebar from './InnerSidebar';
import InnerHeader from './InnerHeader';
import Titlebar from '../Titlebar/Titlebar'

const { Content } = Layout;

class MainLayout extends React.Component {

  fetchData = async() => {
    this.props.init(this.props.uid, this.props.accessToken);
  }

  endSession = async() => {    
    await this.props.signOut()
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

                fetchData = {this.fetchData}
                />

              <InnerSidebar 
                server={this.props.data.user.members[this.props.serverIndex].server}
                selectPage={this.props.selectPage}
                user={this.props.data.user}
                collapsed={false}
                signout={this.endSession}
                addPage={this.addPage}
                fetchData = {this.fetchData}
                editProfile = {this.editProfile}
                addInvite={this.addInvite}
                acceptInvite={this.acceptInvite}
                />

              <Layout className="inner-layout">
                  <InnerHeader 
                    server={this.props.data.user.members[this.props.serverIndex].server}
                    page={this.props.data.user.members[this.props.serverIndex].server.pages[this.props.pageIndex]}
                    fetchData = {this.fetchData}
                    addPage={this.addPage}
                    editPage={this.editPage}
                    deletePage={this.deletePage}
                    />

                  <Content className="main-content">                  
                      <Page 
                        page={this.props.data.user.members[this.props.serverIndex].server.pages[this.props.pageIndex]}
                        server={this.props.data.user.members[this.props.serverIndex].server}
                        uid={this.props.uid}
                        member={this.props.data.user.members[this.props.serverIndex]}
                        token={this.props.accessToken}
                        signout={this.endSession}
                        deleteMessage={this.deleteMessage}
                        editMember={this.editMember}
                        fetchData = {this.fetchData}
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
        addInvite: (inviteData, senderID, token) => dispatch(addInvite(inviteData, senderID, token)),
        
        acceptInvite: (inviteID, token) => dispatch(acceptInvite(inviteID, token)),

        editProfile: (profileData, uid, token) => dispatch(editProfile(profileData, uid, token)),
        editServer: (serverData, serverID, token) => dispatch(editServer(serverData, serverID, token)),
        editPage: (pageData, pageID, token) => dispatch(editPage(pageData, pageID, token)),
        editMember: (memberData, memberID, token) => dispatch(editMember(memberData, memberID, token)),

        deleteServer: (serverID, serverIndex, token) => dispatch(deleteServer(serverID, serverIndex, token)),
        deletePage: (pageID, token) => dispatch(deletePage(pageID, token)),
        deleteMessage: (messageID, token) => dispatch(deleteMessage(messageID, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
