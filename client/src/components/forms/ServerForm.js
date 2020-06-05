import React from 'react';
import { Modal, Form, Input} from 'antd';

class ServerForm extends React.Component {    

    render() {
        return (
            <div className="server-form">
                <Modal
                    value={this.state}
                    title="Create Server"
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                >
                    <Form onFinish={this.props.handleOk} ref={this.props.formRef}>
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