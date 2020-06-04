import React from 'react';
import { Modal, Button, Form, Input, Checkbox, Select, message } from 'antd';

class PageForm extends React.Component {        

    render() {
        return (
            <div className="page-form">
                <Modal
                    value={this.state}
                    title="Create Page"
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                >
                    <Form onFinish={this.props.handleOk} ref={this.props.formRef}>
                        <Form.Item
                            name="title"
                            rules={[{ required: true, message: 'Please input page title.'}]}
                        >
                            <Input id='title' onChange={this.props.onModalChange} placeholder="Page Title" />
                        </Form.Item>

                        <Form.Item
                            name="image"
                            extra="Include link to image."
                        >
                            <Input id='image' onChange={this.props.onModalChange} placeholder="Image" />
                        </Form.Item>

                        <Form.Item
                            name="video"
                            extra="Include youtube link to video."
                        >
                            <Input id='video' onChange={this.props.onModalChange} placeholder="Video" />
                        </Form.Item>

                        <Form.Item
                            name="tag"
                        >
                            <Select
                                showSearch
                                placeholder="Select Page Tag"
                                optionFilterProp="children"
                                onChange={this.props.onSelectChange}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                <Select.Option value="lesson">Lesson</Select.Option>
                                <Select.Option value="tutorial">Tutorial</Select.Option>
                            </Select>
                        </Form.Item>
                        
                        <Form.Item
                            name="text"
                        >
                            <Input.TextArea id='text' onChange={this.props.onModalChange} placeholder="Content Text" />
                        </Form.Item>
                    </Form>                    
                </Modal>
            </div>
        );
    }

}

export default PageForm;