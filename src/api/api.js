/**
 * @file api.js
 * @description 定义后端服务地址，处理接口拦截
 * @author 尹博文
 * @createAt 2017-11-02
 */

import axios from 'axios';
import { message } from '@u51/miox-vant';

let base = '';
if (process.env.NODE_ENV === 'dev') { // 本地调试时使用的后端环境
    base = 'http://gcp-manager.k8s.dev:8080';
}

const path = '/gcp-manager/api/v1';

const instance = axios.create({
    withCredentials: true,
});
instance.interceptors.request.use((config) => {
    // 拼装完成url
    if (process.env.NODE_ENV !== 'dev') { // 使用相对地址
        config.url = `${path}${config.url}`;
    } else { // 使用绝对地址
        config.url = `${base}${path}${config.url}`;
    }
    return config;
});

/**
 * @description response返回数据拦截
 * @param <any> response 后端返回的数据
 * @return <Object> 返回接口数据或者报错信息
 */
instance.interceptors.response.use((response) => {
    // 200 非业务成功，也算失败
    if (response.iamStatus !== undefined && response.iamStatus !== 0) {
        message.error(response.message || '');
        return Promise.reject(response.data);
    }
    if (response.data.errors) {
        message.error(getErrMsg(response.data.errors));
        return Promise.reject(response.data);
    }
    return response.data;
}, (error) => {
    // 非200错误，如果status为499，则跳转至iam返回的url
    if (error && error.response && error.response.status === 499) {
        const curHref = encodeURIComponent(location.href);
        const backUrl = `${error.response.data.url.split('?reffer=')[0]}?reffer=${curHref}`;
        location.href = backUrl;
    } else {
        let errMsg = error.response && error.response.data && error.response.data.message;
        if (!errMsg) {
            errMsg = getErrMsg(error.response && error.response.data && error.response.data.errors);
        }
        message.error(errMsg);
    }
    return Promise.reject(error);
});

/**
 * @description 处理接口返回的错误信息
 * @param <any> errors 后端返回的错误信息
 */
function getErrMsg(errors) {
    errors = errors || [{
        message: '出错了!',
    }];
    const arr = [];
    errors.forEach((error) => {
        arr.push(error.message);
    });
    return arr.join('<br />');
}

export default instance;
