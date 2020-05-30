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
const ipcRenderer = window.require('electron').ipcRenderer


class InnerSidebar extends React.PureComponent {

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    logout = async () => {
        await this.props.signOut(this.props.accessToken)
    }

    notificationHandler = () => {
        console.log('noti')
        ipcRenderer.send('notification-send-event')
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
                            Welcome
                            <NavLink to="/home/"/>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Text Channels">
                            <Menu.Item key="3">General
                                <NavLink to="/home/"/>
                            </Menu.Item>
                            <Menu.Item key="4">Off-topic
                            <NavLink to="/home/2/"/>
                            </Menu.Item>
                            <Menu.Item key="5">Collaboration</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Lessons">
                            <Menu.Item key="6">Topic 1 - Limits</Menu.Item>
                            <Menu.Item key="8">Topic 2 - Derivative</Menu.Item>
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
                            <li className="avatar" ><a onClick={this.notificationHandler} href="#" className="avatar-btn"
                                style={{background: "url('https://images2.alphacoders.com/980/980117.jpg')",
                                'background-size': 'cover',
                                'background-position': 'center'}}></a></li>
                            <li className="profile-info">
                                <ul>
                                    <li className="info-name">Shrish Mohapatra</li>
                                    <li className="info-email">shrish.mohapatra@gmail.com</li>
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