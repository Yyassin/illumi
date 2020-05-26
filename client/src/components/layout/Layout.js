import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import './Layout.css'

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import InnerRouter from '../../router/InnerRouter'
import Sidebar from "./Sidebar";
import InnerSidebar from './InnerSidebar';
import InnerHeader from './InnerHeader';

const { Content, Footer, Header } = Layout;

class MainLayout extends React.Component {

  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
        <Layout className="main-layout">
            <Sidebar/>
            <InnerSidebar collapsed={this.state.collapsed}/>

            <Layout className="inner-layout">
                <InnerHeader></InnerHeader>

                <Content className="main-content">
                <InnerRouter />
                </Content>

            </Layout>
        </Layout>
    );
  }
}

export default MainLayout;

{/* <Header style={{padding:"0 16px"}}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
            })}
                </Header> */}