/*
功能：登录路由组件
*/

import React, { Component } from 'react'
import {
    Form, Icon, Input, Button, message
} from 'antd'    //按需引入

import { reqLogin } from '../../api';
import { setItem } from '../../utils/storage-utils';

import logo from '../../assets/images/logo.png'
import './index.less'

// console.log(reqLogin)
const Item = Form.Item;   //替换成Item


@Form.create()
class Login extends Component {
    //事件处理
    login = (e) => {
        e.preventDefault();

        // 校验表单是否通过
        // 获取一组表单数据
        // const result = this.props.form.getFieldsValue();
        // 获取部分表单数据
        // const result = this.props.form.getFieldsValue(['username']);
        // 获取单个表单数据
        // const result = this.props.form.getFieldValue('password');
        // console.log(result);
        // 表单校验的方法
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                //校验成功
                console.log(values)
                const { username, password } = values
                console.log(username,password)
                const result = await reqLogin(username, password);
                console.log(result)        
                if (result.status === 0) {
                    //登录成功
                    //提示登录成功, 保存用户登录信息, 跳转到主页面
                    message.success('登录success~')
                    setItem(result.data);
                    //已经登录成功, 不需要回退了~
                    this.props.history.replace('/')
                } else {
                    // 登录失败
                    // 提示错误
                    message.error(result.msg, 2)
                }
            } else {
                // 校验失败
                console.log('****** 表单校验失败 ******');
                console.log(err);
                console.log('****** 表单校验失败 ******');
            }
        })
    }
    /** 
     * 自定义表单的校验规则
    */
    validator = (rule, value, callback) => {
        // console.log(rule, value);
        const length = value && value.length;
        const pwdReg = /^[a-zA-Z0-9_]+$/;
        if (!value) {
            // callback如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误
            callback('必须输入密码');
        } else if (length < 4) {
            callback('密码必须大于4位');
        } else if (length > 12) {
            callback('密码必须小于12位');
        } else if (!pwdReg.test(value)) {
            callback('密码必须是英文、数组或下划线组成');
        } else {
            // 必须调用callback
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;  //引入验证函数
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="log0" />
                    <h1>react项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h3>用户登录</h3>
                    <Form onSubmit={this.login} className="login-form">
                        <Item>
                            {
                                // getFieldDecorator() 返回值是一个高阶组件
                                // getFieldDecorator()() 返回一个新组件，新组件内部就会给传入的组件定义校验规则
                                // getFieldDecorator(标识名称，配置对象)(组件)
                                // 配置对象 --> 属性名固定的对象
                                getFieldDecorator('username', {
                                    // 表单校验的规则
                                    rules: [
                                        { required: true, whitespace: true, message: '必须输入用户名' },
                                        { min: 4, message: '用户名必须大于4位' },
                                        { max: 12, message: '用户名必须小于12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成' }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                                )
                            }
                        </Item>
                        <Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        // 自定义表单校验规则
                                        { validator: this.validator }
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                )
                            }
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
};
export default Login