/*
功能：登录路由组件
*/

import React, { Component } from 'react'
import {
    Form, Icon, input, Buton
} from 'antd'

import log from './logo.png'
import './index.less'

const Item = Form.item;   //?

export default class Login extends Component {

    login = (e) => {
        e.preventDefault();
    }
    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src="logo" alt="log"/>
                    <h1>react项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h3>用户登录</h3>
                    Form[onSubmit=this.login className=login-form]
                </section>
            </div>
        )
    }
}