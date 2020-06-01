import React from 'react';
import {Layout, Menu} from "antd";
import {NavLink, Redirect,} from 'react-router-dom'

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

    notificationHandler = () => {
        console.log('noti')
        ipcRenderer.send('notification-send-event')
    }

    selectPage = async (e) => {
        this.props.selectPage(e.key)
    }

    render() {
        return (
            <Sider className="inner-sidebar" trigger={null} collapsible collapsed={this.props.collapsed} onCollapse={this.onCollapse}>
                <div className="sidebar-header">
                        <p className="sidebar-header-content">{this.props.server.name}</p>
                </div>

                <SidebarScrollbar style={{ width: '100%', height: '100%', overflow: 'hidden' }} bg={'#444444'} tc={'transparent'}>
                    <Menu className="inner-inner-menu" defaultSelectedKeys={['0']} mode="inline">
                        
                        {
                            
                            this.props.server.pages.map((page, index) => {
                                return (
                                    <Menu.Item key={index} onClick={this.selectPage} icon={<PieChartOutlined />}>
                                        {page.title}
                                    </Menu.Item>
                                )
                            })

                        }
                        
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Lessons">
                            <Menu.Item key="6">Topic 1 - Limits</Menu.Item>
                            <Menu.Item key="8">Topic 2 - Derivative</Menu.Item>
                        </SubMenu>

                    </Menu>
                </SidebarScrollbar>

                <div className="profile-section">
                        <ul className="profile-items">
                            <li className="avatar" ><a onClick={this.props.signout} href="#" className="avatar-btn"
                                style={{background: `url('${this.props.user.thumbnail}')`,
                                'background-size': 'cover',
                                'background-position': 'center'}}></a></li>
                            <li className="profile-info">
                                <ul>
                                    <li className="info-name">{this.props.user.name}</li>
                                    <li className="info-email">{this.props.user.email}</li>
                                </ul>
                            </li>
                            <li className="settings"><a onClick={this.props.toggleTheme} className="settings-btn" href="#">{<SettingFilled />}</a></li>
                        </ul>
                </div>
            </Sider>
        )
    }
}

export default InnerSidebar;