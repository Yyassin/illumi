import React from 'react';
import { Card, Row } from 'antd';
import RegisterForm from './RegisterForm'
import Animation from './Animation'
import './Register.css'

import Titlebar from '../Titlebar/Titlebar'

const path = require('path')
class RegisterLayout extends React.Component {
    render() {
        return (
            <div>    
                <div className="register-bg"></div>
                <Animation />
                <img src={path.join(__dirname, '../icon.png')}
                 className="logo-img"
                 alt=""/>
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
 
