import React from 'react';
import { Button } from 'antd'
import SidebarScrollbars from '../scrollbars/SidebarScrollbar'
import Message from './Message';
import './Dash.css'

import {
    SendOutlined,
} from '@ant-design/icons';

class Chat extends React.Component {
    state = {
        messages: {},
        messageInput: '',
    }

    //TO DO, sub group messages per user
    componentDidMount = () => {
        let newMessages = {};
        let messageDate;

        if(!this.props.page.rooms[0]) {
            return
        }
        
        this.props.page.rooms[0].messages.map((message) => {
            console.log(message )
            messageDate = message.date.split(" ")[0];

            //2020-06-03:
            //  mike: [m1, m2]
            //  gerald: [m1, m2]



            //list by date 
            if(messageDate in newMessages){
                newMessages[messageDate].push(message)              
              } else {     
                //console.log("created: " + page.tag)           
                newMessages[messageDate] = []
                newMessages[messageDate].push(message)
            }
        });

        let saveMessages = {};
        let messageUser;
        Object.keys(newMessages).map((date) => {
            saveMessages[date] = {};
        })

        //list by date, then user
        Object.keys(newMessages).map((date) => {
            console.log(date)
            newMessages[date].map((message) => {
                messageUser = message.user
                if(messageUser in saveMessages[date]){
                    saveMessages[date][messageUser].push(message)              
                  } else {     
                    //console.log("created: " + page.tag)           
                    saveMessages[date][messageUser]=[]
                    saveMessages[date][messageUser].push(message)
                }
            })
        })
        
        console.log(saveMessages)
        this.setState({messages: newMessages}) //not doing users yet
    }



    onChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    onSend = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    renderMessages = () => {
        if(!this.props.page.rooms[0]) {
            return
        }
        return (
            Object.keys(this.state.messages).map((date, index) => {
                return (
                    <div>
                    <div className="month-date-line">
                        <p className="month-date">{date}</p>
                    </div>

                        {
                        this.state.messages[date].map((message, index) => {
                            return (
                                <li className="message" >
                                    <Message key={index} message={message} />
                                </li>
                            )
                        })}

                    </div>
                )
            })
        )
    }

        // return (
        //     this.props.page.rooms[0].messages.map((message, index) => {
        //         return <li className="message" >
        //             <Message key={index} message={message} />
        //         </li>
        //     })
        // )

    render() {
        // console.log(this.props.page.rooms)
        console.log(this.state.messages)
        return(
            <div className="chat-container">
                <SidebarScrollbars tyle={{ width: '100%', height: '100%', overflow: 'hidden' }} bg={'#444444'} tc={'transparent'}>

                    <ul className="message-area">

                        {/* <div className="month-date-line">
                            <p className="month-date">May 27, 2020</p>
                        </div> */}
                        
                        {this.renderMessages()}                            
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