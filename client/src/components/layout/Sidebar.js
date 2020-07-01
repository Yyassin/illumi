import React from 'react';
import {Layout, Menu, Tooltip, Dropdown} from "antd";
import {
    PlusOutlined,
} from '@ant-design/icons';

import SidebarScrollbar from '../scrollbars/SidebarScrollbar'
import ServerForm from '../forms/ServerForm'

const { Sider } = Layout;

class Sidebar extends React.Component {
    formRef = React.createRef();
    initServer = React.createRef();

    state = {
        isActive: false,
        showModal: false,

        formType: '',

        member: '', //alernative            ?       ?       ?

        server: '',
        serverIndex: 0,

        // modal fields
        name: '',
        description: '',
        outline: '',
        thumbnail: '',
    }
    
    selectServer = async (e) => {        
        this.props.selectServer(e.currentTarget.dataset.id);
    }

    setServer = (e) => {
        const index = e.currentTarget.dataset.id
        const server = this.props.members[index].server

        this.setState({
            server: server, 
            serverIndex: index,
            member: this.props.members[index]
        })
    }

    // context menu methods
    menuDeleteServer = async() => {
        await this.props.deleteServer(this.state.server.id, this.state.serverIndex)
    }

    menuLeaveServer = async() => {
        await this.props.leaveServer(this.state.member.id, this.state.serverIndex)
    }

    createForm = async () => {
        this.setState({
            showModal: true,
            formType: 'create',
            server: '',
        });        
    }

    editForm = async () => {
        this.setState({
            showModal: true,
            formType: 'edit',
        });
    }

    // modal controller

    onModalChange = values => {
        this.setState({[values.target.id]: values.target.value})
    }

    handleOk = async (e) => {
        this.setState({
            showModal: false,
        });

        const formData = this.formRef.current.getFieldsValue()

        if (formData.thumbnail === ''){
            formData.thumbnail = 'https://images-platform.99static.com//rQ20qavEFmVRazKkSzI0jmA7l50=/654x67:1154x567/fit-in/590x590/projects-files/33/3395/339514/fd6c37dc-e06c-4af0-9616-bf1d1217b8ba.png';
        }

        let initialFields;
        
        if (this.initServer.current) {
            initialFields = this.initServer.current.state.initFields
        }

        if (this.state.formType === 'create') {
            await this.props.addServer(this.state)

        } else if(JSON.stringify(formData) !== JSON.stringify(initialFields)) {
            await this.props.editServer(formData, this.state.server.id)
        }

        this.setState({
            showModal: false,
            name: '',
            description: '',
            outline: '',
            thumbnail: 'https://images-platform.99static.com//rQ20qavEFmVRazKkSzI0jmA7l50=/654x67:1154x567/fit-in/590x590/projects-files/33/3395/339514/fd6c37dc-e06c-4af0-9616-bf1d1217b8ba.png',
        });
    };

    handleCancel = e => {
        this.setState({
            showModal: false,
        });

        // if(this.formRef.current) {
        //     this.formRef.current.resetFields()
        // }
    };

    // render methods
    renderServers = () => {
        const menu = (
            <Menu>
                <Menu.ItemGroup title="Server Options">
                    <Menu.Item className="server-edit-tag" key="1" onClick={this.editForm}>Edit Server</Menu.Item>
                    <Menu.Item className="server-delete-tag" key="2" onClick={this.menuDeleteServer}>Delete Server</Menu.Item>
                    <Menu.Item className="server-leave-tag" key="3" onClick={this.menuLeaveServer}>Leave Server</Menu.Item>
                    <Menu.Item className="server-invite-tag" key="4">Invite Members</Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        )

        return (
            <ul className="servers">
                {
                    this.props.members.map((member, index) => {
                        return (
                            <li>
                                <Dropdown className = "dropdown-menu ant-dropdown-open" trigger={['contextMenu']} overlay={menu} onContextMenu={this.setServer.bind(this)}>
                                    <Tooltip placement="rightTop" title={member.server.name}>
                                        <p
                                            data-id={index} 
                                            onClick={this.selectServer.bind(this)}                                            
                                            className={(parseInt(this.props.serverIndex) === parseInt(index)) ? "server-thumbnail selected" : "server-thumbnail"}
                                            style={{background: `url('${member.server.thumbnail || 'https://images-platform.99static.com//rQ20qavEFmVRazKkSzI0jmA7l50=/654x67:1154x567/fit-in/590x590/projects-files/33/3395/339514/fd6c37dc-e06c-4af0-9616-bf1d1217b8ba.png'}')`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'}}></p>
                                    </Tooltip>
                                </Dropdown>
                            </li>
                        )
                    })

                }

                <Tooltip placement="rightTop" title="Create Server">
                    <li id="create" onClick={this.createForm}>
                        <p  className="server-thumbnail create-server"
                            style={{background: `#333`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'}}><PlusOutlined /></p>
                    </li>
                </Tooltip>
            </ul>
        )
    }

    render() {
        return (
            <Sider  className="outer-sidebar"
                style={ this.state.isActive ? {'background-color': this.props.bg[1]} : {'background-color': this.props.bg[0]}}>
                <SidebarScrollbar style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                
                    <Menu className="outer-menu" defaultSelectedKeys={['0']} mode="inline"
                        style={ this.state.isActive ? {'background-color': this.props.bg[1]} : {'background-color': this.props.bg[0]}}>

                        {this.renderServers()}

                    </Menu>                    
                </SidebarScrollbar>

                <ServerForm
                    ref = {this.initServer}
                    visible={this.state.showModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    onModalChange={this.onModalChange}
                    formRef={this.formRef}
                    formType={this.state.formType}
                    server={this.state.server}
                />
            </Sider>
        )
    }
}

export default Sidebar;