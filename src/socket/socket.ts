import { io } from 'socket.io-client'
import {MsgDataType} from "../common/staticData/data";
import {Uint8ArrayToBase64} from "../util/util";

export const socket = io((process.env.REACT_APP_SOCKET_IO)as string)

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
        let readStatus = data.isGroupChat ? Zustand.listId?.toString() === data.room.toString()   : Zustand.listId?.toString() === data.userId.toString()
        if(data.type === 'msg'){
           changeListFun(data)
        }
        else if(data.type === 'img'){
           data.file =new Uint8Array(data.file)
           Zustand.changeFileBuffer(data)
           let d = Zustand.fileBuffer[data.userId][data.identity][0]
           if(d.file.length === d.totalSize){
               //待完善，当前已得到图片的base64数据
              let {file,avatar,isGroupChat,sendTime,sender,type,userId,identity,room,chatName,chatAvatar} = d
              changeListFun({
                  avatar,isGroupChat,sendTime,sender,type,userId,room,chatName,chatAvatar,
                  img:Uint8ArrayToBase64(file),
                  imgID:identity
              })
           }
        }
        function changeListFun(data:any){
           Zustand.changeChatList({
               userId:data.isGroupChat ? data.room : Number(data.userId),
               user:data.sender,
               chatName:data.isGroupChat?data.chatName:undefined,
               chatAvatar:data.isGroupChat?data.chatAvatar:undefined,
               type:data.type,
               msg:data.type === 'msg' ? data.msg : '[图片]',
               msgCode:data.type === 'msg' ? data.msgCode : data.file,
               avatar:data.avatar,
               time:data.sendTime,
               isMute:true,
               img:data.img ? data.img : undefined,
               imgID:data.imgID,
               room:data.isGroupChat ?data.room : undefined,
               hasBeenRead:readStatus,
               isGroupChat:data.isGroupChat
           } as unknown as MsgDataType,data.isGroupChat ? data.room : data.userId,true)
        }
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

    socket.on('invitedJoinGroup',(room:string)=>{
        socket.emit('acceptJoinGroup',room)
    })

    socket.on('inviteFriendJoinGroupSuccess',(e:any)=>{
        Zustand.changeChatList({
            ...e,
            type: 'msg',
            msg: '',
            time: new Date().getTime(),
            hasBeenRead: false,
            isGroupChat: true,
            room:e.userId,
            chatAvatar:e.avatar,
            chatName:e.user
        } as unknown as MsgDataType)
    })

    socket.on('sendImageProgress',(data:any)=>{
        Zustand.updateImageSendProgress(data)
    })

}