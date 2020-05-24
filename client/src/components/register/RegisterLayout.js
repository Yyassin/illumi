import React from 'react';
import { Card, Row, Col } from 'antd';
import RegisterForm from './RegisterForm'


class RegisterLayout extends React.Component {
    render() {
        return (
            <div>
                <div className="register-bg"></div>
                
                <h1 className="logo">illumi</h1>
                <Row className="register-page">
                    <Card bordered={false} className="register-card">
                        <h1 className="register-title">Welcome Back</h1>
                        <p className="register-greet">Nice to see you again!</p>
                        <RegisterForm />
                    </Card>   
                </Row>
            </div>




        )
    }
}

export default RegisterLayout;
 