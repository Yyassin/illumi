import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

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
        console.log('handle update')
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
                            <Input id='event' onChange={this.props.onModalChange} placeholder="Event Name" />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            extra="Include an event description."
                        >
                            <Input id='description' onChange={this.props.onModalChange} placeholder="Description" />
                        </Form.Item>

                        <Form.Item
                            name="location"
                            extra="Include a location for the event"
                        >
                            <Input id='location' onChange={this.props.onModalChange} placeholder="Location" />
                        </Form.Item>

                        <Form.Item
                            name="start"
                            extra="Enter a start time."
                        >
                            <Input id='start' onChange={this.props.onModalChange} placeholder="Start time" />
                        </Form.Item>

                        <Form.Item
                            name="end"
                            extra="Enter an ending time."
                        >
                            <Input id='end' onChange={this.props.onModalChange} placeholder="End time" />
                        </Form.Item>
                    </Form>                    
                </Modal>
            </div>
        );
    }

}

export default EventForm;