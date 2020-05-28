import React from 'react';
import {Layout, Menu} from "antd";
import {NavLink, Redirect,} from 'react-router-dom'
import {signOut} from "../../store/actions/authActions";
import {connect} from "react-redux";

import SidebarScrollbar from '../scrollbars/SidebarScrollbar'

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    SettingFilled,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

class InnerSidebar extends React.PureComponent {

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    logout = async () => {
        await this.props.signOut(this.props.accessToken)
    }

    render() {
        if (!this.props.auth) return <Redirect to='/'/>
        return (
            <Sider className="inner-sidebar" trigger={null} collapsible collapsed={this.props.collapsed} onCollapse={this.onCollapse}>
                <div className="sidebar-header">
                        <p className="sidebar-header-content">ServerName</p>
                </div>

                <SidebarScrollbar style={{ width: '100%', height: '100%', overflow: 'hidden' }} bg={'#444444'} tc={'transparent'}>
                    <Menu className="inner-inner-menu" defaultSelectedKeys={['1']} mode="inline">
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
                        <Menu.Item key="18" icon={<FileOutlined />} />
                        <Menu.Item key="11" icon={<FileOutlined />} />
                        <Menu.Item key="12" icon={<FileOutlined />} />
                        <Menu.Item key="13" icon={<FileOutlined />} />
                        <Menu.Item key="14" icon={<FileOutlined />} />
                        <Menu.Item key="15" icon={<FileOutlined />} />

                    </Menu>
                </SidebarScrollbar>

                <div className="profile-section">
                        <ul className="profile-items">
                            <li className="avatar"><a href="#" className="avatar-btn">{<UserOutlined />}</a></li>
                            <li className="profile-info">
                                <ul>
                                    <li>MyNameIs</li>
                                    <li>MyEmailIs</li>
                                </ul>
                            </li>
                            <li className="settings"><a onClick={this.props.toggleTheme} className="settings-btn" href="#">{<SettingFilled />}</a></li>
                        </ul>
                </div>
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