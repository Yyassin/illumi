import React from 'react';
import {Tooltip, Dropdown, Menu} from "antd";
import './Dash.css'


class Message extends React.Component {

    state = {
        roleColors: {
            "student" : '#fff',
            "admin" : '#00a5a7',
        }
    }
     //replace with member roles later**

    deleteMessage = async () => {
        await this.props.deleteMessage(this.props.message.id)
        this.props.fetchData()
    }

    renderAvatar = () => {
        if(!this.props.message.chain) {
            return (
                <div className="avatar">
                    <p href="#" className="avatar-btn"
                    style={{'background': `url("${this.props.message.member.user.thumbnail}")`,
                            'background-size': 'cover',
                            'background-position': 'center'}}>
                    </p>
                </div>
            )
        }
    }

    renderMeta = () => {
        if(!this.props.message.chain) {
            return (
                <div className="meta-data">
                    <div className={"message-name " + this.role}
                    style={{color: this.state.roleColors[this.props.message.member.role]}}>
                        {this.props.message.member.user.name}
                    </div>
                    <div className="message-time">{this.props.message.date.split(" ")[1]}</div>
                </div>
            )
        }
    }

    renderDate = () => {
        if (this.props.message.chain){
            return (
                <div className="message-time">{this.props.message.date.split(" ")[1]}</div>
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
            msgExcerpt += `${words[i]} `
        }

        msgExcerpt += '...'

        return (
            <Menu>
                <Menu.ItemGroup title={msgExcerpt}>
                    <Menu.Item className="server-delete-tag" key="2" onClick={this.deleteMessage}>Delete Message</Menu.Item>
                </Menu.ItemGroup>
            </Menu>
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