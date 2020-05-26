import React from 'react';
import { Layout, Breadcrumb } from 'antd';

const { Header } = Layout;

class InnerHeader extends React.Component {
    render() {
        return (
            <Header className="main-header">
                <Breadcrumb style={{ margin: '0 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
            </Header>
        )
    }
}

export default InnerHeader;