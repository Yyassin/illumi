import React from 'react';
import {Layout, Breadcrumb, Divider } from 'antd';

const Home = () => (
    <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>

        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                Home
        </div>
    </div>
)

export default Home;