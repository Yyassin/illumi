import React from 'react';
import SidebarScrollbars from '../scrollbars/SidebarScrollbar'
import EventForm from '../forms/EventForm'
import './Dash.css'

import {List} from 'antd'


const { shell } = window.require('electron')

class ServerHome extends React.Component {
    formRef = React.createRef();
    initEvent = React.createRef();

    state = {
        isActive: false,
        showModal: false,

        formType: '',
        event: '',

        // modal fields
        name: '',
        location: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',

        events: [],
    }

    data = this.state.events

    componentDidMount = () => {
        this.parseEvents();
    }

    parseEvents = () => {
        let events = this.props.server.events

        events.map((event, index) => {
            event.startDate = this.parseDate(event.startDate)
            event.endDate = this.parseDate(event.endDate)            
            event.startTime = this.parseTime(event.startTime) 
            event.endTime = this.parseTime(event.endTime) 
        })

        this.setState({events : events})
    }

    parseDate = (eventDate) => {
        if(!eventDate) {
            return ''
        }

        eventDate = eventDate.split(' ')
        return `${eventDate[0]} ${eventDate[1]} ${eventDate[2]} ${eventDate[3]}`
    }

    parseTime = (eventTime) => {
        if(!eventTime) {
            return ''
        }

        eventTime = eventTime.split(' ')[4].split(':')
        return `${eventTime[0]}:${eventTime[1]}`
    }

    createForm = async () => {
        this.setState({
            showModal: true,
            formType: 'create',
            event: '',
        });        
    }

    onModalChange = values => {
        this.setState({[values.target.id]: values.target.value})
    }

    handleOk = async (e) => {
        this.setState({
            showModal: false,
        });

        const formData = this.formRef.current.getFieldsValue()
        let initialFields;
        
        if (this.initEvent.current) {
            initialFields = this.initEvent.current.state.initFields
        }

        if (this.state.formType === 'create') {
            await this.props.addEvent(formData)

        } 
        // else if(JSON.stringify(formData) !== JSON.stringify(initialFields)) {
        //     await this.props.editServer(formData, this.state.server.id)
        // }

        this.setState({
            name: '',
            location: '',
            description: '',
            start: '',
            end: '',
        });
    };

    handleCancel = e => {
        this.setState({
            showModal: false,
        });

        // if(this.formRef.current) {
        //     this.formRef.current.resetFields()
        // }
    };


    openOutline = () => {
        shell.openExternal(`${this.props.server.outline}`)
    }

    render() {
        return (
            <div className="main">
                <SidebarScrollbars 
                    isChat={true}
                    ref={this.scrollbar} 
                    style={{ width: '100%', height: '100%', overflow: 'hidden' }} 
                    bg={'#444444'} 
                    tc={'transparent'}>

                    
                    <div className="home-content">
                        <h1 className="server-title">{`Welcome to `}<br />{this.props.server.name}</h1>
                        <p className="greeting">
                            This is the beginning of this server. Here's some information to help you get started.
                        </p>
                        <div className="main-content">{this.props.server.description}</div>
                        <div className="outline">
                            <p onClick={this.openOutline} className="link">Course Outline</p>
                        </div>
                        
                        <div className="event-container">
                            <h2 className="event">Important Events</h2>
                            <p onClick={this.createForm} className="add-event">+</p>                            
                        </div>

                        <List
                            className="event-list"
                            grid={{gutter: 10, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 8}}
                            dataSource={this.state.events}
                            renderItem={item => (
                            <List.Item>
                                <div className="event-card">
                                    <p>{item.name}</p>
                                    <p>{item.location}</p>
                                    <p>{item.description}</p>
                                    <p>{item.startDate}</p>
                                    <p>{item.startTime}</p>
                                    <p>{item.endDate}</p>
                                    <p>{item.endTime}</p>
                                </div>
                            </List.Item>
                            )}
                        />
                    </div>
                </SidebarScrollbars>

                <EventForm
                    ref={this.initEvent}
                    visible={this.state.showModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    onModalChange={this.onModalChange}
                    formRef={this.formRef}
                    formType={this.state.formType}
                />
            </div>
        )
    }
}

export default ServerHome;