import React from 'react';
import SidebarScrollbars from '../scrollbars/SidebarScrollbar'
import EventForm from '../forms/EventForm'
import EventCard from './EventCard'
import './Dash.css'

import {List} from 'antd'
import DescriptionsItem from 'antd/lib/descriptions/Item';


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
        thumbnail: '',
    }

    data = this.state.events

    componentDidMount = () => {
        this.setState({events:this.props.server.events})
    }

    parseDate = (eventDate) => {
        eventDate = eventDate.toString()
        try {
            eventDate = eventDate.split(' ')
            return `${eventDate[0]} ${eventDate[1]} ${eventDate[2]} ${eventDate[3]}`
        } catch (e) {
            return eventDate            
        }
    }

    parseTime = (eventTime) => {
        eventTime = eventTime.toString()
        try {
            eventTime = eventTime.split(' ')[4].split(':')
            return `${eventTime[0]}:${eventTime[1]}`
        } catch (e){
            return eventTime
        }
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
        console.log(formData)
        let initialFields;
        
        if (this.initEvent.current) {
            initialFields = this.initEvent.current.state.initFields
        }

        formData.startDate = this.parseDate(formData.startDate)
        formData.endDate = this.parseDate(formData.endDate)            
        formData.startTime = this.parseTime(formData.startTime) 
        formData.endTime = this.parseTime(formData.endTime)

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
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            thumbnail: '',
        });
    };

    handleCancel = e => {
        this.setState({
            showModal: false,
        });
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
                        <div className="main-home-content">{this.props.server.description}</div>
                        <div className="outline">
                            <p onClick={this.openOutline} className="link">Course Outline</p>
                        </div>
                        
                        <div className="event-container">
                            <h2 className="event">Important Events</h2>
                            <p onClick={this.createForm} className="add-event">+</p>                            
                        </div>

                        <List
                            className="event-list"
                            grid={{gutter: 20, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3}}
                            dataSource={this.state.events}
                            renderItem={item => (
                            <List.Item>
                                {console.log(DescriptionsItem)}
                                <EventCard 
                                    item = {item}
                                    member={this.props.member}
                                    parseDate={this.parseDate}
                                    parseTime={this.parseTime}
                                    deleteEvent={this.props.deleteEvent}
                                    editEvent={this.props.editEvent}
                                    uid={this.props.uid}
                                />
                            </List.Item>
                            )}
                        />
                    </div>
                </SidebarScrollbars>

                <EventForm
                    ref={this.initEvent}
                    uid={this.props.uid}
                    member={this.props.member}
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