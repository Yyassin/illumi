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

    state = {
        isActive: false,
        showModal: false,

        serverID: '',
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

    setServerID = (e) => {
        const index = e.currentTarget.dataset.id
        const serverID = this.props.members[index].server.id

        this.setState({
            serverID: serverID, 
            serverIndex: index
        })        
        
        console.log(serverID)
    }

    // context menu methods
    menuDeleteServer = async() => {
        await this.props.deleteServer(this.state.serverID, this.state.serverIndex)
        this.props.fetchData()
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

    handleOk = async (e) => {
        console.log(this.state);

        await this.props.addServer(this.state)
        this.props.fetchData()

        this.setState({
            showModal: false,
            name: '',
            description: '',
            outline: '',
            thumbnail: '',
        });
        this.formRef.current.resetFields()
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            showModal: false,
        });
    };

    // render methods
    renderServers = () => {
        const menu = (
            <Menu>
                <Menu.ItemGroup title="Server Options">
                    <Menu.Item className="server-edit-tag" key="1">Edit Server</Menu.Item>
                    <Menu.Item className="server-delete-tag" key="2" onClick={this.menuDeleteServer}>Delete Server</Menu.Item>
                    <Menu.Item className="server-invite-tag" key="3">Leave Server</Menu.Item>
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
                                <Dropdown className = "dropdown-menu ant-dropdown-open" trigger={['contextMenu']} overlay={menu} onContextMenu={this.setServerID.bind(this)}>
                                    <Tooltip placement="rightTop" title={member.server.name}>
                                        <p
                                            data-id={index} 
                                            onClick={this.selectServer.bind(this)}                                            
                                            className={(parseInt(this.props.serverIndex) === parseInt(index)) ? "server-thumbnail selected" : "server-thumbnail"}
                                            style={{background: `url('${member.server.thumbnail}')`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'}}></p>
                                    </Tooltip>
                                </Dropdown>
                            </li>
                        )
                    })

                }

                <Tooltip placement="rightTop" title="Create Server">
                    <li onClick={this.showModal}>
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
                    visible={this.state.showModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    onModalChange={this.onModalChange}
                    formRef={this.formRef}
                />
            </Sider>
        )
    }
}

export default Sidebar;