import { io } from 'socket.io-client'
import {MsgDataType} from "../common/staticData/data";
import {adjustAvatarIsDiff, Uint8ArrayToBase64} from "../util/util";

export const socket:any = io((process.env.REACT_APP_SOCKET_IO)as string)

export function SocketEvent(data:any){
    const {Zustand,Message} = data
    const user = Zustand.customer
    function changeListFun(data:any,status:boolean){
        Zustand.changeChatList({
            userId:data.userId,
            user:data.sender,
            chatName:data.isGroupChat?data.chatName:undefined,
            type:data.type,
            msg:data.type === 'msg' ? data.msg : '[图片]',
            msgCode:data.type === 'msg' ? data.msgCode : data.file,
            time:data.sendTime,
            isMute:true,
            img:data.img ? data.img : undefined,
            imgID:data.imgID,
            room:data.isGroupChat ?data.room : undefined,
            hasBeenRead:status,
            isGroupChat:data.isGroupChat
        } as unknown as MsgDataType,data.isGroupChat ? data.room : data.userId,true)
    }
    socket.emit('online',{
        name:user.username,
        account:user.account,
        user_id:user.user_id
    })
    socket.on('reciever',(data:any)=>{
        const {friendList} = data
        if(friendList.length){
            let avatar:any = {}
            friendList.forEach((item:any)=>{
                avatar[item.user_id] = item.avatar
            })
            Zustand.changeUserAvatar(0,avatar)
        }
        Zustand.changeFriendList(friendList,true)
    })

    socket.on('receiveOfflineMessage',(message:any)=>{
        let senderArr:any[] = [],data:any = {}
        for (const item of message) {
            item.user = item.sender
            delete item.sender
            if(senderArr.indexOf(item.userId) === -1){
                senderArr.push(item.userId)
                data[item.userId] = []
            }
        }

        for (const item of message) {
            data[item.userId].push(item)
        }

        senderArr.forEach((item:any)=>{
            data[item].length > 1 ? Zustand.changeChatListByOfflineMsg(data[item][data[item].length -1]) : Zustand.changeChatListByOfflineMsg(data[item][0])
            //store保存聊天消息
            Zustand.saveMsgDataByOfflineMessage(data[item],item)
        })

    })

    socket.on('receiveMessage',(data:any)=>{
        let readStatus = data.isGroupChat ? Zustand.listId[Zustand.customer.user_id]?.toString() === data.room.toString()   : Zustand.listId[Zustand.customer.user_id]?.toString() === data.userId.toString()
        let existAvatar = Boolean(Zustand.userAvatar[data.isGroupChat ? data.room : data.userId])
        //本地没有对方的头像数据，需要获取一下
        if(!existAvatar){
            let userId = data.isGroupChat ? data.room : data.userId
            socket.emit('getAvatar',{isGroupChat:data.isGroupChat,id:userId},(response:any)=>{
                Zustand.changeUserAvatar(userId,response)
            })
        }
        if(data.type === 'msg'){
            changeListFun(data,readStatus)
        }
        else if(data.type === 'img'){
            data.file =new Uint8Array(data.file)
            Zustand.changeFileBuffer(data)
            let d = Zustand.fileBuffer[data.userId][data.identity][0]
            if(d.file.length === d.totalSize){
                //待完善，当前已得到图片的base64数据
                let {file,isGroupChat,sendTime,sender,type,userId,identity,room,chatName} = d
                changeListFun({
                    isGroupChat,sendTime,sender,type,userId,room,chatName,
                    img:Uint8ArrayToBase64(file),
                    imgID:identity
                },readStatus)
            }
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
        let {user_id} = Zustand.customer
        Zustand.changeChatList({
            userId: info.user_id,
            type: '',
            msg: '',
            user: info.username,
            time: new Date().getTime(),
            hasBeenRead: false,
            isGroupChat: false,
            //avatar: info.avatar
        } as unknown as MsgDataType)

        Zustand.changeChatList({
            userId:user_id,
            //avatar:avatar,
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
            //avatar:info.avatar
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
            //chatAvatar:e.avatar,
            chatName:e.user
        } as unknown as MsgDataType)
        Zustand.changeUserAvatar(e.userId,e.avatar)
    })

    socket.on('sendImageProgress',(data:any)=>{
        Zustand.updateImageSendProgress(data)
    })

}