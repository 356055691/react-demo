import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { Layout, Icon, Row, Col, Dropdown, Menu, notification } from 'antd';
import '../../App.css';
import MenuList from '../common/menuList';
import RouterList from '../../router';
// import { browserHistory } from 'react-router'

import { createBrowserHistory } from 'history';
import asyncComponent from '../../libs/AsyncComponent';
import { GET } from '../../libs/http';
const Login = asyncComponent(() => import('../../pages/common/login'));

const history = createBrowserHistory();

const { Header, Content, Sider } = Layout;

class LayoutPage extends Component {
  state = {
    collapsed: false
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
        window.location.href = window.location.origin + '/login';
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
      <div style={{width: '100%', height: '100%'}}>
        <Router history={history}>
          { history.location.pathname === '/login' ? 
            <Route exact path="/login" component={ Login }/>
            :
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
                          管理员<Icon type="down" />
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
          }
        </Router>
      </div>
    );
  }
}

export default LayoutPage;
