import React from 'react';
import { Modal, Form, Input} from 'antd';

class ProfileForm extends React.Component {    

    render() {
        return (
            <div className="profile-form">
                <Modal
                    value={this.state}
                    title="Edit Profile"
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                >
                    <Form onFinish={this.props.handleOk} ref={this.props.formRef} initialValues={this.props.initFields}>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please input user name.'}]}
                        >
                            <Input id='name' onChange={this.props.onModalChange} placeholder={this.props.user.name} value={'dsadsa'}/>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            extra="Here's the email registered with your account"
                        >
                            <Input id='email' disabled onChange={this.props.onModalChange} placeholder={this.props.user.email} />
                        </Form.Item>

                        <Form.Item
                            name="thumbnail"
                            extra="Include link to thumbnail."
                        >
                            <Input id='thumbnail' onChange={this.props.onModalChange} placeholder={this.props.user.thumbnail} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            extra="Leave blank to keep old password."
                        >
                            <Input
                                id='password' onChange={this.props.onModalChange}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                    </Form>                    
                </Modal>
            </div>
        );
    }

}

export default ProfileForm;