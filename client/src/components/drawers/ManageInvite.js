import React from 'react';
import { Drawer, Form, Button, Space, Input, Select, Table } from 'antd';
import SidebarScrollbar from '../scrollbars/SidebarScrollbar'
import {  MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './Popup.css'

class ManageInvite extends React.Component {

    formRef = React.createRef();

    state = {
        selectedRows: {},
        data: []
    }

    componentDidMount = () => {
        this.handleUpdate();
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        console.log('comp did update')
        if (prevProps.user.invites !== this.props.user.invites) {
            console.log(prevProps.user.invites)
            console.log(this.props.user.invites)
            this.handleUpdate();
        }
    }

    handleUpdate = () => {
        console.log('handle update')        
        let data = []

        this.props.user.invites.map((invite, index) => {
            data.push({
                key: index,
                id: invite.id,
                sender: invite.sender.user.name,
                senderThumbnail: invite.sender.user.thumbnail,
                server: invite.sender.server.name,
                serverThumbnail: invite.sender.server.thumbnail,
            })
        })

        this.setState({
            data: data
        })
    }

    columns = [
        {
            dataIndex: 'senderThumbnail',
            render: image => <p className="invite-thumb"
            style={{'background': `url("${image}")`,
            'background-size': 'cover',
            'background-position': 'center'}}>
            </p>
        },
        {
            title: 'From',
            dataIndex: 'sender',
            //render: senderThumbnail => <p style={{color:'green'}}>{senderThumbnail}</p>
        },
        {
            dataIndex: 'serverThumbnail',
            render: image => <p className="invite-thumb"
            style={{'background': `url("${image}")`,
            'background-size': 'cover',
            'background-position': 'center'}}>
            </p>
        },
        {
            title: 'Server',
            dataIndex: 'server',
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

        if(!formData.invites || formData.invites.length === 0) return;

        formData.invites.map((invite, index) => {
            const senderID = this.getSenderID(invite);
            this.props.addInvite(invite, senderID)
        })
        
        this.formRef.current.resetFields()

        //Add confirmation or something
        
    }

    acceptInvites = async () => {
        const rowData = this.state.selectedRows          
        let acceptInvites = [];

        if(!rowData || rowData.length === 0) return

        rowData.map((invite, index) => {
            console.log(invite.id)
            //acceptInvites.push(this.props.acceptInvite(invite.id))

            var promise = new Promise( async(resolve, reject) => {
                resolve (await this.props.acceptInvite(invite.id))
            });
            acceptInvites.push(promise)
        })

        await Promise.all(acceptInvites)

        this.props.fetchData()
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
                    dataSource={this.state.data}
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