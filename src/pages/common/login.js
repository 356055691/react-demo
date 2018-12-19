import React, { Component } from 'react';
import { POST } from '../../libs/http';
import { Form, Icon, Input, Button, Card, notification } from 'antd';

const FormItem = Form.Item;

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          username: values.username,
          password: values.password,
          captcha: '3'
        };
        POST('/login', params, true).then((res) => {
          if (res && res.code === 1000) {
            notification.success({
              message: '提示',
              description: '登录成功！',
            });
            this.props.history.push('/undone/list');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            notification.warning({
              message: '提示',
              description: res.msg,
            });
          }
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card title="登录" style={{width: '400px', margin: '200px auto 0'}}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入账号！' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入账号" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

Login = Form.create({})(Login);

export default Login;