import React from 'react';
import { Row, Col, Modal, Form, Input, Select, DatePicker, TimePicker } from 'antd';
import UploadImage from './UploadImage'

class EventForm extends React.Component {
    
    state = {
        initFields: {}
    }

    componentDidMount = () => {
        this.handleUpdate();
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.formType != this.props.formType) {
            this.handleUpdate();
        }
    }

    handleUpdate = async () => {
        if(this.props.formType === 'edit') {
            await this.setState({initFields: {
                title: this.props.page.title,
                image: this.props.page.image,
                video: this.props.page.video,
                tag: this.props.page.tag,
                content: this.props.page.content,
            }})
        } else {
            await this.setState({initFields: {
                name: '',
                description: '',
                location: '',
                start: '',
                end: '',
            }})
        }

        if(this.props.formRef.current) {
            this.props.formRef.current.setFieldsValue(this.state.initFields)
        }
    }

    render() {
        return (
            <div className="event-form">
                <Modal
                    value={this.state}
                    title={this.props.formType.charAt(0).toUpperCase() + this.props.formType.slice(1) + " Event"}
                    visible={this.props.visible}

                    onOk={() => {
                        if(!this.props.formRef.current) return

                        this.props.formRef.current
                            .validateFields()
                            .then(values => {
                                this.props.handleOk(values)
                            })
                    }}

                    onCancel={this.props.handleCancel}
                >
                    <Form ref={this.props.formRef} initialValues={this.state.initFields}>
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

                        <Form.Item
                            name="thumbnail"
                            extra="Include a thumbail link"
                        >
                            <Input id='thumbnail' onChange={this.onModalChange} placeholder="Thumbnail" />
                        </Form.Item>

                        <UploadImage
                            form={this.props.formRef} />

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
                    </Form>                    
                </Modal>
            </div>
        );
    }

}

export default EventForm;