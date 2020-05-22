import React from 'react';
import { Layout, Breadcrumb } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import InnerRouter from '../../router/InnerRouter'
import Sidebar from "./Sidebar";
import InnerSidebar from './InnerSidebar';

const { Content, Footer, Header } = Layout;

class MainLayout extends React.Component {

  state = {
    collapsed: true,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar/>
            <InnerSidebar collapsed={this.state.collapsed}/>

            <Layout className="site-layout">
                <Header style={{padding:"0 16px"}}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
            })}
                </Header>

                <Content style={{ margin: '0 16px' }}>
                <InnerRouter />
                </Content>

                <Footer style={{ textAlign: 'center' }}>Youfapatra ©2020 Created by Us</Footer>
            </Layout>
        </Layout>
    );
  }
}

export default MainLayout;