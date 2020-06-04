import React from 'react';
import {Layout, Menu, Tooltip} from "antd";
import {NavLink, Redirect,} from 'react-router-dom'

import SidebarScrollbar from '../scrollbars/SidebarScrollbar'
import NavMenu from './NavMenu'

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

    state = {
        pages: {},
        /*
        pages = {
            lessons: [
                page1
                [age2]
            ],
            tutorials: [
                page1
                [age2]
            ],
        }

        forloop (tag in pages)
            create submenu
            forloop (page in tag's pages)
                create menu

        */
    }

    componentDidMount = () => {
        let newPages = {};
        
        this.props.server.pages.map((page) => {
            if(page.tag in this.state.pages){
                //console.log("is in: " + page.tag)
                newPages[page.tag].push(page)              
              } else {     
                //console.log("created: " + page.tag)           
                newPages[page.tag] = []
                newPages[page.tag].push(page)
            }
        });
        
        this.setState({pages: newPages})
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    notificationHandler = () => {
        console.log('noti')
        ipcRenderer.send('notification-send-event')
    }

    selectPage = async (e) => {
        let key;
        const title = e.key

        this.props.server.pages.map((page, index) => {
            if (page.title == title) {
                key = index
            }
        })

        this.props.selectPage(key)        
    }    

    renderPages = () => {
        return (
           
            Object.keys(this.state.pages).map((tag, index) => {
                if (tag == "null") {
                    return (
                        this.state.pages[tag].map((page, index) => {
                            return (
                                <Menu.Item key={page.title} onClick={this.selectPage} icon={<TeamOutlined />}>
                                    {page.title}
                                </Menu.Item>
                            )
                        })
                    )
                }
                
                return (
                    <SubMenu key={tag} onClick={this.selectPage} title={tag} icon={<PieChartOutlined />}>
                        
                        {

                            this.state.pages[tag].map((page, index) => {
                                return (
                                    <Menu.Item key={page.title} onClick={this.selectPage} icon={<PieChartOutlined />}>
                                        {page.title}
                                    </Menu.Item>
                                )
                            })

                        }

                    </SubMenu>
                )
            })

        )
    }

    render() {
        return (
            <Sider className="inner-sidebar" trigger={null} collapsible collapsed={this.props.collapsed} onCollapse={this.onCollapse}>
                <div className="sidebar-header">
                        <p className="sidebar-header-content">{this.props.server.name}</p>
                </div>

                <SidebarScrollbar style={{ width: '100%', height: '100%', overflow: 'hidden' }} bg={'#444444'} tc={'transparent'}>
                    <Menu className="inner-inner-menu" defaultSelectedKeys={['0']} mode="inline">
                        
                        {this.renderPages()}

                    </Menu>
                </SidebarScrollbar>

                <div className="profile-section">
                        <ul className="profile-items">
                            <li className="avatar" ><a href="#" className="avatar-btn"
                                style={{background: `url('${this.props.user.thumbnail}')`,
                                'background-size': 'cover',
                                'background-position': 'center'}}></a></li>
                            
                            <li className="profile-info">
                                <ul>
                                    <li className="info-name">{this.props.user.name}</li>
                                    <li className="info-email">{this.props.user.email}</li>
                                </ul>
                            </li>

                            
                            {/* <li className="settings"><a onClick={this.props.toggleTheme} className="settings-btn" href="#">{<SettingFilled />}</a></li> */}
                            <li className="settings">
                                <NavMenu
                                logout = {this.props.signout}
                                toggleTheme = {this.props.toggleTheme}
                                darkTheme={this.props.darkTheme}/>
                                
                            </li>
                        
                        </ul>
                </div>
            </Sider>
        )
    }
}

export default InnerSidebar;