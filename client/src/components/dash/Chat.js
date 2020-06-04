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
        messageInput: '',
    }

    scrollbar = React.createRef()

    componentDidMount = () => {
        if(!this.props.page.rooms[0]) {
            return
        }

        let messages = this.props.page.rooms[0].messages      
        this.setState({messages: messages})
        //this.sortMessages(messages)

        socket.on("chat message", (msg) => {
            messages = this.state.messages;
            messages.push(msg)
            this.setState({messages: messages})

            //scrolls down if client receives message
            if (this.scrollbar.current) {
                this.scrollbar.current.newMessage();
            }
        })
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

                    <ul className="message-area">

                        <div className="month-date-line">
                            <p className="month-date">May 27, 2020</p>
                        </div>
                        
                            {this.state.messages.map((message, index) => {
                                return <li className="message" >
                                    <Message key={index} message={message} />
                                </li>
                            })}
                            
                    </ul>
                    
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