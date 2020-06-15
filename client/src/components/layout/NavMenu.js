import React from 'react';
import { Menu, Dropdown, Drawer } from 'antd';
import { SettingFilled } from '@ant-design/icons';

import ProfileForm from '../forms/ProfileForm'
import ManageInvite from '../drawers/ManageInvite'

const { SubMenu } = Menu;

class NavMenu extends React.Component {

    formRef = React.createRef();

    state = {
        showModal: false,
        showDrawer: false,

        // modal fields
        initFields: {}
    }

    // modal controller
    showModal = (e) => {
        this.setState({
            showModal: true,
        });
    }; 

    handleOk = async(e) => {        
        console.log(this.formRef.current)
        const formData = this.formRef.current.getFieldsValue()

        if(JSON.stringify(formData) !== JSON.stringify(this.state.initFields)) {
            console.log("editing user")
            await this.props.editProfile(formData)
            this.props.fetchData()
        }
        
        this.setState({
            showModal: false,
        });
    };

    handleCancel = e => {
        this.setState({
            showModal: false,
        });
    };

    // drawer controller
    showDrawer = (e) => {
        this.setState({
            showDrawer: true,
        });
    }

    drawerClose = () => {
        this.setState({
            showDrawer: false,
        });
    }
    
    render() {
        const menu = (
            <Menu>
                <Menu.ItemGroup title="Settings">
                    <Menu.Item className="logout-tag" key="1" onClick={this.props.logout}>Logout</Menu.Item>
                    <Menu.Item className="tag" key="2" onClick={this.showModal}>Edit Profile</Menu.Item>
                    <Menu.Item className="tag" key="3" onClick={this.showDrawer}>Manage Invites</Menu.Item>
                    
                    <SubMenu title="Themes">
                        <Menu.ItemGroup title="Themes">
                            <Menu.Item>Light Theme</Menu.Item>
                            <Menu.Item>Dark Theme</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <Menu.Item className="close-tag" key="4">Close</Menu.Item>
                </Menu.ItemGroup>
            </Menu>
            );

        return (
            <li className="settings">
                <Dropdown className = "dropdown-menu ant-dropdown-open" trigger={['click']} overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <SettingFilled />
                    </a>
                </Dropdown>

                <ProfileForm
                    visible={this.state.showModal}
                    formRef={this.formRef}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    user={this.props.user}
                    />

                <ManageInvite
                    user={this.props.user}
                    title="Manage Invitations"
                    addInvite={this.props.addInvite}
                    acceptInvite={this.props.acceptInvite}
                    fetchData={this.props.fetchData}
                    onClose={this.drawerClose}
                    visible={this.state.showDrawer}
                />
                
            </li>
        )
    } 
}

export default NavMenu;