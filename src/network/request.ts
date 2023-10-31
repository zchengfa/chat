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

export function searchUserInfo(value:string | number,user_id:number){
  return Post({
    url:'/searchUserInfo',
    data:{
      value,
      user_id
    }
  })
}
