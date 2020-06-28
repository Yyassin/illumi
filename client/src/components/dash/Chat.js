import React from 'react';
import io from 'socket.io-client';
import { Button } from 'antd'
import SidebarScrollbars from '../scrollbars/SidebarScrollbar'
import Message from './Message';
import './Dash.css'


import {
    SendOutlined,
} from '@ant-design/icons';

const ipcRenderer = window.require('electron').ipcRenderer
const path = require('path');

class Chat extends React.Component {

    socket;

    state = {
        messages: [],
        sortedMessages: {},
    }

    scrollbar = React.createRef()
    inputField = React.createRef()

    componentDidMount = () => {   
        this.socket = io.connect("http://illumi2.canadaeast.cloudapp.azure.com/");      
        this.handleUpdate();
        this.initSocket();
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps !== this.props) {
            this.handleUpdate();
        }
    }

    componentWillUnmount = () => {
        this.socket.emit('forceDisconnect')
        this.socket.close();
    }

    initSocket = () => {
        this.socket.on("chat message", (msg) => {
            if (msg.roomID == this.props.page.rooms[0].id) {
                let messages = this.state.messages;
                messages.push(msg)

                this.setState({messages: messages})
                this.sortMessages(messages)                
            }

            //scrolls down if client receives message
            // (maybe we dont want this)
            //SHOW NEW MESSAGE ICON instead -------
            // if (this.scrollbar.current) {
            //     this.scrollbar.current.newMessage();
            // }
        })

        this.socket.on("chat noti", (msg) => {
            if(this.props.uid !== msg.member.user.id) {
                console.log('props uid: ' + this.props.uid)
                console.log('msg uid: ' + msg.member.user.id)
                this.notificationHandler(msg)
            }
        })
    }

    notificationHandler = (msg) => {

        let myNotification = new Notification(msg.member.user.name, {
            body: `@${this.props.server.name}: ` + msg.content,
            icon: `${msg.member.user.thumbnail}`
        })
        
        myNotification.onclick = () => {
            ipcRenderer.invoke('noti-event')
        }
    }
        // ipcRenderer.send('notification-send-event', {
        //     server: this.props.server.name,
        //     user: msg.member.user.name,
        //     message: msg.content
        // })

    handleUpdate = () => {
        let messages = this.props.page.rooms[0].messages  
        this.setState({messages: messages})
        this.sortMessages(messages)
    }

    sortMessages = (messages) => {
        let newMessages = {};
        let messageDate;
        messages.map((message, index) => {
            messageDate = message.date.split(" ")[0];

            if (index > 0 && 
                //same day
                messages[index - 1].date.split(" ")[0] === messageDate) {
                //same user, same hour
                if (messages[index - 1].member.user.name === message.member.user.name
                    && messages[index - 1].date.split(" ")[1].split(':')[0] === message.date.split(" ")[1].split(':')[0]) {
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

    scrollDown = () => {
        if (this.scrollbar.current) {
            this.scrollbar.current.newMessage();
        }
    }
    
    // onChange = (e) => {
    //     this.setState({[e.target.id]: e.target.value})
    // }

    onSend = (e) => {
        if(e) e.preventDefault()
        this.socket.emit("chat message", {
            content: this.inputField.current.value,
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
                                    <p className="month-date">{date.split('-')[0] + ' ' +
                                        date.split('-')[1] + ', ' + date.split('-')[2]}</p>
                                </div>
                                {
                                    this.state.sortedMessages[date].map((message, index) => {
                                        return (
                                            <li className="message" >
                                                <Message 
                                                    key={index}
                                                    uid={this.props.uid}
                                                    member={this.props.member}
                                                    message={message}
                                                    editMember={this.props.editMember}
                                                    deleteMessage={this.props.deleteMessage}
                                                    />
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
        this.scrollDown();
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
                    <input ref={this.inputField} onKeyPress={this.onKeyPressed} type="text" class="message-input" id="messageInput" name="message" placeholder={"Message @" + this.props.server.name} />
                    <Button className="message-send-btn" onClick={this.onSend}><a href="">{<SendOutlined />}</a></Button>
                    {/* <Button type="submit" id="message-btn" class="send-button">Send</Button> */}
                </div>                
            </div>

        )
    }    
}

export default Chat;