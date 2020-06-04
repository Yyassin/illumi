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

/*
messages = [message1, message 2, ...] -> message = {content, date, user}

date= [date1, date2, ...]
users = [[user1, user2], [user1, user2], ... ]
messages = [[[messages], [messages]], [[messages], [messages]]]


goal : messages = [date:
                      [user:
                            [messages] 
                 ]

message = {
    content
    date        
    chain: bool
    user {
        ...
    }
}

sortedMessages = {
    2020-06-04: [
        message = {
        content
        date        
        chain: bool
        user {
            ...
        }
    , msg2, msg3
    ]
}

messages -> message -> date:
add date field if date not in formatedMessages
let users = {} stored all users in here, indexed by name
let saveMessages = {}, add all date fields saveMessage[date] = {}
saveMessage ={ date: {}, date: {}, ...}


 yousef: hi
        hello
        bye
shrish: hi man
yousef: hi
shrish: hello
        hi

let userIndex = {}, yousef-0
                    shrish-0
                    yousef-1: mes

*/







class Chat extends React.Component {
    state = {
        messages: [],
        sortedMessages: {},
        messageInput: '',
    }

    scrollbar = React.createRef()

    componentDidMount = () => {
        if(!this.props.page.rooms[0]) {
            return
        }

        let messages = this.props.page.rooms[0].messages      
        this.setState({messages: messages})
        this.sortMessages(messages)

        socket.on("chat message", (msg) => {
            messages = this.state.messages;
            messages.push(msg)
            this.setState({messages: messages})
            this.sortMessages(messages)

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
                messages[index - 1].date.split(" ")[0] == messageDate) {
                if (messages[index - 1].user.name == message.user.name) {
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
        e.preventDefault()
        console.log(this.state)
        socket.emit("chat message", {
            content: this.state.messageInput,
            userID: this.props.uid,
            roomID: this.props.page.rooms[0].id
        })
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
        console.log(this.props.page.rooms)
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
                    <input onChange={this.onChange} type="text" class="message-input" id="messageInput" name="message" placeholder="Message @ServerName" />
                    <Button className="message-send-btn" onClick={this.onSend}><a href="">{<SendOutlined />}</a></Button>
                    {/* <Button type="submit" id="message-btn" class="send-button">Send</Button> */}
                </div>                
            </div>

        )
    }    
}

export default Chat;