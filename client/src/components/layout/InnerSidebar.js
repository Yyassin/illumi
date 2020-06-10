import React from 'react';
import {Layout, Menu} from "antd";

import SidebarScrollbar from '../scrollbars/SidebarScrollbar'
import PageForm from '../forms/PageForm'
import Profile from './Profile'

import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    DownOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;


class InnerSidebar extends React.Component {
    formRef = React.createRef();

    state = {
        oldPagesData: {},
        pages: {}, //sorted
        showModal: false,

        // modal fields
        title: '',
        image: '',
        video: '',
        tag: '',
        text: '',
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

    handleOk = async(e) => {        
        await this.props.addPage(this.state)
        this.props.fetchData()

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
                if (tag === "" || tag === "null") {
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
                        <p className="server-name">{this.props.server.name}</p>
                        <a href="#" onClick={this.showModal} className="create-page"><DownOutlined /></a>
                        </p>
                        
                </div>

                <SidebarScrollbar style={{ width: '100%', height: '100%', overflow: 'hidden' }} bg={'#444444'} tc={'transparent'}>
                    <Menu className="inner-inner-menu" defaultSelectedKeys={['0']} mode="inline">
                        
                        {this.renderPages()}

                    </Menu>
                </SidebarScrollbar>


                <Profile
                    user={this.props.user}
                    signout={this.props.signout}
                    fetchData={this.props.fetchData}
                    editProfile = {this.props.editProfile}
                    />

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