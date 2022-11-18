//封装axios
import axios from "axios";

//创建axios实例
let service = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 3000,
    //跨域请求
    withCredentials:true
})

// 设置请求次数，请求的间隙
service.defaults.retry = 4;
service.defaults.retryDelay = 1000;

export default service;