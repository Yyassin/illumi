import React from 'react';
import {NavLink, Redirect} from 'react-router-dom'
import {Layout, Menu, Dropdown} from "antd";

import SidebarScrollbar from '../scrollbars/SidebarScrollbar'
import Profile from './Profile'

import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    DownOutlined,
    SettingOutlined,
    CloseOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;


class InnerSidebar extends React.Component {
    
    state = {
        oldPagesData: {},
        pages: {}, //sorted
        pageToggle: true,
    }

    componentDidMount = () => {
        this.handleUpdate();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps!== this.props) {
            this.handleUpdate();
        }
    }

    handleUpdate = () => {
        this.setState({oldPagesData: this.props.server.pages})
        this.setState({pages: this.sortingPages()})
    }

    sortingPages = () => {
        let newPages = {};
        
        this.props.server.pages.map((page) => {
            if(page.tag in newPages){
                newPages[page.tag].push(page)              
              } else {     
                newPages[page.tag] = []
                newPages[page.tag].push(page)
            }
        });

        return newPages;
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    selectPage = async (e) => {
        let key;
        const title = e.key

        this.props.server.pages.map((page, index) => {
            if (page.title === title) {
                key = index
            }
        })

        this.props.selectPage(key)
        this.setState({pageToggle: true})        
    }
    
    renderPage = (tag) => {

        return (
            this.state.pages[tag].map((page, index) => {
                return (
                    <Menu.Item className="page-menu-item" key={page.title} onClick={this.selectPage} icon={<TeamOutlined />}>                      
                        {page.title}  
                        <NavLink className="navlink" to='/home/'/>     
                    </Menu.Item>
                )
            })
        )
    }

    renderMenu = () => {
        return (
            Object.keys(this.state.pages).map((tag, index) => {
                if (tag === "" || tag === "null") {
                    return this.renderPage(tag)
                }
                
                return (
                    <SubMenu key={tag} onClick={this.selectPage} title={tag} icon={<PieChartOutlined />}>
                        {
                            this.renderPage(tag)
                        }
                    </SubMenu>
                )
            })
        )
    }

    render() {
        if(this.state.pageToggle) {
            this.setState({pageToggle: false})
            return <Redirect to='/home'/>
        }

        return (
            <Sider className="inner-sidebar" trigger={null} collapsible collapsed={this.props.collapsed} onCollapse={this.onCollapse}>
                <div className="sidebar-header">
                        <p className="server-name">{this.props.server.name}</p>                
                </div>

                <SidebarScrollbar style={{ width: '100%', height: '100%', overflow: 'hidden' }} bg={'#444444'} tc={'transparent'}>
                    <Menu className="inner-inner-menu" defaultSelectedKeys={['0']} mode="inline">
                        <Menu.Item key='welcome' icon={<TeamOutlined />}>                      
                            Welcome
                            <NavLink to='/home/serverhome/' />  
                        </Menu.Item>
                        <Menu.Item key='whiteboard' icon={<TeamOutlined />}>                      
                            Whiteboard
                            <NavLink to='/home/whiteboard/' />  
                        </Menu.Item>
                        {this.renderMenu()}

                    </Menu>
                </SidebarScrollbar>


                <Profile
                    user={this.props.user}
                    signout={this.props.signout}
                    addInvite={this.props.addInvite}
                    acceptInvite={this.props.acceptInvite}
                    declineInvite={this.props.declineInvite}
                    editProfile = {this.props.editProfile}
                    toggleDark={this.props.toggleDark}
                    toggleLight={this.props.toggleLight}
                    />                
            </Sider>
        )
    }
}

export default InnerSidebar;