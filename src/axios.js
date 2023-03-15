import axios from "axios";
import { getToken } from "~/composables/auth"
import { toast } from "~/composables/util"



const service = axios.create({
    baseURL: '/api'
})

//添加请求拦截器
service.interceptors.request.use(function (config) {
    //每个请求前
    const token = getToken()

    if (token) {
        config.headers['token'] = token
    }
    return config;

}, function (error) {
    Promise.reject(error);
});

//添加响应拦截器
service.interceptors.response.use(function (response) {
    //对响应数据的处理
    return response.data.data;

}, function (error) {
    toast(error.response.data.msg || '请求失败', error)
    //错误处理

    return Promise.reject(error);
}
);

export default service