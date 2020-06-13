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

    render() {
        const menu = (
            <Menu>
                <Menu.ItemGroup title="Message Options">
                    <Menu.Item className="server-delete-tag" key="2" onClick={this.menuDeleteServer}>Delete Server</Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        )

        return(
            <li className='message-container'>  
                {this.renderAvatar()}     
                <Dropdown className = "dropdown-menu ant-dropdown-open" trigger={['contextMenu']} overlay={menu} onContextMenu={()=> console.log('oi')}>
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