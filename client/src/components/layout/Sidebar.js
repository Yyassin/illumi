import React from 'react';
import {Layout, Menu, Tooltip} from "antd";
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

        // modal fields
        name: '',
        description: '',
        outline: '',
        thumbnail: '',
    }
    
    selectServer = async (e) => {        
        this.props.selectServer(e.currentTarget.dataset.id);
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

    render() {
        console.log('sidebar rerender')
        return (
            <Sider  className="outer-sidebar" collapsed={true} 
                style={ this.state.isActive ? {'background-color': this.props.bg[1]} : {'background-color': this.props.bg[0]}}>
                <SidebarScrollbar style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                
                    <Menu className="outer-menu" defaultSelectedKeys={['0']} mode="inline"
                        style={ this.state.isActive ? {'background-color': this.props.bg[1]} : {'background-color': this.props.bg[0]}}>

                            <ul className="servers">
                                {
                                
                                    this.props.members.map((member, index) => {
                                        return (
                                            <Tooltip placement="rightTop" title={member.server.name}>
                                                <li data-id={index} 
                                                    onClick={this.selectServer.bind(this)}>
                                                    <p href="#"
                                                    className={(parseInt(this.props.serverIndex) === parseInt(index)) ? "server-thumbnail selected" : "server-thumbnail"}
                                                    style={{background: `url('${member.server.thumbnail}')`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'}}></p>
                                                </li>
                                            </Tooltip>
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