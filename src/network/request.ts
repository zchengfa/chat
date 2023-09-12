import { Post } from "./network";

export function loginRegisterAxios(data:{username:string,password:string},status:boolean){
  return Post({
    url:'/loginRegister',
    data:{
      data,
      status
    }
  })
}