/* eslint-disable */
import axios from "axios"
import qs from "qs"
axios.defaults.timeout = 100000;//响应时间
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
axios.defaults.withCredentials = true;
// console.log(process.env.NODE_ENV, '当前环境')

console.log()
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    window.console.log('错误的传参')
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
    //对响应数据做些事
    if (!res.data.success) {
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    window.console.log('网络异常')
    return Promise.reject(error);
});
/**
 *返回一个Promise(发送post请求)
 * @export
 * @param {*} path
 * @param {*} params
 * @returns
 */
export function fetchPost(path, params) {
    return new Promise((resolve, reject) => {
        axios.post( path, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
/**
 * 返回一个Promise(发送get请求)
 * @export
 * @param {*} path
 * @param {*} params
 * @returns
 */
export function fetchGet(path, params) {
    return new Promise((resolve, reject) => {
        axios.get( path, { params: params })
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default { fetchPost, fetchGet }
