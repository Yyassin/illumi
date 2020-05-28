import React from 'react';
import { Layout, Breadcrumb } from 'antd';

const { Header } = Layout;

class InnerHeader extends React.Component {
    render() {
        return (
            <Header className="main-header" className="main-header">
                <Breadcrumb style={{ margin: '0 0' }}>
                    <Breadcrumb.Item className="header-bold">Server</Breadcrumb.Item>
                    <Breadcrumb.Item>Name</Breadcrumb.Item>
                </Breadcrumb>
            </Header>
        )
    }
}

export default InnerHeader;