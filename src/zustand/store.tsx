import { create } from "zustand";
import {MsgDataType,operationsData} from "../common/staticData/data";
import {sortByLocaleWithObject,getFirstPinYin,verifyTime} from "../util/util";

const defaultFriendList = [
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
]

function getFriendList (){
    let data = getStorageData('friendList',[],)

    if(data.length){
        data.map((item:any)=>{
            defaultFriendList.push(item)
            return true
        })

    }

    return defaultFriendList

}

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

function addFirstPinYin(data:any,PO:string,PT:string){
    const prototype = Object.prototype.toString.call(data)
    let newData:any[] = []
    if( prototype === '[object Object]' ){
        data[PO] = getFirstPinYin(data[PT])
    }
    else if( prototype === '[object Array]' ){
        let letterArr:string[] = []
        data.map((item:any)=>{
            item[PO] = getFirstPinYin(item[PT])
            return  letterArr.push(item[PO])
       })
       // @ts-ignore
       let uniqueLetterArr:string[] = [...new Set(letterArr)]

       uniqueLetterArr.map((letter:any)=> newData.push({
           title:undefined,
           content:[]
       }))
       data.map((item:any)=>{
          return uniqueLetterArr.map((letter:any,index:number)=>{
               if(item[PO] === letter){
                   newData[index][PO] = letter
                   newData[index]['content'].push(item)
               }
               return true
           })
       })
    }

    return sortByLocaleWithObject(newData,'title')
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
        friendList:getFriendList(),
        changeFriendList(data:any,isOnline:boolean = false){
           set((state:any)=>{
               let list = isOnline ? defaultFriendList : state.friendList
               const prototype = Object.prototype.toString.call(data)

               data = addFirstPinYin(data,'title','username')
               if( prototype === '[object Object]' ){
                   list.push(data)
               }
               else if( prototype === '[object Array]' ){

                   list = list.splice(0,3)
                   list.push(...data)

               }
               let listCopy = JSON.parse(JSON.stringify(list))
               setStorageData('friendList',sortByLocaleWithObject(listCopy.splice(3,list.length),'title'))
               return {
                   friendList:list
               }
           })


        },
        //收到的好友请求
        friendRequest:getStorageData('friendRequest',{}),
        /**
         * 修改好友申请列表数据
         * @param request 好友申请相关数据
         * @param operations { string } 操作类型
         * @param operations.push { string } 增加数据
         * @param operations.shift { string } 删除数据
         */
        changeFriendRequest: (request:any,operations: string = 'push')=>{

            set((state:any)=>{
                let data = state.friendRequest,user_id = request.receiver.RUN
                if(!data.hasOwnProperty(user_id)){
                    data[user_id] = []
                }

                if(operations === 'push'){
                    data[user_id].push(request)
                    data[user_id] = verifyTime(data[user_id])

                }
                else if(operations === 'shift'){

                    data[request.user_id].map((item:any,index:number)=>{
                        if(Number(item.sender.SUN) === request.user_id){

                            //删除当前好友申请
                            data.splice(index,1)

                        }
                    })
                    //好友信息加入好友列表
                    state.changeFriendList(request)
                }

                setStorageData('friendRequest',data)

                return {
                    friendRequest:data
                }
            })
        },
        friendListInfo:getStorageData('friendListInfo',null),
        changeIndexInfo(type:string,title:string,index:number,id:number){

            set(()=>{
                setStorageData('friendListInfo',{type,title,index,hasBeenRead:true,user_id:id})
                return {
                    friendListInfo:{
                        type,title,index,hasBeenRead:true,user_id:id
                    }
                }
            })
        },
        isAcceptApply:undefined,
        changeAcceptApply(status:boolean){
            set(()=>{
                return {
                    isAcceptApply:status
                }
            })
        }
    }
})