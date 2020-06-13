import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    PlusOutlined,
    SettingOutlined,
    CloseOutlined
} from '@ant-design/icons';

import PageForm from '../forms/PageForm'

const { Header } = Layout;

class InnerHeader extends React.Component {
    formRef = React.createRef();
    pageRef = React.createRef();

    state = {
        showModal: false,
        formType: '',

        // modal fields
        title: '',
        image: '',
        video: '',
        tag: '',
        content: '',
    }

    deletePage = async(e) => {
        await this.props.deletePage(this.props.page.id)
        this.props.fetchData()
    }

    // modal controller
    showModal = (e) => {
        e.preventDefault()
        this.setState({
            showModal: true,
        });
    };

    onModalChange = values => {
        this.setState({[values.target.id]: values.target.value})
    }

    onSelectChange = values => {
        this.setState({tag: values})
    }

    handleOk = async (e) => {
        this.setState({
            showModal: false,
        });

        const formData = this.formRef.current.getFieldsValue()
        let initialFields;
        
        if (this.pageRef.current) {
            initialFields = this.pageRef.current.state.initFields
        }

        if (this.state.formType === 'create') {
            await this.props.addPage(this.state, this.props.server.id)
            console.log('create page')

        } else if(JSON.stringify(formData) !== JSON.stringify(initialFields)) {
            await this.props.editPage(formData, this.props.page.id)
            console.log('edit page')
        }
            
        this.props.fetchData()

        this.setState({
            title: '',
            image: '',
            video: '',
            tag: '',
            content: '',
        });
    };

    handleCancel = e => {
        this.setState({
            showModal: false,
        });
    };

    createForm = async () => {
        this.setState({
            showModal: true,
            formType: 'create',
        });        
    }

    editForm = async () => {
        this.setState({
            showModal: true,
            formType: 'edit',
        });
    }

    render() {
        return (
            <Header className="main-header">
                <Breadcrumb style={{ margin: '0 0' }}>
                    <Breadcrumb.Item className="header-bold">{ this.props.server.name }</Breadcrumb.Item>
                    <Breadcrumb.Item className="header-light">{ this.props.page.title }</Breadcrumb.Item>
                    <div className="menu-icon-tray" style={{display: "inline-block"}}>
                        <span onClick={this.editForm}><SettingOutlined className="page-settings-icon"/></span>
                        <span onClick={this.deletePage}><CloseOutlined className="page-settings-icon"/></span>
                        <span onClick={this.createForm}><PlusOutlined className="page-settings-icon" /></span>                        
                    </div>      
                </Breadcrumb>

                <PageForm
                    ref={this.pageRef}
                    visible={this.state.showModal}
                    formRef={this.formRef}
                    formType={this.state.formType}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    onModalChange={this.onModalChange}
                    onSelectChange={this.onSelectChange}
                    page={this.props.page}
                    />
            </Header>
        )
    }
}

export default InnerHeader;