import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import '../../App.css';
import MenuList from '../common/menuList';
import RouterList from '../../router';
// import { browserHistory } from 'react-router'

import { createBrowserHistory } from 'history';
import asyncComponent from '../../libs/AsyncComponent';
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
                  <span>
                    <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle}/>
                  </span>
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
