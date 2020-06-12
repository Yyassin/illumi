import React from 'react';
import { Modal, Form, Input} from 'antd';

class ServerForm extends React.Component {
    
    state = {
        initFields: {}
    }

    componentDidMount = () => {
        this.handleUpdate();
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.server != this.props.server) {
            this.handleUpdate();
        }
    }

    handleUpdate = async () => {
        await this.setState({initFields: {
            name: this.props.server.name,
            thumbnail: this.props.server.thumbnail,
            outline: this.props.server.outline,
            description: this.props.server.description,
        }})

        if(this.props.formRef.current) {
            this.props.formRef.current.setFieldsValue(this.state.initFields)
        }
    }

    render() {
        return (
            <div className="server-form">
                <Modal
                    value={this.state}
                    
                    title={this.props.formType.charAt(0).toUpperCase() + this.props.formType.slice(1) + " Server"}
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
                    <Form
                        ref={this.props.formRef}
                        initialValues={this.state.initFields}>

                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please input server name.'}]}
                        >
                            <Input id='name' onChange={this.props.onModalChange} placeholder="Server Name" />
                        </Form.Item>

                        <Form.Item
                            name="thumbnail"
                            extra="Include link to thumbnail."
                        >
                            <Input id='thumbnail' onChange={this.props.onModalChange} placeholder="Thumbnail" />
                        </Form.Item>

                        <Form.Item
                            name="outline"
                            extra="Include link to course outline."
                        >
                            <Input id='outline' onChange={this.props.onModalChange} placeholder="Course Outline" />
                        </Form.Item>
                        
                        <Form.Item
                            name="description"
                        >
                            <Input.TextArea id='description' onChange={this.props.onModalChange} placeholder="Server Description" />
                        </Form.Item>
                    </Form>                    
                </Modal>
            </div>
        );
    }

}

export default ServerForm;