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
import Titlebar from '../Titlebar/Titlebar'

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
      <div>
        <Titlebar bg={this.props.darkTheme ? ["#171a1c", "#141618"] : ["#ECECEC", "#DCDCDC"]} title={"illumi"} />
        <Layout className="main-layout">            
            <Sidebar bg={["#171a1c", "#141618"]} />
            <InnerSidebar collapsed={this.state.collapsed} toggleTheme={this.props.toggleTheme}/>

            <Layout className="inner-layout">
                <InnerHeader></InnerHeader>

                <Content className="main-content">                  
                    <InnerRouter />
                </Content>

            </Layout>
        </Layout>
      </div>
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