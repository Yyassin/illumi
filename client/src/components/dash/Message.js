import React from 'react';
import { Button } from 'antd'
import './Dash.css'

import {
    SendOutlined,
} from '@ant-design/icons';

class Message extends React.Component {

    render() {
        return(
            <li className='message-container'>

                <div className="avatar"><a href="#" className="avatar-btn"
                                style={{'background': `url("${this.props.message.user.thumbnail}")`,
                                'background-size': 'cover',
                                'background-position': 'center'}}></a></div>
                                
                <div className="message-content">
                    <div className="meta-data">
                        <div className="message-name">{this.props.message.user.name}</div>
                        <div className="message-time">{this.props.message.date}</div>
                    </div>
                    <div className="message-text">{this.props.message.content}</div>
                </div>

            </li>
        )
    }    
}

export default Message;