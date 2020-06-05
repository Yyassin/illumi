import React from 'react';
import {Layout, Menu} from "antd";

import SidebarScrollbar from '../scrollbars/SidebarScrollbar'
import PageForm from '../forms/PageForm'
import NavMenu from './NavMenu'

import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;
const ipcRenderer = window.require('electron').ipcRenderer


class InnerSidebar extends React.Component {
    formRef = React.createRef();

    state = {
        pages: {},
        showModal: false,

        // modal fields
        title: '',
        image: '',
        video: '',
        tag: '',
        text: '',
    }

    componentDidMount = () => {
        this.setState({pages: this.sortingPages()})
    }

    sortingPages = () => {
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

        return newPages;
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
            if (page.title === title) {
                key = index
            }
        })

        this.props.selectPage(key)        
    }
    
    // modal controller
    showModal = (e) => {
        e.preventDefault()
        this.setState({
            showModal: true,
        });
    };

    onModalChange = values => {
        this.setState({[values.target.id]: values.target.value})
    }

    onSelectChange = values => {
        this.setState({tag: values})
    }    

    handleOk = (e) => {
        console.log(this.state);
        // call dispatch

        this.setState({
            showModal: false,
            title: '',
            image: '',
            video: '',
            tag: '',
            text: '',
        });
        this.formRef.current.resetFields()
    };

    handleCancel = e => {
        this.setState({
            showModal: false,
        });
    };

    renderPages = () => {
        return (
           
            Object.keys(this.state.pages).map((tag, index) => {
                if (tag === "null") {
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
                        <p className="sidebar-header-content">
                        {this.props.server.name}
                        <a href="#" onClick={this.showModal} className="create-page"><DesktopOutlined /></a>
                        </p>
                        
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

                <PageForm
                    visible={this.state.showModal}
                    formRef={this.formRef}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    onModalChange={this.onModalChange}
                    onSelectChange={this.onSelectChange}
                    />
            </Sider>
        )
    }
}

export default InnerSidebar;