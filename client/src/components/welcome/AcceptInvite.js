import React from 'react';
import { Drawer, Form, Button, Space, Input, Select, Table } from 'antd';
import SidebarScrollbar from '../scrollbars/SidebarScrollbar'
import {  MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

class AcceptInvite extends React.Component {

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

    acceptInvites = async () => {
        const rowData = this.state.selectedRows          

        if(!rowData || !rowData.map || rowData.length === 0) return

        rowData.map((invite, index) => {
            this.props.acceptInvite(invite.id)
        })
    }

    declineInvites = async () => {
        const rowData = this.state.selectedRows          

        if(!rowData || !rowData.map || rowData.length === 0) return

        rowData.map((invite, index) => {
            this.props.declineInvite(invite.id)
        })
    }

    renderInviteTable = () => {
        return (
            <div>
                <Table
                    rowSelection={this.rowSelection}
                    columns={this.columns}
                    dataSource={this.state.data}
                    pagination={!this.props.hidepage}
                    style={{paddingBottom:"24px"}}
                    className="accept-invite"
                />

                <div>
                    <Button className="register-btn" style={{float: 'left'}} type="primary" onClick={this.acceptInvites}>
                        Accept Invites
                    </Button>
                    <Button className="register-btn" style={{float: 'right'}} onClick={this.declineInvites}>
                        Decline Invites
                    </Button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>  
                <h2>{this.props.title ? this.props.title : 'Invite Requests'}</h2>                    
                {this.renderInviteTable()}                        
            </div>
        )
    }

}

export default AcceptInvite;