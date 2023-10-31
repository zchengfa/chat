import axios, {AxiosError} from "axios";
import { Navigate } from "react-router-dom";


export const baseURL = 'http://localhost:4000'
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
    }, (err:AxiosError) =>{
        return Promise.reject(err)
    })

    //axios响应拦截器
    instance.interceptors.response.use((response:any) =>{
        if (response.data.err === 401){
            Navigate({to:'/login'})
        }

        return response
    }, (err:AxiosError) => {
        return Promise.reject(err)
    })
}

