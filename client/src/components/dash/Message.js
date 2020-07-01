import React from 'react';
import {Popover, Dropdown, Menu, Form, Input, Select, Button} from "antd";
import './Dash.css'


class Message extends React.Component {

    formRef = React.createRef()

    state = {
        roleColors: {
            "admin" : '#00a5a7',
        },
        visible: false,
    }
     //replace with member roles later**

    deleteMessage = async () => {
        await this.props.deleteMessage(this.props.message.id)
    }

    updateRole = async () => {
        const formData = this.formRef.current.getFieldsValue()
        await this.props.editMember(formData, this.props.message.member.id)

        this.setState({visible: false})
    }

    handleVisibleChange = visible => {
        this.setState({visible})
    }

    renderAvatar = () => {
        if(!this.props.message.chain) {
            return (
                <div className="avatar">
                    <Popover
                        placement="right"
                        title="Edit Member"
                        content={this.renderPopover()}
                        trigger="click"
                        visible={this.state.visible}
                        onVisibleChange={this.handleVisibleChange}
                    >

                        <p href="#" className="avatar-btn"
                        style={{'background': `url("${this.props.message.member.user.thumbnail}")`,
                                'background-size': 'cover',
                                'background-position': 'center'}}>
                        </p>
                    </Popover>
                </div>
            )
        }
    }

    renderMeta = () => {
        if(!this.props.message.chain) {
            return (
                <div className="meta-data">
                    <div onClick={() => this.setState({visible: true})} className={"message-name " + this.role}
                    style={{color: this.state.roleColors[this.props.message.member.role]}}>
                        {this.props.message.member.user.name}
                    </div>
                    <div className="message-time">{this.props.message.date.split(" ")[1] + ' ' + this.props.message.date.split(" ")[2]}</div>
                </div>
            )
        }
    }

    renderDate = () => {
        if (this.props.message.chain){
            return (
                <div className="message-time">{this.props.message.date.split(" ")[1] + ' ' + this.props.message.date.split(" ")[2]}</div>
            )
        }
    }

    renderContextMenu = () => {
        if(this.props.member.role !== 'admin') {
            if(this.props.uid !== this.props.message.member.user.id) {
                return (
                    <Menu/>
                )
            }
        }

        const words = this.props.message.content.split(' ')
        let msgExcerpt = '';

        for(let i=0; i<3; i++) {
            if(!words[i]) break;
            msgExcerpt += ` ${words[i]}`
        }

        (words.length > 3) ? msgExcerpt += '...' : msgExcerpt += '';

        return (
            <Menu>
                <Menu.ItemGroup title={msgExcerpt}>
                    <Menu.Item className="server-delete-tag" key="2" onClick={this.deleteMessage}>Delete Message</Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        )
    }

    renderPopover = () => {
        let isAdmin;

        if(this.props.uid === this.props.message.member.user.id) {
            isAdmin = false;
        } else {
            isAdmin = (this.props.member.role === 'admin')
        }

        return(
            <div className="popover-content">
                <div className="popover-dark">
                    <p href="#" className="popover-avatar"
                            style={{'background': `url("${this.props.message.member.user.thumbnail}")`,
                                    'background-size': 'cover',
                                    'background-position': 'center'}}>
                    </p>
                    <p className="popover-name">{this.props.message.member.user.name}</p>
                    <p className="popover-email">{this.props.message.member.user.email}</p>
                </div>

                <Form 
                    className="popover-form"
                    ref = {this.formRef}
                    initialValues={{
                        role: this.props.message.member.role
                }}>
                    <Form.Item
                        name="role"
                    >
                        <Select
                            disabled={!isAdmin}
                            showSearch
                            placeholder="Select Role"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="student">Student</Select.Option>
                        </Select>
                    </Form.Item>                    
                    
                    <Form.Item>

                    { 
                        (isAdmin) ? 
                        <Button id="submit" onClick={this.updateRole} htmlType="submit">
                            Update
                        </Button>
                    :
                        <Button htmlType="submit" onClick={() => this.setState({visible: false})}>
                            Close
                        </Button>
                    }

                    </Form.Item>

                </Form>
            </div>
        )
    }

    render() {
        return(
            <li className='message-container'>  
                {this.renderAvatar()}     
                <Dropdown className = "dropdown-menu ant-dropdown-open" trigger={['contextMenu']} overlay={this.renderContextMenu()} onContextMenu={()=> console.log('oi')}>
                    <div className="message-content">
                        {this.renderMeta()}
                        {this.renderDate()}
                        <div className="message-text">{this.props.message.content}</div>
                    </div>
                </Dropdown> 
            </li>
        ) 
    }    
}

export default Message;