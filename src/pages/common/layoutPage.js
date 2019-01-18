import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import '../../App.css';

// import { browserHistory } from 'react-router'

import { createBrowserHistory } from 'history';
import asyncComponent from '../../libs/AsyncComponent';
const LayoutRoute = asyncComponent(() => import('../../pages/common/layoutRoute'));
const Login = asyncComponent(() => import('../../pages/common/login'));

const history = createBrowserHistory();

class LayoutPage extends Component {
  render() {
    return (
      <Router history={history}>
        <div style={{width: '100%', height: '100%'}}>
          <Route exact path="/login" component={ Login }/>
          <Route path="/page" component={ LayoutRoute }/>
        </div>
      </Router>
    );
  }
}

export default LayoutPage;
