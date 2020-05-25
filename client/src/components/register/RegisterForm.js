import React from 'react';
import axios from 'axios';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class RegisterForm extends React.Component {
  state={
    email: '',
    password: ''
  }
  
  onChange = values => {
    this.setState({[values.target.id]: values.target.value})
  }

  onFinish = () => {
    axios.post("/api/auth/signin", this.state)
    .then(token => {
      console.log(token);
    })
    .catch(e => {
      console.log(e.message);
    })
  };

  render () {
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
  
          <a className="login-form-forgot" href="" style={{float: 'right'}}>
            Forgot password
          </a>
        </Form.Item>
  
        <Form.Item style={{marginBottom: '7px'}}>
          <Button htmlType="submit" className="register-btn" style={{float: 'left'}}>
            Log in
          </Button>
          <Button type="primary" htmlType="submit" className="register-btn" style={{float: 'right'}}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    );
  };
}

export default RegisterForm;
  

