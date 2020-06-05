import React from 'react';
import {Layout, Menu, Tooltip} from "antd";

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

    handleOk = (e) => {
        console.log(this.state);
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
                                                    <a href="#"
                                                    className={(parseInt(this.props.serverIndex) === parseInt(index)) ? "server-thumbnail selected" : "server-thumbnail"}
                                                    style={{background: `url('${member.server.thumbnail}')`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'}}></a>
                                                </li>
                                            </Tooltip>
                                        )
                                    })

                                }

                                <Tooltip placement="rightTop" title="Create Server">
                                    <li onClick={this.showModal}>
                                        <p href="#" className="server-thumbnail"
                                            style={{background: `#333`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'}}></p>
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