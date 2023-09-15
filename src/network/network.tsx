import axios from "axios";
import { Navigate } from "react-router-dom";

const baseURL = 'http://192.168.10.2:3000'
const timeout = 5000
export function Get(config:any){
    const instance = axios.create({
        baseURL,timeout
    })

    axiosInterceptors(instance)

    return instance(config)
}

export function Post(config:any){
    const instance = axios.create({
        baseURL,timeout,method:'POST'
    })

    axiosInterceptors(instance)

    return instance(config)
}


function axiosInterceptors(instance:any){
    //axios请求拦截器
    instance.interceptors.request.use(function (config:any){
        if (sessionStorage.getItem('token')){
            config.headers.authorization= sessionStorage.getItem('token')
        }
        return config
    }, (err:any) =>{
        return Promise.reject(err)
    })

    //axios响应拦截器
    instance.interceptors.response.use((response:any) =>{
        if (response.data.err === 401){
            Navigate({to:'/login'})
        }

        return response
    }, (err:any) => {
        return Promise.reject(err)
    })
}