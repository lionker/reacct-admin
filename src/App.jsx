/**
 * 应用主组件
 */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Login from './pages/login/index'
import Admin from './pages/admin/index'

// 测试高阶组件
// import A from './test.1/login';
// import B from './test.1/register';

import './assets/less/reset.less';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          {/* 为了开发login组件设计的 */}
          {/* <Redirect to="/login" /> */}
          <Route path="/" component={Admin} />
        </Switch>
      </div>
    )
  }
}
