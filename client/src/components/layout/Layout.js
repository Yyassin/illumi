import React from 'react';
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import './Layout.css'

import {signOut} from "../../store/actions/authActions";
import {init, toggleLoading, selectServer, selectPage} from "../../store/actions/coreActions";
import {connect} from "react-redux";

//import InnerRouter from '../../router/InnerRouter
import Chat from '../dash/Chat'
import Sidebar from "./Sidebar";
import InnerSidebar from './InnerSidebar';
import InnerHeader from './InnerHeader';
import Titlebar from '../Titlebar/Titlebar'

const { Content } = Layout;

class MainLayout extends React.Component {

  state = {
    collapsed: false,
    data: {},
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount = async() => {
    this.fetchData()
  }

  fetchData = async() => {
    console.log('fetching data')
    await this.props.toggleLoading()
    this.props.init(this.props.uid, this.props.accessToken)
  }


  render() {
    if (!this.props.auth) return <Redirect to='/'/>
    if (!this.props.data) {
      console.log('loading...')
      return (
        <div style={{background: "#000", height: "100vh"}}></div>
      )
  
    } else {
      
      return (        
        <div>
          <Titlebar bg={["#171a1c", "#141618"]} title={"illumi"} />
          <Layout className="main-layout">            
              <Sidebar
                bg={["#171a1c", "#141618"]}
                members={this.props.data.user.members}
                selectServer={this.props.selectServer}
                serverIndex={this.props.serverIndex}
                />

              <InnerSidebar 
                server={this.props.data.user.members[this.props.serverIndex].server}
                selectPage={this.props.selectPage}
                user={this.props.data.user}
                collapsed={this.state.collapsed}
                signout={this.props.signOut}/>

              <Layout className="inner-layout">
                  <InnerHeader 
                    server={this.props.data.user.members[this.props.serverIndex].server}
                    page={this.props.data.user.members[this.props.serverIndex].server.pages[this.props.pageIndex]}
                    />

                  <Content className="main-content">                  
                      <Chat 
                        page={this.props.data.user.members[this.props.serverIndex].server.pages[this.props.pageIndex]}
                        uid={this.props.uid}
                        />
                  </Content>

              </Layout>
          </Layout>
        </div>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
