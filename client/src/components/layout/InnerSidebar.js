import React from 'react';
import {Layout, Menu} from "antd";
import {NavLink, Redirect,} from 'react-router-dom'
import {signOut} from "../../store/actions/authActions";
import {connect} from "react-redux";

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

class InnerSidebar extends React.Component {

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    logout = async () => {
        await this.props.signOut(this.props.accessToken)
    }

    render() {
        if (!this.props.auth) return <Redirect to='/'/>
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />} onClick={this.logout}/>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <NavLink to="/home/2/"/>
                    </Menu.Item>
                    <Menu.Item key="10" icon={<DesktopOutlined />}>
                        <NavLink to="/home/3/"/>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />} />
                </Menu>
            </Sider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.auth.accessToken,
        auth: state.auth.auth,
        authMsg: state.auth.authMsg,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (token) => dispatch(signOut(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InnerSidebar);