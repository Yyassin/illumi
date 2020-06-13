import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

class PageForm extends React.Component {
    
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
                title: '',
                image: '',
                video: '',
                tag: '',
                content: '',
            }})
        }

        if(this.props.formRef.current) {
            this.props.formRef.current.setFieldsValue(this.state.initFields)
        }
    }

    render() {
        return (
            <div className="page-form">
                <Modal
                    value={this.state}
                    title={this.props.formType.charAt(0).toUpperCase() + this.props.formType.slice(1) + " Page"}
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
                                <Select.Option value="Lessons">Lesson</Select.Option>
                                <Select.Option value="Tutorials">Tutorial</Select.Option>
                            </Select>
                        </Form.Item>
                        
                        <Form.Item
                            name="content"
                        >
                            <Input.TextArea id='content' onChange={this.props.onModalChange} placeholder="Content" />
                        </Form.Item>
                    </Form>                    
                </Modal>
            </div>
        );
    }

}

export default PageForm;