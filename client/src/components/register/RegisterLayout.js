import React from 'react';
import { Card, Row } from 'antd';
import RegisterForm from './RegisterForm'
import CanvasBlob from './CanvasBlob'
import './Register.css'

import Titlebar from '../Titlebar/Titlebar'


class RegisterLayout extends React.Component {
    render() {
        return (
            <div>    
                <div className="register-bg"></div>
                <CanvasBlob />
                <h1 className="logo">illumi</h1>
                <Row className="register-page">
                    <Card bordered={false} className="register-card">
                        <h1 className="register-title">Welcome Back</h1>
                        <p className="register-greet">Nice to see you again!</p>
                        <RegisterForm />
                    </Card>   
                </Row>

                <Titlebar bg={"transparent"} />
            </div>




        )
    }
}

export default RegisterLayout;
 