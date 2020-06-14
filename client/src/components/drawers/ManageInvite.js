import React from 'react';
import { Drawer, Form, Button, Space, Input, Select, Table } from 'antd';
import SidebarScrollbar from '../scrollbars/SidebarScrollbar'
import {  MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

class ManageInvite extends React.Component {

    formRef = React.createRef();

    state = {
        selectedRows: {},
    }

    columns = [
        {
            title: 'From',
            dataIndex: 'sender',
            // render: what => <p style={{color:'green'}}>oi</p>
        },
        {
            title: 'Server',
            dataIndex: 'server',
        },
    ]

    data = [
        {
            key: 1,
            sender: 'Yousef',
            server: 'Math 1104',
        },
        {
            key: 2,
            sender: 'Yousef',
            server: 'Math 1104'
        },
        {
            key: 3,
            sender: 'Yousef',
            server: 'Math 1104'
        },
        {
            key: 4,
            sender: 'Yousef',
            server: 'Math 1104'
        },
    ]

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            this.setState({selectedRows: selectedRows})
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    onFinish = () => {
        const formData = this.formRef.current.getFieldsValue()
        console.log(formData)
        console.log(this.rowSelection.getCheckboxProps())

        if(!formData.invites || formData.invites.length === 0) return;

        // formData.invites.map((invite, index) => {
        //     const senderID = this.getSenderID(invite);
        //     this.props.addInvite(invite, senderID)
        // })
        
        this.formRef.current.resetFields()

        //Add confirmation or something
        
    }

    acceptInvites = () => {
        console.log(this.state.selectedRows)
    }

    getSenderID = (invite) => {
        let senderID;

        this.props.user.members.map((member, index) => {
            if(member.server.id === invite.server) {
                senderID = member.id
                return
            }
        })
        return senderID
    }

    renderServers = () => {     
        return (
            this.props.user.members.map((member, index) => {
                console.log(member.server.name)
                return (
                    <Select.Option value={member.server.id}>{member.server.name}</Select.Option>
                )
            })
        )   
    }

    renderInviteForm = () => {
        return (
            <Form
                name="dynamic-invite-form"
                onFinish={this.onFinish}
                ref={this.formRef}
            >

                <Form.List name="invites">
                    {(fields, { add, remove }) => {
                    return (
                        <div>
                        {fields.map(field => (
                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                            <Form.Item
                                {...field}
                                name={[field.name, 'email']}
                                fieldKey={[field.fieldKey, 'email']}
                                rules={[{ required: true, message: 'Missing email' },
                                        { type: 'email', message: 'Invalid email input'}]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                {...field}
                                name={[field.name, 'role']}
                                fieldKey={[field.fieldKey, 'role']}
                                rules={[{ required: true, message: 'Missing role' }]}
                            >
                                <Select
                                    placeholder="Select Role">
                                        <Select.Option value="admin">Admin</Select.Option>
                                        <Select.Option value="student">Student</Select.Option>                                                    
                                </Select>
                                
                            </Form.Item>
                            <Form.Item
                                {...field}
                                name={[field.name, 'server']}
                                fieldKey={[field.fieldKey, 'server']}
                                rules={[{ required: true, message: 'Missing server' }]}
                            >
                                <Select
                                    placeholder="Select Server"
                                    >
                                    {this.renderServers()}
                                </Select>
                            </Form.Item>

                            <MinusCircleOutlined
                                onClick={() => {
                                remove(field.name);
                                }}
                            />
                            </Space>
                        ))}

                        <Form.Item>
                            <Button
                            type="dashed"
                            onClick={() => {
                                add();
                            }}
                            block
                            >
                            <PlusOutlined /> Add invite
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType="submit" type="primary"
                            >Send Invites</Button>
                        </Form.Item>

                        </div>
                    );
                    }}
                </Form.List>                                                      
                
            </Form>
        )
    }

    renderInviteTable = () => {
        return (
            <div>
                <Table
                    rowSelection={this.rowSelection}
                    columns={this.columns}
                    dataSource={this.data}
                />
                <Button type="primary" onClick={this.acceptInvites}>
                    Accept Invites
                </Button>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Drawer
                    title={this.props.title}
                    width='60%'
                    className='invite-drawer'
                    placement="right"
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                >
                    <h2>Send Invites</h2>                    
                    <SidebarScrollbar isChat={true} style={{ width: '100%', height: '35%', overflow: 'hidden' }}>
                        {this.renderInviteForm()}
                    </SidebarScrollbar> 
                    
                    <h2>Invite Requests</h2>                    
                    {this.renderInviteTable()}                        
                </Drawer>
            </div>
        )
    }

}

export default ManageInvite;