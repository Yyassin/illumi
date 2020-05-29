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
                                style={{background: "url('https://images2.alphacoders.com/980/980117.jpg')",
                                'background-size': 'cover',
                                'background-position': 'center'}}></a></div>
                <div className="message-content">
                    <div className="meta-data">
                        <div className="message-name">Shrish Mohapatra</div>
                        <div className="message-time">Today at 12:17 AM</div>
                    </div>
                    <div className="message-text">{this.props.message}</div>
                </div>
            </li>
        )
    }    
}

export default Message;