import { Post } from "./network";

/**
 * 登录注册
 * @param data {Object} 带有账号密码的数据
 * @param data.username { string } 用户名
 * @param data.password { string } 密码
 * @param status {boolean} 用于区分是注册还是登录
 * @return {Promise}
 */
export function loginRegisterAxios(data:{username:string,password:string},status:boolean){
  return Post({
    url:'/loginRegister',
    data:{
      data,
      status
    }
  })
}

/**
 * 搜索用户
 * @param value {string | number} 用户名或账号
 * @param user_id {number} 用户id
 * @return {Promise}
 */
export function searchUserInfo(value:string | number,user_id:number){
  return Post({
    url:'/searchUserInfo',
    data:{
      value,
      user_id
    }
  })
}

/**
 * 获取群聊与当前用户不是好友关系的用户信息
 * @param groupId {string | number} 群聊房间id
 * @param user_id {number} 用户id
 * @return {Promise}
 */
export function strangerInfoForGroup(groupId:string | number,user_id:number){
  return Post({
    url:'/groupStranger',
    data:{
      groupId,user_id
    }
  })
}

export function getChatMomentsData(user_id:string | bigint){
  return Post({
    url:'/getChatMoments',
    data:{
      user_id
    }
  })
}




