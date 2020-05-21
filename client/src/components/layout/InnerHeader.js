import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

class InnerHeader extends React.Component {
    render() {
        return (
            <Header className="site-layout-background" style={{ padding: 0 }} />
        )
    }
}

export default InnerHeader;