import React from 'react';
import { Drawer, Form, Button } from 'antd';
import SidebarScrollbar from '../scrollbars/SidebarScrollbar'

class ManageInvite extends React.Component {

    onFinish = () => {
        console.log('send invites idfk')
    }

    renderFields = () => {
        return (
            <Form.List name="invites">
                {(fields, { add, remove}) => {
                }}
            </Form.List>
        )
    }

    render() {
        return (
            <div>
                <Drawer
                    title={this.props.title}
                    placement="right"
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                >
                    <h2>Send Invites</h2>                    
                    <SidebarScrollbar isChat={true} style={{ width: '100%', height: '50%', overflow: 'hidden' }}>

                        <Form
                            name="dynamic-invite-form"
                            onFinish={this.onFinish}
                        >

                            {this.renderFields()}                            
                            
                            <p>hi</p>
                            <p>hi</p>
                            <p>hi</p>
                            <p>hi</p>
                            <p>hi</p>
                            <p>hi</p>
                            <p>hi</p>
                            <p>hi</p>
                            <p>hi</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum pariatur veritatis culpa, earum deserunt debitis sequi consequatur. Beatae, recusandae ad dolor itaque reprehenderit incidunt, harum possimus ipsa dolorem totam omnis!</p>
                            
                        </Form>

                    </SidebarScrollbar> 
                </Drawer>
            </div>
        )
    }

}

export default ManageInvite;