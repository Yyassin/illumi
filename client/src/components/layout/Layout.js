import React from 'react';
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import './Layout.css'

import {signOut} from "../../store/actions/authActions";
import {init, clearSession, toggleLoading, selectServer, selectPage, addServer, addPage} from "../../store/actions/coreActions";
import {connect} from "react-redux";

//import InnerRouter from '../../router/InnerRouter
import Chat from '../dash/Chat'
import Sidebar from "./Sidebar";
import InnerSidebar from './InnerSidebar';
import InnerHeader from './InnerHeader';
import Titlebar from '../Titlebar/Titlebar'

const { Content } = Layout;

class MainLayout extends React.Component {

  endSession = async() => {    
    await this.props.signOut()
    this.props.clearSession()
  }

  addServer = async(serverData) => {
    this.props.addServer(serverData, this.props.uid, this.props.accessToken)
  }

  addPage = async(pageData) => {
    console.log(this.props.data.user.members[this.props.serverIndex].server.id)
    this.props.addPage(pageData, this.props.data.user.members[this.props.serverIndex].server.id, this.props.accessToken)
  }

  fetchData = async() => {
    this.props.init(this.props.uid, this.props.accessToken);
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
                />

              <Layout className="inner-layout">
                  <InnerHeader 
                    server={this.props.data.user.members[this.props.serverIndex].server}
                    page={this.props.data.user.members[this.props.serverIndex].server.pages[this.props.pageIndex]}
                    />

                  <Content className="main-content">                  
                      <Chat 
                        page={this.props.data.user.members[this.props.serverIndex].server.pages[this.props.pageIndex]}
                        uid={this.props.uid}
                        token={this.props.accessToken}
                        signout={this.endSession}
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
