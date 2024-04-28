import {create} from "zustand";
import {MsgDataType, operationsData} from "../common/staticData/data";
import {
  sortByLocaleWithObject,
  getFirstPinYin,
  verifyTime,
  dealMsgTime,
  isMobile,
  adjustAvatarIsDiff
} from "../util/util";
import {
  openDB,
  getDataByCursorIndex,
  closeDB,
  updateDB,
  deleteDataByCursorIndex
} from "../indexedDB/DB";

/**
 * 从indexedDB数据库中获取聊天记录
 * @return {Promise} 返回一个Promise
 */
function getMsgDataFromIndexedDB(): Promise<any> {
  return new Promise(resolve => {
    openDB('chats', {
      storeName: 'chat',
      storeOptions: {
        keyPath: 'ID',
        autoIncrement: true
      },
      indexArr: ['userId', 'messages'],
      indexOptions: {userId: true}
    }).then((DB: any) => {
      let db = DB.db

      getDataByCursorIndex(db, 'chat').then((res: any) => {
        let msgData: any = {}
        res.list.forEach((item: any) => {
          if(!item.messages){
            item.messages = []
          }
          msgData[item.userId] = [...item.messages]
        })
        resolve(msgData)
        closeDB(db)
      })
    })
  })
}

/**
 * 更新indexedDB数据库
 * @param id {string | number} 索引值
 * @param data {any} 需要更新的数据
 */
function operateIndexedDB(id:any,data:any){
  openDB('chats').then((DB: any) => {

    let db = DB.db
    id = Number(id) ? Number(id) : id
    getDataByCursorIndex(db, 'chat', true, 'userId', id).then((res: any) => {
      if (res.list.length) {
        deleteDataByCursorIndex(db, 'chat', 'userId', id).then(() => {
          updateDB(db, 'chat', {
            userId: id,
            messages: data[id]
          }).then(() => {
            closeDB(db)
          })
        }).catch(() => {
          closeDB(db)
        })

      } else {
        updateDB(db, 'chat', {
          userId: id,
          messages: data[id]
        }).then(() => {
          closeDB(db)
        }).catch((e:any)=>{
          closeDB(db)
        })
      }
    }).catch(()=>{
      closeDB(db)
    })
  })
}

// @ts-ignore
let msgData = await getMsgDataFromIndexedDB().then((res: any) => res)

const defaultFriendList = isMobile ? [
  {
    type: 'new',
    title: '新的朋友',
    avatar: operationsData.list[0].component(),
    username: '新的朋友',
    count: 0
  },
  {
    type: 'group',
    title: '群聊',
    avatar: operationsData.list[1].component(),
    username: '群聊',
  },
  {
    type: 'tag',
    title: '标签',
    avatar: operationsData.list[2].component(),
    username: '标签',
  },
  {
    type: 'common',
    title: '公众号',
    avatar: operationsData.list[3].component(),
    username: '公众号'
  }

] : [
  {
    type: 'btn',
    avatar: '',
    username: '通讯录管理'
  },
  {
    type: 'new',
    avatar: operationsData.list[0].component(),
    username: '新的朋友',
    count: 0
  },
  {
    type: 'common',
    avatar: operationsData.list[3].component(),
    username: '公众号'
  }
]

/**
 * 获取好友列表
 */
function getFriendList() {
  let data = getStorageData('friendList', [],)

  if (data.length) {
    data.forEach((item: any) => {
      defaultFriendList.push(item)
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
function getStorageData(propertyName: string, returnData: any, needParse: boolean = true, isLocalStorage: boolean = true) {
  let data = isLocalStorage ? localStorage.getItem(propertyName) : sessionStorage.getItem(propertyName)
  if (needParse) {
    return data ? JSON.parse(data as string) : returnData
  } else {
    return data ? data : returnData
  }
}

/**
 * 存储数据到localStorage中
 * @param propertyName {string} 存储名
 * @param data {any} 数据
 */
function setStorageData(propertyName: string, data: any) {
  localStorage.setItem(propertyName, JSON.stringify(data))
}

/**
 * 给数组或对象添加首字母
 * @param data {Array} 要处理的数据
 * @param PO {string} 属性名
 * @param PT {string} 属性名
 * @param list
 * @return {Array} 返回获得了首字母的数据
 */
function addFirstPinYin(data: any | any[], PO: string, PT: string, list: any[]): Array<any> {
  const prototype = Object.prototype.toString.call(data)

  let newData: any[] = []
  if (prototype === '[object Object]') {
    data[PO] = getFirstPinYin(data[PT])
    list.map((item: any, index: number) => {
      if (item.title === data[PO]) {
        item.content.push(data)
        newData = list.slice(3, list.length - 1)
      } else if (index === list.length - 1) {
        for (let i = 0; i < 1; i++) {
          newData.push({
            title: undefined,
            content: []
          })
          newData[i].title = data[PO]
          newData[i].content.push(data)
        }
      }
      return null
    })
  } else if (prototype === '[object Array]') {
    let letterArr: string[] = []
    data.map((item: any) => {
      item[PO] = getFirstPinYin(item[PT])
      return letterArr.push(item[PO])
    })
    // @ts-ignore
    let uniqueLetterArr: string[] = [...new Set(letterArr)]

    uniqueLetterArr.map(() => newData.push({
      title: undefined,
      content: []
    }))
    data.map((item: any) => {
      return uniqueLetterArr.map((letter: any, index: number) => {
        if (item[PO] === letter) {
          newData[index][PO] = letter
          newData[index]['content'].push(item)
        }
        return true
      })
    })
  }

  return sortByLocaleWithObject(newData, 'title')
}

export const useMessageStore = create((set) => {
  return {
    token: getStorageData('token', undefined, false, false),
    setToken: (token: string) => {
      set(() => {
        sessionStorage.setItem('token', token)
        return {
          token
        }
      })
    },
    customer: getStorageData('userInfo', null, true, false),
    setUserInfo: (info: any) => {
      set(() => {
        sessionStorage.setItem('userInfo', JSON.stringify(info))
        return {
          customer: info
        }
      })
    },
    //聊天记录
    msgData: msgData,
    saveMsgData: (item: any, id: number | string) => {
      set((state: any) => {
        let data = state.msgData

        if (!id) {
          if (!data[item.userId]) {
            data[item.userId] = []
            data[item.userId].push(item)
          }

        } else {
          if (!data[id]) {
            data[id] = []
          }
          let newMsg = []
          if (new Date().getTime() - data[id][(data[id].length) - 1]?.time >= 5 * 60 * 1000 || !data[id].length) {
            let timeout = dealMsgTime(item.time)
            data[id].push({
              timeout,
              time: item.time
            })
            newMsg.push({
              timeout,
              time: item.time
            })
          }

          data[id].push(item)
          newMsg.push(item)
          if (state.listId[state.customer.user_id]?.toString() === id.toString()) {

            state.getCurrentMsgData(undefined, undefined, newMsg)
          }
        }

        //更新indexedDB数据库
        operateIndexedDB(id,data)

        return {
          msgData: data
        }
      })
    },
    //更新图片的发送进度
    updateImageSendProgress(progress: any) {
      set((state: any) => {
        let data = state.msgData, {userId, identity, index, totalCount} = progress
        data[userId].forEach((item: any) => {
          if (item.imgID === identity) {
            item.progress = Number((((index + 1) / totalCount) * 100).toFixed(0))
          }
        })
        return {
          msgData: data
        }
      })
    },
    //鼠标停留在消息上改变消息的背景颜色
    changeBg: (item: any, index: number) => {

      set((state: any) => {
        let data = state.currentFriendMsg
        data[index] = item
        return {
          currentFriendMsg: data
        }
      })
    },
    currentFriendMsg: [],
    count: 15,
    initCount:()=>{
      set(()=>{
        return {
          count:15
        }
      })
    },
    changeCount: () => {
      set((state: any) => {
        let c = state.count
        if(state.msgData[state.listId[state.customer.user_id]].length - state.currentFriendMsg.length >= 15){
          c += 15
        }
        else{
          c += (state.msgData[state.listId[state.customer.user_id]].length - state.currentFriendMsg.length)
        }
        state.getCurrentMsgData(undefined, c)
        return {
          count: c
        }
      })
    },
    //获取与当前好友的聊天记录(指定消息数)
    getCurrentMsgData: (id: number | undefined = undefined, count?: number, data?: any) => {
      set((state: any) => {
        let listId = id ? id : state.listId[state.customer.user_id], c = count ? count : state.count,
          currentData = id ? [] : state.currentFriendMsg
        let msg = state.msgData[listId] ? JSON.parse(JSON.stringify(state.msgData[listId])) : []

        msg = msg?.length >= c ? msg.splice(msg.length - c, 15) : msg
        if (data) {
          currentData.push(...data)
        } else {
          currentData.unshift(...msg)
        }
        return {
          currentFriendMsg: currentData
        }
      })
    },
    //消息列表激活的索引
    listId: getStorageData('listId', {}),
    changeListId: (id: number) => {
      set((state: any) => {
        let listIds = state.listId,customer = state.customer
        if (!isNaN(id)) {
          id = Number(id)
        }
        listIds[customer.user_id] = id
        state.changeReadStatus(id)
        state.initCount()
        setStorageData('listId', listIds)
        state.getCurrentMsgData(id)
        return {
          listId: listIds
        }
      })
    },
    changeReadStatus: (id: number, status: boolean = true) => {
      set((state: any) => {
        let allList = state.chatList
        let data = allList[state.customer.user_id]

        data.map((item: any) => {
          return item?.userId?.toString() === id.toString() || item?.room?.toString() === id.toString() ? item.hasBeenRead = status : null
        })
        setStorageData('chatList', allList)
        return {
          chatList: allList
        }
      })
    },
    //改变消息发送状态
    changeSendMsgStatus:(response:{msgId:string,receiver:number | string,isFailed?:boolean})=>{
      set((state:any)=>{
        let list = state.msgData
        list[response.receiver].map((item:any)=>{
          if(item.id === response.msgId){
            if(response.isFailed){
              item.isSending = false
            }
            else{
              delete item.isSending
            }
          }
          return true
        })

        //更新indexedDB数据库
        operateIndexedDB(response.receiver,list)
        return {
          msgData:list
        }
      })
    },
    //通讯过的用户列表
    chatList: getStorageData('chatList', {}),
    changeChatList: (item: MsgDataType, replyId: any = undefined, isReceive: boolean = false) => {
      let separator: any[] = ['/', ':']
      set((state: any) => {
        let allList = state.chatList
        let data = allList[state.customer.user_id] ? allList[state.customer.user_id] : []

        if (replyId && !isReceive) {
          let index: any = undefined
          data.map((it: any, i: number) => {
            let myId = item.isGroupChat ? it.room : it.userId

            //暂时不排除给助手发送消息的情况myId?.toString() === replyId.toString() && !it.isAssistant
            if (myId?.toString() === replyId.toString()) {
              index = i
            }
            return data
          })


          if (item.msgCode?.length) {
            data[index].msg = item.msgCode
          } else {
            data[index].msg = item.msg
          }
          data[index].showTime = dealMsgTime(Number(item.time), separator)
          data[index].time = item.time
        } else if (replyId && isReceive) {
          let index: any = undefined
          data.map((it: any, i: number) => {
            let myId = item.isGroupChat ? it.room : it.userId

            //暂时不排除给助手发送消息的情况myId?.toString() === replyId.toString() && !it.isAssistant
            if (myId?.toString() === replyId.toString()) {
              index = i
            }
            return true
          })
          if (index !== undefined) {
            //data[index].hasBeenRead = isMobile ? false : item.isGroupChat ? state.listId[state.customer.user_id]?.toString() === item.room.toString() : state.listId[state.customer.user_id]?.toString() === item.userId.toString()
            data[index].hasBeenRead = item.hasBeenRead
            item.msgCode?.length ? data[index].msg = item.msgCode : data[index].msg = item.msg
            data[index].showTime = dealMsgTime(Number(item.time), separator)
            data[index].time = item.time
          } else {
            item.showTime = dealMsgTime(Number(item.time), separator)
            if (item.msgCode?.length) {
              let d = JSON.parse(JSON.stringify(item))
              d.msg = d.msgCode
              data.unshift(d)
            } else {
              data.unshift(item)
            }
          }

        } else {
          item.showTime = dealMsgTime(Number(item.time), separator)
          data.unshift(item)
        }


        setStorageData('chatList', allList)

        let bgColor = replyId && !isReceive ? 'var(--success-font-color)' : 'var(--white-color)'
        let isLeft = replyId && isReceive
        let id = replyId ? replyId : undefined

        if (item.msg.length) {

          state.saveMsgData({
            id:item.id,
            userId: item.userId,
            //avatar: item.avatar,
            msg: item.msg,
            img: item.type === 'img' ? item.img : undefined,
            imgID: item.type === 'img' ? item.imgID : undefined,
            bgColor,
            isLeft,
            isSending:item.isSending,
            time: item.time,
            username: item.user
          }, id)
        }

        allList[state.customer.user_id] = data
        return {
          chatList: allList
        }
      })
    },
    changeChatListByOfflineMsg(data:any){
      set((state:any)=>{
        let allList = state.chatList,index = undefined
        //判断chatList中是否有该好友数据
        allList[state.customer.user_id].forEach((item:any,i:number)=>{
          if(item.userId.toString() === data.userId.toString()){
            index = i
            allList[state.customer.user_id][i] = data
          }
        })
        if(index === undefined){
          allList[state.customer.user_id].unshift(data)
        }
        setStorageData('chatList', allList)
        return {
          chatList:allList
        }
      })
    },
    saveMsgDataByOfflineMessage(msgArr:MsgDataType[],id:string | number){
      set((state:any)=>{
        let data = state.msgData
        msgArr.forEach((item:any)=>{
          item.bgColor = 'var(--white-color)'
          item.time = item['sendTime']
          delete item['sendTime']
          item.isLeft = true
          if(!data[id]){
            data[id] = []
          }
          data[id].push(item)
        })
        operateIndexedDB(id,data)
        state.getCurrentMsgData(Number(id))
        return {
          msgData: data
        }
      })
    },
    //最新沟通过的好友信息
    friendInfo: getStorageData('friendInfo', {}),
    saveFriendInfo: (item: MsgDataType) => {
      set((state:any) => {
        let customer = state.customer.user_id,friendInfo = state.friendInfo
        friendInfo[customer] = item
        setStorageData('friendInfo', friendInfo)
        return {
          friendInfo: friendInfo
        }
      })
    },
    //通讯录列表
    friendList: getFriendList(),
    changeFriendList(data: any, isOnline: boolean = false) {
      set((state: any) => {
        let list = isOnline ? defaultFriendList : state.friendList
        const prototype = Object.prototype.toString.call(data)

        data = addFirstPinYin(data, 'title', 'username', list)

        if (prototype === '[object Array]') {
          //没有好友的情况需删除某些数据
          if (!data.length) {
            //清空之前查看过的好友信息
            state.changeFriendData({})
          }
        }
        let sliceLength = isMobile ? 4 : 3

        const newArr = list.slice(0, sliceLength).concat(data)

        let listCopy = JSON.parse(JSON.stringify(newArr))

        setStorageData('friendList', sortByLocaleWithObject(listCopy.splice(sliceLength, list.length), 'title'))
        return {
          friendList: newArr
        }
      })
    },
    changeBadgeCount(count: number = 1) {
      set((state: any) => {
        let list = state.friendList
        list.map((item: any) => {
          if (item.type === 'new') {
            count ? item.count++ : item.count = 0
          }
          return true
        })
        return {
          friendList: list
        }
      })
    },
    //收到的好友请求
    friendRequest: getStorageData('friendRequest', {}),
    /**
     * 修改好友申请列表数据
     * @param request 好友申请相关数据
     * @param operations { string } 操作类型
     * @param operations.push { string } 增加数据
     * @param operations.shift { string } 删除数据
     */
    changeFriendRequest: (request: any, operations: string = 'push') => {

      set((state: any) => {

        let data = state.friendRequest, user_id = state.customer.user_id
        if (!data.hasOwnProperty(user_id)) {
          data[user_id] = []
        }

        if (operations === 'push') {
          data[user_id].push(request)
          data[user_id] = verifyTime(data[user_id])

          //(当新的朋友项不在激活状态时)有好友申请，每有一条申请，朋友列表中的新的朋友徽标数加1，（激活中）清零,
          state.friendListInfo.type === 'new' ? state.changeBadgeCount(0) : state.changeBadgeCount()
        } else if (operations === 'shift') {

          data[user_id].map((item: any, index: number) => {

            if (Number(item.receiver.RUN) === Number(user_id)) {

              //删除当前好友申请
              data[user_id].splice(index, 1)

            }
            return true
          })
          //好友信息加入好友列表
          state.changeFriendList(request)
        }

        setStorageData('friendRequest', data)

        return {
          friendRequest: data
        }
      })
    },
    friendListInfo: getStorageData('friendListInfo', {title: '', type: ''}),
    friendData: getStorageData('friendData', null),
    changeIndexInfo(type: string, title: string, index: number, id: number) {
      set(() => {
        setStorageData('friendListInfo', {type, title, index, hasBeenRead: true, user_id: id})
        return {
          friendListInfo: {
            type, title, index, hasBeenRead: true, user_id: id
          }
        }
      })
    },
    changeFriendData(data: any) {
      set(() => {
        setStorageData('friendData', data)
        return {
          friendData: data
        }
      })
    },
    isAcceptApply: undefined,
    changeAcceptApply(status: boolean) {
      set(() => {
        return {
          isAcceptApply: status
        }
      })
    },
    changeStorageTime() {
      set((state: any) => {
        let {chatList, msgData, customer} = state

        let data = chatList[customer.user_id] ? chatList[customer.user_id] : []

        data.map((item: any) => {
          return item.showTime = dealMsgTime(item.time)
        })

        for (const i in msgData) {
          msgData[i].map((item: any) => {
            if (item.timeout) {
              item.timeout = dealMsgTime(item.time)
            }
            return true
          })
        }

        chatList[customer.user_id] = data

        return {
          chatList,
          msgData
        }
      })
    },
    emojiStatus: false,
    changeEmojiStatus() {
      set((state: any) => {
        return {
          emojiStatus: !state.emojiStatus,
          chatWindowStatus:false
        }
      })
    },
    fileBuffer: {},
    changeFileBuffer(data: any) {
      set((state: any) => {
        let fileB = state.fileBuffer
        let userId = data.userId
        if (fileB[userId] && fileB[userId][data.identity]) {
          dealImageData(data, fileB, userId)
        } else {
          fileB[userId] = {}
          fileB[userId][data.identity] = []
          dealImageData(data, fileB, userId)
        }
        return {
          fileBuffer: fileB
        }
      })
    },
    chatWindowSiderInfo: getStorageData('chatWindowSiderInfo', {}),
    //获取聊天窗口右侧更多信息（成员信息、消息免打扰等）
    changeChatWindowSiderInfo(data: any,newData:any = {}) {
      set((state:any) => {
        let d = state.chatWindowSiderInfo
        let customer = state.customer.user_id
        if(Object.keys(newData).length){
          d[customer]?.forEach((item:any)=>{
            if(item.user_id === newData.user_id){

              item.isShowPop = newData.isShowPop
            }
            else{
              item.isShowPop = false
            }
          })
        }
        else{
          data?.forEach((item:any)=>{
            item.isShowPop = false
          })
          d[customer] = data
          setStorageData('chatWindowSiderInfo', d)
        }
        return {
          chatWindowSiderInfo: d
        }
      })
    },
    chatWindowStatus:false,
    changeWindowStatus(status:boolean){
      set(()=>{
        return {
          chatWindowStatus:status
        }
      })
    },
    //头像数据
    userAvatar:getStorageData('userAvatar',{}),
    changeUserAvatar(userId:string | number,avatar:any){
      set((state:any)=>{
        let data = state.userAvatar
        if(typeof avatar === 'object'){
          for (const keyTwo in avatar) {
            if(!adjustAvatarIsDiff({userId:keyTwo,avatar:avatar[keyTwo]},data)){
              data[keyTwo] = avatar[keyTwo]
            }
          }
        }
        else{
          data[userId]= avatar
        }
        setStorageData('userAvatar',data)
        return {
          userAvatar: data
        }
      })
    },
    //chatList鼠标右键操作目标
    contextMenuOperateTarget:undefined,
    changeContextMenuOperateTarget(target:number){
      set(()=>{
        return {
          contextMenuOperateTarget:target
        }
      })
    },
    //删除聊天
    deleteChat(keepMessageRecords:boolean = false){
      set((state:any)=>{
        let target = state.contextMenuOperateTarget
        let allList = state.chatList,targetObj = allList[state.customer.user_id][target]
        let id = targetObj.isGroupChat ? targetObj.room : targetObj.userId
        let listId = state.listId
        //将该目标从chatList中删除
        allList[state.customer.user_id].splice(target,1)

        //还需判断当前删除的是不是正在聊天的那个，若是，则需要删除侧边窗口信息，并且激活id也需要清除
        if(id === listId[state.customer.user_id]){
          listId[state.customer.user_id] = undefined
        }
        //删除聊天记录
        if(!keepMessageRecords){
          operateIndexedDB(id,[])
        }
        setStorageData('chatList',allList)
        setStorageData('listId',listId)
        return {
          contextMenuOperateTarget:undefined,
          chatList:allList,
          listId
        }
      })
    },
    //朋友圈
    isShowChatMoments:false,
    showChatMoments(){
      set((state:any)=>{
        let status = state.isShowChatMoments
        return {
          isShowChatMoments:!status
        }
      })
    }
  }
})

//tabbar相关状态数据
export const useTabbarStore = create((set)=>{
  return {
    currentIndex:0,
    changeIndex:(index:number)=>{
      set(()=>{
        return {
          currentIndex: index
        }
      })
    }
  }
})


//移动端聊天组件相关状态数据
export const useChatStore = create((set)=>{
  return {
    isShowRightKeyboard: false,
    isShowLeftKeyboard: false,
    isShowAddBox:false,
    isShowInput:true,
    changeKeyboardStatus:(status:boolean,target:number)=>{
      set((state:any)=>{
        let left = state.isShowLeftKeyboard,right = state.isShowRightKeyboard
        target === 0 ? left = status : right = status
        return {
          isShowLeftKeyboard: left,
          isShowRightKeyboard: right,
        }
      })
    },
    changeAddBoxStatus:(status:boolean)=>{
      set(()=>{
        return {
          isShowAddBox:status,
        }
      })
    },
    changeInputStatus:(status:boolean)=>{
      set(()=>{
        return {
          isShowInput:status,
        }
      })
    },
    initStatus:()=>{
      set(()=>{
        return {
          isShowRightKeyboard: false,
          isShowLeftKeyboard: false,
          isShowAddBox:false,
          isShowInput:true,
        }
      })
    }
  }
})

//右键菜单状态
export const useContextMenuStore = create((set)=>{
  return {
    contextMenu:[],
    changeContextMenu:(menu:any[])=>{
      set(()=>{
        return {
          contextMenu:menu
        }
      })
    }
  }
})

/**
 * 合并Uint8Array
 * @param data
 * @param fileB
 * @param userId
 * @return {Object} 返回含有整合后的数据
 */
function mergeUint8Array(data: any, fileB: any, userId: any): object {

  let allFB = new Uint8Array(data.totalSize), offset = 0
  fileB[userId][data.identity].forEach((item: any) => {
    allFB.set(item.file, offset)
    offset += item.file.length
  })

  data.file = allFB
  return data
}

function dealImageData(data: any, fileB: any, userId: any) {
  fileB[userId][data.identity].push(data)
  if (data.index === data.chunkCount - 1) {
    let allFB = mergeUint8Array(data, fileB, userId)
    fileB[userId][data.identity] = []
    fileB[userId][data.identity].push(allFB)
  }
}