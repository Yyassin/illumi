import React from 'react';
import io from 'socket.io-client';
import { Button } from 'antd'
import SidebarScrollbars from '../scrollbars/SidebarScrollbar'
import Message from './Message';
import './Dash.css'

import {
    SendOutlined,
} from '@ant-design/icons';

const socket = io.connect("http://localhost:4000")

class Chat extends React.Component {
    state = {
        messages: [],
        sortedMessages: {},
        messageInput: '',
    }

    scrollbar = React.createRef()
    inputField = React.createRef()

    componentDidMount = () => {
        if(!this.props.page.rooms[0]) {
            return
        }

        let messages = this.props.page.rooms[0].messages      
        this.setState({messages: messages})
        this.sortMessages(messages)

        socket.on('invalid token', () => {
            this.props.signout();            
        })

        socket.on("chat message", (msg) => {
            console.log(msg.roomID)
            console.log(this.props.page.rooms[0].id)
            if (msg.roomID == this.props.page.rooms[0].id) {
                messages = this.state.messages;
                messages.push(msg)
                this.setState({messages: messages})
                this.sortMessages(messages)
            }

            //scrolls down if client receives message
            // (maybe we dont want this)
            if (this.scrollbar.current) {
                this.scrollbar.current.newMessage();
            }
        })

    }

    sortMessages = (messages) => {
        let newMessages = {};
        let messageDate;
        messages.map((message, index) => {
            messageDate = message.date.split(" ")[0];

            if (index > 0 && 
                messages[index - 1].date.split(" ")[0] === messageDate) {
                if (messages[index - 1].member.user.name === message.member.user.name) {
                    message['chain'] = true;
                } else {
                    message['chain'] = false;
                }
            } else {
                message['chain'] = false;
            }

            //list by date 
            if(messageDate in newMessages){
                newMessages[messageDate].push(message)              
              } else {            
                newMessages[messageDate] = []
                newMessages[messageDate].push(message)
            }
        });

        this.setState({sortedMessages: newMessages})

    }
    
    onChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    onSend = (e) => {
        if(e) e.preventDefault()

        console.log(this.state)
        socket.emit("chat message", {
            content: this.state.messageInput,
            userID: this.props.uid,
            roomID: this.props.page.rooms[0].id,
            token: this.props.token
        })
        this.inputField.current.value = "";
    }

    onKeyPressed = (event) => {
        if(event.key === "Enter") {
            this.onSend(null);
        }
    }

    renderMessages() {
        return (
            <ul className="message-area">
                {
                    Object.keys(this.state.sortedMessages).map((date) => {
                        return (
                            <div className="">
                                <div className="month-date-line">
                                    <p className="month-date">{date}</p>
                                </div>
                                {
                                    this.state.sortedMessages[date].map((message, index) => {
                                        return (
                                            <li className="message" >
                                                <Message key={index} message={message} />
                                            </li>
                                        )
                                    })    
                                }
                            </div>
                        )     
                    })     
                }                    
            </ul>            
        )
    }

    render() {
        return(
            <div className="chat-container">
                <SidebarScrollbars 
                    isChat={true}
                    ref={this.scrollbar} 
                    style={{ width: '100%', height: '100%', overflow: 'hidden' }} 
                    bg={'#444444'} 
                    tc={'transparent'}>

                    {this.renderMessages()}
                    
                </SidebarScrollbars>

                <div className="chat-form-container">
                    <Button className="file-send-btn" onClick={this.onSend}><a href=""></a></Button>
                    <input ref={this.inputField} onKeyPress={this.onKeyPressed} onChange={this.onChange} type="text" class="message-input" id="messageInput" name="message" placeholder="Message @ServerName" />
                    <Button className="message-send-btn" onClick={this.onSend}><a href="">{<SendOutlined />}</a></Button>
                    {/* <Button type="submit" id="message-btn" class="send-button">Send</Button> */}
                </div>                
            </div>

        )
    }    
}

export default Chat;