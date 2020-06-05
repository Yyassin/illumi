import React from 'react';
import './Dash.css'



class Message extends React.Component {
    renderAvatar = () => {
        if(!this.props.message.chain) {
            return (
                <div className="avatar">
                    <a href="#" className="avatar-btn"
                    style={{'background': `url("${this.props.message.user.thumbnail}")`,
                            'background-size': 'cover',
                            'background-position': 'center'}}>
                    </a>
                </div>
            )
        }
    }

    renderMeta = () => {
        if(!this.props.message.chain) {
            return (
                <div className="meta-data">
                    <div className="message-name">{this.props.message.user.name}</div>
                    <div className="message-time">{this.props.message.date.split(" ")[1]}</div>
                </div>
            )
        }
    }

    render() {
        return(
            <li className='message-container'>
                {this.renderAvatar()}            
                <div className="message-content">
                    {this.renderMeta()}
                    <div className="message-time">{this.props.message.date.split(" ")[1]}</div>
                    <div className="message-text">{this.props.message.content}</div>
                </div>
            </li>
        )
    }    
}

export default Message;