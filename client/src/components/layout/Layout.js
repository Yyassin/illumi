import React from 'react';
import { Layout, Breadcrumb } from 'antd';

import Sidebar from "./Sidebar";
import InnerHeader from "./Header";

const { Content, Footer } = Layout;

class MainLayout extends React.Component {
  render() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar/>
            {/* <InnerSidebar/> */}

            <Layout className="site-layout">
                <InnerHeader/>

                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    Bill is a cat.
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>Youfapatra ©2020 Created by Us</Footer>
            </Layout>
        </Layout>
    );
  }
}

export default MainLayout;