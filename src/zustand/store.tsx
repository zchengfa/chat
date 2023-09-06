import { create } from "zustand";
import {MsgDataType} from "../common/staticData/data";

function getSessionStorageData(propertyName:string,returnData:any,isString:boolean = true){
  let data = sessionStorage.getItem(propertyName)
  if(isString){
    return data ? JSON.parse(data as string) : returnData
  }
  else{
    return data ? Number(data) : returnData
  }
}

export const useMessageStore = create((set)=>{
    return {
      //聊天记录
        msgData:getSessionStorageData('msgData',{}),
        saveMsgData:(item:any,id:number)=>{
          set((state:any)=>{
            let data = state.msgData
            if(!data[id]){
              data[id] = []
            }
            data[id].push(item)
            sessionStorage.setItem('msgData',JSON.stringify(data))
            return {
              msgData:data
            }
          })
        },
      //鼠标停留在消息上改变消息的背景颜色
        changeBg:(item:any,index:number,id:number)=>{

          set((state:any)=>{
            let data = state.msgData
            data[id][index] = item
            return {
              msgData:data
            }
          })
        },
        currentFriendMsg:[],
      //获取与当前好友的聊天记录
        getCurrentMsgData:()=>{
          set((state:any)=>{
            return {
              currentFriend:state.msgData[state.listId]
            }
          })
        },
      //消息列表激活的索引
        listId:getSessionStorageData('listId',undefined,false),
        changeListId:(id:number)=>{

           set(()=>{
             sessionStorage.setItem('listId',id.toString())
                return {
                    listId:id
                }
            })
        },
      //通讯过的用户列表
        chatList:getSessionStorageData('chatList',[]),
        changeChatList:(item:MsgDataType)=>{

          set((state:any)=>{
            let data = state.chatList
            data.push(item)
            sessionStorage.setItem('chatList',JSON.stringify(data))
            return {
              chatList:data
            }
          })
        },
      //最新沟通过的好友信息
        friendInfo:getSessionStorageData('friendInfo',{}),
        saveFriendInfo:(item:MsgDataType)=>{
          set(()=>{
            sessionStorage.setItem('friendInfo',JSON.stringify(item))
            return {
              friendInfo:item
            }
          })
        },
    }
})