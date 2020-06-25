import React from 'react'
import './Dash.css'
import UploadImage from '../forms/UploadImage'

import {Popover, Form, Button, DatePicker, TimePicker, Input, Row, Col} from 'antd'
import {
    EditOutlined
} from '@ant-design/icons';

const moment = require('moment')

class EventCard extends React.Component {

    formRef = React.createRef()

    state = {
        visible: false,

        name: '',
        location: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        thumbnail: '',

    }
    
    handleVisibleChange = visible => {
        this.setState({visible})
    }

    convertDateMoment = (strDate) => {
        // Tue Jun 21 2020
        // moment().month("July").format("M");
        strDate = strDate.split(' ')
        strDate = `${strDate[3]}-${moment().month(strDate[1]).format('MM')}-${strDate[2]}`
        console.log(strDate)
        
        return moment(strDate, 'YYYY-MM-DD')
    }

    convertTimeMoment = (strTime) => {       
        return moment(strTime, 'HH:mm')
    }

    renderPopover = (item) => {
        console.log(item)
        const isAdmin = (this.props.member.role === 'admin')

        return(
            <div className="popover-event">
                <Form 
                    className="popover-event-form"
                    ref = {this.formRef}
                    initialValues={{
                        name: item.name,
                        location: item.location,
                        description: item.description,
                        thumbnail: item.thumbnail,
                        startDate: this.convertDateMoment(item.startDate),
                        startTime: this.convertTimeMoment(item.startTime),
                        endDate: this.convertDateMoment(item.endDate),
                        endTime: this.convertTimeMoment(item.endTime),
                    }}
                    >
                    <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please input event name.'}]}
                        >
                        <Input id='event' onChange={this.onModalChange} placeholder="Event Name" />
                    </Form.Item>

                    <Form.Item
                        name="location"
                        extra="Include a location for the event"
                    >
                        <Input id='location' onChange={this.onModalChange} placeholder="Location" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        extra="Include an event description."
                    >
                        <Input.TextArea id='description' onChange={this.onModalChange} placeholder="Description" />
                    </Form.Item>

                    <Form.Item
                        name="thumbnail"
                        extra="Include an event thumbnail link"
                    >
                        <Input.TextArea id='thumbnail' onChange={this.onModalChange} placeholder="thumbnail" />
                    </Form.Item>

                    <UploadImage 
                        form={this.formRef} />

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name="startDate"
                                extra="Enter a start date."
                                rules={[{ required: true, message: 'Please input event start date.'}]}

                            >
                                {/* <Input id='start' onChange={this.props.onModalChange} placeholder="Start time" /> */}
                                <DatePicker style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="startTime"
                                extra="Enter a start time."
                                style={{'padding': '0 0 0 10px'}}
                                rules={[{ required: true, message: 'Please input event start time'}]}

                            >
                                {/* <Input id='start' onChange={this.props.onModalChange} placeholder="Start time" /> */}
                                <TimePicker style={{width: '100%'}} format='HH:mm' />
                            </Form.Item>
                        </Col>
                    </Row>   

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name="endDate"
                                extra="Enter a end date"
                                rules={[{ required: true, message: 'Please input event end date.'}]}
                            >
                                {/* <Input id='start' onChange={this.props.onModalChange} placeholder="Start time" /> */}
                                <DatePicker/>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                            name="endTime"
                            extra="Enter a end time."
                            style={{'padding': '0 0 0 10px'}}
                            rules={[{ required: true, message: 'Please input event end time.'}]}
                            >
                                {/* <Input id='start' onChange={this.props.onModalChange} placeholder="Start time" /> */}
                                <TimePicker format='HH:mm'/>
                            </Form.Item>
                        </Col>
                    </Row>                    
                    
                    <Form.Item>

                    { 
                        (isAdmin) ? 
                        <div>
                            <Button id="submit" type="primary" onClick={this.updateEvent} htmlType="submit">
                                Update
                            </Button>

                            <Button id="submit" onClick={this.deleteEvent} htmlType="submit">
                            Delete
                            </Button>
                        </div>
                    :
                        <Button htmlType="submit" onClick={() => this.setState({visible: false})}>
                            Close
                        </Button>
                    }

                    </Form.Item>

                </Form>
            </div>
        )
    }

    onChange = values => {
        console.log(values)
        //this.setState({[values.target.id]: values.target.value})
      }

    updateEvent = async () => {
        const formData = this.formRef.current.getFieldsValue()

        formData.startDate = this.props.parseDate(formData.startDate)
        formData.endDate = this.props.parseDate(formData.endDate)            
        formData.startTime = this.props.parseTime(formData.startTime) 
        formData.endTime = this.props.parseTime(formData.endTime)

        if (formData !== this.formRef.current.initialValues) {
            await this.props.editEvent(formData, this.props.item.id)
        }

        this.setState({visible: false})
    }
    deleteEvent = async () => {
        await this.props.deleteEvent(this.props.item.id)
        
        this.setState({visible: false})
    }

    render() {
        console.log('render event card')
        return(
            
               <div class="example-1 card">
                    <div class="wrapper" 
                        style={{'background':`url('${this.props.item.thumbnail || 'https://i0.wp.com/bestlifeonline.com/wp-content/uploads/2017/05/beautiful_places_to_visit_in_europe-wallpaper-2560x1440.jpg?resize=1024%2C576&ssl=1'}') 20% 1%/cover no-repeat`}}>
                        
                        <div class="date">
                            <span class="day">{this.props.item.startDate.split(" ")[2]}</span>
                            <span class="month">{this.props.item.startDate.split(" ")[1]}</span>
                            <span class="year">{this.props.item.startDate.split(" ")[0]}</span>
                        </div>
                        <Popover
                            placement="right"
                            title="Event Detail"
                            content={this.renderPopover(this.props.item)}
                            trigger="click"
                            visible={this.state.visible}
                            onVisibleChange={this.handleVisibleChange}
                        >
                            <p className="add-event"><EditOutlined/></p>    
                        </Popover>
                        <div class="data">
                            <div class="content">
                                <span class="location">{this.props.item.location || "TBA"}</span>
                                <h1 class="title"><a href="#">{this.props.item.name}</a></h1>
                                <div className="text">
                                    <p class="text">{this.props.item.description || "No description is available."}</p>
                                    <p className="start-date">{`Starts: ${this.props.item.startDate} @ ${this.props.item.startTime}`}</p>
                                    <p className="end-date">{`Ends: ${this.props.item.endDate} @ ${this.props.item.endTime}`}</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
        )
    }
}

/* <div className="event-card">
                    <div className="meta">
                        <p className="event-location">{this.props.item.location}</p>              
                        <p className="event-name">{this.props.item.name}</p>      
                    </div>
                    <div className="description">
                        <p className="event-description">{this.props.item.description}</p>
                    </div>
                    <div className="start">
                        <span>Starts</span>
                        <p className="date">{`: ${this.props.item.startDate} `}</p>
                        <p className="time">{` @${this.props.item.startTime}`}</p>
                    </div>
                    <div className="end">
                        <span>Ends</span>
                        <p className="date">{`: ${this.props.item.endDate} `}</p>
                        <p className="time">{` @${this.props.item.endTime}`}</p>
                    </div>
                </div> */

export default EventCard;