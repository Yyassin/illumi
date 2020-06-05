import React from 'react';
import { Layout, Breadcrumb } from 'antd';

const { Header } = Layout;

class InnerHeader extends React.Component {
    render() {
        return (
            <Header className="main-header">
                <Breadcrumb style={{ margin: '0 0' }}>
                    <Breadcrumb.Item className="header-bold">{ this.props.server.name }</Breadcrumb.Item>
                    <Breadcrumb.Item className="header-light">{ this.props.page.title }</Breadcrumb.Item>
                </Breadcrumb>
            </Header>
        )
    }
}

export default InnerHeader;