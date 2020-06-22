import React from 'react'

import {Popover, Form, Button, DatePicker, TimePicker, Input, Row, Col} from 'antd'

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
                        description: item.location,
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
                        name="description"
                        extra="Include an event description."
                    >
                        <Input id='description' onChange={this.onModalChange} placeholder="Description" />
                    </Form.Item>

                    <Form.Item
                        name="location"
                        extra="Include a location for the event"
                    >
                        <Input id='location' onChange={this.onModalChange} placeholder="Location" />
                    </Form.Item>

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
                        <Button id="submit" onClick={this.updateRole} htmlType="submit">
                            Update
                        </Button>
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

    render() {
        console.log('render event card')
        return(
            <Popover
                placement="right"
                title="Event Detail"
                content={this.renderPopover(this.props.item)}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                >
                <div className="event-card">
                    <p>{this.props.item.name}</p>                    
                    <p>{this.props.item.location}</p>
                    <p>{this.props.item.description}</p>
                    <p>{this.props.item.startDate}</p>
                    <p>{this.props.item.startTime}</p>
                    <p>{this.props.item.endDate}</p>
                    <p>{this.props.item.endTime}</p>
                </div>
            </Popover>
        )
    }
}

export default EventCard;