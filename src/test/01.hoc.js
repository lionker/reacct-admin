import React, { Component } from 'react'

export default function witHoc(name) {
    return () => class extends Compoennt {
        static displayName = `Form(${getDisplayName(WrappedComponent)})`

        state = {
            usename: '',
            password: '',
            rePassword: ''
        }

        // 高阶函数 --> 这样后面就能一直复用当前函数，而不用重新创建了~
        composeChange = (name) => {
            return (e) => {
                this.setState({
                    [name]: e.target.value
                })
            }
        }
        // 统一所有提交表单函数名
        handleSubmit = (e) => {
            e.preventDefault();
            const {username, password, rePassword} = this.state;
            alert(`用户名: ${username}, 密码: ${password}, 确认密码: ${rePassword}`);
        }

        //渲染
        render() {
            const mapMethodProp = {
                composeChange: this.composeChange,
                handleSubmit: this.handleSubmit
            }
            return <div>
                <h2>{name}</h2>
                <WrappedComponent {...mapMethodProp} {...this.state} />
            </div>
        }
    }
}

function getDisplayName(WrappedComponent){
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}