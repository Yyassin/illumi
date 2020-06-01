import React from 'react';
import { Button } from 'antd'
import ColoredScrollbars from '../scrollbars/ColouredScrollbars'
import Message from './Message';
import './Dash.css'

import {
    SendOutlined,
} from '@ant-design/icons';

class Chat extends React.Component {
    state = {
        messages: [
            "Hey Erin, thanks for shopping at Clothstore! We’ve got tons of exciting deals in our upcoming Fall Collection. Stay tuned or visit www.cstore.com to learn more.",
            "Hey Erin, thanks for shopping at Clothstore! We’ve got tons of exciting deals in our upcoming Fall Collection. Stay tuned or",
            "Hey Erin, thanks for shopping at Clothstore!",
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            "Stop.",
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
            "I said stop.",
        ],
        messageInput: '',
    }

    onChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    onSend = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    render() {
        return(
            <div className="chat-container">
                <ColoredScrollbars style={{ height: "100%" }}>
                    <ul className="message-area">
                        <div className="month-date-line">
                            <p className="month-date">May 27, 2020</p>
                        </div>
                            {this.state.messages.map((value, index) => {
                                return <li className="message" >
                                    <Message key={index} message={value} />
                                </li>
                            })}
                    </ul>
                </ColoredScrollbars>

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