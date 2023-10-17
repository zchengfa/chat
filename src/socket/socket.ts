import { io } from 'socket.io-client'
import {MsgDataType} from "../common/staticData/data";


export const socket = io('ws://localhost:4000')

export function SocketEvent(data:any){
    const {Zustand,Message} = data
    const user = Zustand.customer
    socket.emit('online',{
        name:user.username,
        account:user.account,
        user_id:user.user_id
    })
    socket.on('reciever',(data:any)=>{
        const {friendList} = data
        Zustand.changeFriendList(friendList,true)
    })

    socket.on('receiveMessage',(data:any)=>{
        let readStatus = Zustand.listId === Number(data.userId)
        Zustand.changeChatList({
            userId:Number(data.userId),
            user:data.sender,
            type:'msg',
            msg:data.msg,
            msgCode:data.msgCode,
            avatar:data.avatar,
            time:data.sendTime,
            isMute:true,
            hasBeenRead:readStatus,
            isGroupChat:false
        },data.userId,true)
    })
    /**
     * 好友请求已发送给对方
     */
    socket.on('sendRequestSuccess',()=>{

        Message.messageApi.open({
            type: 'success',
            content: '好友请求已发送',
        })
    })

    /**
     * 收到好友请求
     */
    socket.on('receiveFriendRequest',(data:any)=>{
        Zustand.changeFriendRequest(data)

    })

    /**
     * 已同意对方的好友申请，将对方的信息添加到你的好友列表中，并删除对应的申请列表项
     */
    socket.on('hadAcceptApply',(info:any)=>{
        Message.messageApi.open({
            type: 'success',
            content: '接受该好友申请成功',
        })
        Zustand.changeFriendRequest(info,'shift')
        let {user_id,avatar} = Zustand.customer
        Zustand.changeChatList({
            userId: info.user_id,
            type: '',
            msg: '',
            user: info.username,
            time: new Date().getTime(),
            hasBeenRead: false,
            isGroupChat: false,
            avatar: info.avatar
        } as unknown as MsgDataType)

        Zustand.changeChatList({
            userId:user_id,
            avatar:avatar,
            isLeft:false,
            bgColor:'var(--success-font-color)',
            msg:'您已同意了对方的好友申请，现在可以开始聊天了',
            time: new Date().getTime()
        } as unknown as MsgDataType,info.user_id)
    })

    /**
     * 好友已经同意您的申请，将好友的信息添加到你的好友列表中
     */
    socket.on('friendHadAcceptApply',(info:any)=>{

        Zustand.changeFriendRequest(info,'shift')
        Zustand.changeChatList({
            userId: info.user_id,
            type: '',
            msg: '我已通过的你的好友请求，现在我们可以开始聊天了',
            user: info.username,
            time: new Date().getTime(),
            hasBeenRead: false,
            isGroupChat: false,
            avatar:info.avatar
        } as unknown as MsgDataType,info.user_id,true)
    })

}