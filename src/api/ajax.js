/**
 * 封装axios用来发送请求的模块
 * 需求：
 *  1. 返回值promise
 *  2. 请求成功，返回值里面就是data数据
 *  3. 请求失败，统一处理错误
 */

import axios from 'axios'
import { message } from 'antd'  //message是蚂蚁的错误处理函数,提示框

export default function ajax(url, data, method = 'GET') {
    // 将请求方式转为大写
    console.log(url, data, method)
    method = method.toUpperCase();

    let promise = null;
    if (method === "GET") {
        promise = axios.get(url, {
            params: data
        })
    } else {
        console.log ('res.data')
        promise = axios.post(url, data)
    }
    // 处理请求返回值,再将处理后的值返回
    return promise
        .then(res => {
            //处理成功
            
            return res.data
        })
        .catch(err => {
            // 说明请求失败（服务器内部错误、网络问题等）
            console.log('******* 请求失败了~ ******');
            console.log(err);
            console.log('******* 请求失败了~ ******');
            // 提示给用户
            message.error('网络异常，请刷新重试~', 2);
        })

}