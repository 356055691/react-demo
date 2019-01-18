import React, { Component } from 'react';
import MenuList from '../common/menuList';
import { Layout, Icon, Row, Col, Dropdown, Menu, notification } from 'antd';
import { GET } from '../../libs/http';
import cookie from 'react-cookies';
import RouterList from '../../router';
const { Header, Content, Sider } = Layout;

class LayoutRoute extends Component {
  state = {
    collapsed: false,
    loginName: cookie.load('loginName')
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  exitFun = () => {
    GET('/loginOut', {}).then((res) => {
      if (res && res.code === 1000) {
        notification.success({
          message: '提示',
          description: '退出成功！',
        });
        this.props.history.push('/login');
      } else {
        notification.warning({
          message: '提示',
          description: res.msg,
        });
      }
    });
  }
  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" style={{width: 20, height: 64}} />
          <MenuList></MenuList>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Row>
              <Col span={19}>
              <span>
                <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle}/>
              </span>
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>
                <Dropdown overlay={
                  <Menu>
                    <Menu.Item>
                      <span onClick={() => this.exitFun()}>退出登录</span>
                    </Menu.Item>
                  </Menu>
                } trigger={['click']}>
                  <span style={{ cursor: 'pointer' }}>
                    {this.state.loginName}<Icon type="down" />
                  </span>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <RouterList></RouterList>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutRoute;
