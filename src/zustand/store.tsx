import { create } from "zustand";
import {MsgDataType,operationsData} from "../common/staticData/data";

/**
 * 获取localStorage/sessionStorage中数据的函数
 * @param propertyName { string } 保存名称
 * @param returnData { any } 当没有获取到数据时，返回的数据
 * @param needParse { boolean } 是否需要将JSON数据进行转换
 * @param isLocalStorage { boolean } 是否默认从localStorage获取数据
 */
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
        customer:getStorageData('userInfo',null,true,false),
        setUserInfo:(info:any)=>{
          set(()=>{
            sessionStorage.setItem('userInfo',JSON.stringify(info))
            return {
              customer:info
            }
          })
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
              currentFriendMsg:state.msgData[state.listId]
            }
          })
        },
      //消息列表激活的索引
        listId:getStorageData('listId',undefined),
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

                if(Number(it.userId) === Number( replyId)){
                  index = i
                }
                console.log(item)
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
        //通讯录列表
        friendList:[
            {
                type:'btn',
                avatar:'',
                username:'通讯录管理'
            },
            {
                type:'new',
                title:'新的朋友',
                avatar:operationsData.list[0].component(),
                username:'新的朋友'
            },
            {
                type:'common',
                title:'公众号',
                avatar:operationsData.list[1].component(),
                username:'公众号'
            }
        ],
        //收到的好友请求
        friendRequest:getStorageData('friendRequest',[]),
        /**
         * 修改好友申请列表数据
         * @param request 好友申请相关数据
         * @param operations { string } 操作类型
         * @param operations.push { string } 增加数据
         * @param operations.shift { string } 删除数据
         */
        changeFriendRequest: (request:any,operations: string = 'push')=>{

            set((state:any)=>{
                let data = state.friendRequest

                if(operations === 'push'){

                    data.push(request)

                    setStorageData('friendRequest',data)
                }
                else if(operations === 'shift'){
                    console.log(data,'shift')
                }

                return {
                    friendRequest:data
                }
            })
        },
        friendListInfo:getStorageData('friendListInfo',null),
        changeIndexInfo(type:string,title:string,index:number){

            set(()=>{
                setStorageData('friendListInfo',{type,title,index,hasBeenRead:true})
                return {
                    friendListInfo:{
                        type,title,index,hasBeenRead:true
                    }
                }
            })
        }
    }
})