import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { authenticate } from "../../store/actions/authActions";

class RegisterForm extends React.Component {
  state={
    email: '',
    password: ''
  }

  componentDidMount() {
    message.config({
      top: 40,
    })
  }
  
  onChange = values => {
    this.setState({[values.target.id]: values.target.value})
  }

  onFinish = () => {};

  onSignIn = async () => {
    await this.props.authenticate(this.state, 'signin')
    this.sendMessage()
  }

  onSignUp = async () => {
    await this.props.authenticate(this.state, 'signup')
    this.sendMessage()
  }

  sendMessage = () => {
    if(this.props.authMsg !== "") {
      message.error(this.props.authMsg, 3)
    }
  }

  // remove in production
  autoSignIn = async () => {
    await this.props.authenticate({
      email: 'test4@gmail.com',
      password: 'password'
    }, 'signin')
    this.sendMessage()
  }

  render () {
    if (this.props.auth) return <Redirect to='/welcome'/>
    return (
      <Form
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input email.'},
                  { type: 'email', message: 'Invalid email input'}]}
        >
          <Input id='email' onChange={this.onChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            id='password' onChange={this.onChange}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{float: 'left'}}>Remember me</Checkbox>
          </Form.Item>
  
          <Button type="link" className="login-form-forgot" onClick={this.autoSignIn} style={{float: 'right'}}>
            Auto Signin
          </Button>
        </Form.Item>
  
        <Form.Item style={{marginBottom: '7px'}}>
          <Button id="signin" onClick={this.onSignIn} htmlType="submit" className="register-btn" style={{float: 'left'}}>
            Log in
          </Button>
          <Button id="signup" onClick={this.onSignUp} type="primary" htmlType="submit" className="register-btn" style={{float: 'right'}}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.auth.accessToken,
    auth: state.auth.auth,
    authMsg: state.auth.authMsg,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (user, type) => dispatch(authenticate(user, type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
  

