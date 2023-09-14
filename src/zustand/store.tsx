import { create } from "zustand";
import {MsgDataType} from "../common/staticData/data";

function getStorageData(propertyName:string,returnData:any,needParse:boolean = true,isLocalStorage:boolean = true){
  let data = isLocalStorage ? localStorage.getItem(propertyName) : sessionStorage.getItem(propertyName)
  if(needParse){
    return data ? JSON.parse(data as string) : returnData
  }
  else{
    return data ? data : returnData
  }
}

function setStorageData(propertyName:string,data:any){
  localStorage.setItem(propertyName,JSON.stringify(data))
}

export const useMessageStore = create((set)=>{
    return {
        token:getStorageData('token',undefined,false,false),
        setToken:(token:string)=>{
          set(()=>{
            sessionStorage.setItem('token',token)
            return {
              token
            }
          })
        },
        customer:{
            userId:123456,
            username:'随风',
            avatar:'https://img1.baidu.com/it/u=1846140859,3572495292&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
        },
      //聊天记录
        msgData:getStorageData('msgData',{}),
        saveMsgData:(item:any,id:number | undefined)=>{

          set((state:any)=>{
            let data = state.msgData
            if(!id){
              if(!data[item.userId]){
                data[item.userId] = []
                data[item.userId].push(item)
              }
            }
            else{
              data[id].push(item)
            }


            setStorageData('msgData',data)
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
        listId:getStorageData('listId',undefined,false),
        changeListId:(id:number)=>{

           set((state:any)=>{
               state.changeReadStatus(id)
               setStorageData('listId',id)
               return {
                    listId:id
                }
            })
        },
        changeReadStatus:(id:number,status:boolean = true)=>{
            set((state:any)=>{
                let data = state.chatList

                data.map((item:any)=>{
                   return item.userId === id ? item.hasBeenRead = status : null
                })
                setStorageData('chatList',data)
                return {
                    chatList:data
                }
            })
        },
      //通讯过的用户列表
        chatList:getStorageData('chatList',[]),
        changeChatList:(item:MsgDataType,replyId:number | undefined = undefined)=>{

          set((state:any)=>{
            let data = state.chatList
            if(replyId){
              let index:any = undefined
              data.map((it:any,i:number)=>{

                if(it.userId === replyId){
                  index = i
                }

              })

              data[index].msg = item.msg
            }
            else{
              data.unshift(item)
            }

            setStorageData('chatList',data)

            let bgColor = replyId ? 'var(--success-font-color)' : 'var(--white-color)'
            let isLeft = !replyId
            let id = replyId ? replyId : undefined

            state.saveMsgData({
              userId:item.userId,
              avatar:item.avatar,
              msg:item.msg,
              bgColor,
              isLeft

            },id)

            return {
              chatList:data
            }
          })
        },
      //最新沟通过的好友信息
        friendInfo:getStorageData('friendInfo',{}),
        saveFriendInfo:(item:MsgDataType)=>{
          set(()=>{

            setStorageData('friendInfo',item)
            return {
              friendInfo:item
            }
          })
        },
    }
})