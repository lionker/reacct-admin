/*
功能：主页路由组件
*/

/**
 * 主页面路由组件
 */
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import {
    Layout
} from 'antd';

import Home from '../home';
import Category from '../category';
import Product from '../product';
import LeftNav from '../../components/left-nav';
import { getItem } from '../../utils/storage-utils';
import memory from '../../utils/memory-utils';

import logo from '../../assets/images/logo.png';

import './index.less';

const {
    Header, Content, Footer, Sider,
  } = Layout;
  
export default class Admin extends Component {
    /*
        1. 要持久存储用户信息 ----> localstorage
        2. 性能优化 (反复使用这些getItem等方法, 性能不好, 所以保存在内存中)
    */
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
        };
        //判断用户是否登录过
        const user = getItem()
        if (!user || !user._id) {
            //说明用户没有登录过, 跳转到登录页面
            return this.props.history.replace('/login')
        }
        // 在内存中储存用户信息
        memory.user = user
    }

    onCollapse = (collapsed) => {
        // console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {
        const { collapsed } = this.state;
       const opacity = collapsed ? 0 : 1;  // 将文字改为透明,不改变结构,只引起重绘
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <Link to="/home" className="logo">
                        <img src={logo} alt="logo" />
                        <h1 style={{ opacity }}>地壳知讯后台</h1>
                    </Link>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Route path="/home" component={Home} />
                        <Route path="/category" component={Category} />
                        <Route path="/product" component={Product} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        推荐使用谷歌浏览器，可以获得更佳页面操作体验
              </Footer>
                </Layout>
            </Layout>
        );
    }
}