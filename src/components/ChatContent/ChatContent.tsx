import './chatContent.sass'
import {Layout, Divider, Input, Button, Upload, message} from "antd";
import { operationsData,IconMenu } from "../../common/staticData/data";
import MessageContent from "../MessageContent/MessageContent";
import {useEffect, useState} from "react";
import {createFileChunk, emojiToUtf16, transMsgToNameCode} from "../../util/util";
import withHook from "../../hook/withHook";
import {RcFile} from "antd/es/upload";

function ChatContent (props:any){
    const { Header,Content,Footer } = Layout
    const { operations,chatWay } = operationsData
    const { TextArea } = Input
    const [msg,setMsg] = useState('')
    const [emojiIndex,setEmojiIndex] = useState([])
    const [count,setCount] = useState(0)
    const {currentFriendMsg,friendInfo,customer,changeChatList,changeBg,listId,changeEmojiStatus} = props.Zustand
    const textAreaRef = props.Refs
    const [messageApi,contextHolder] = message.useMessage()

    useEffect(()=>{

        return ()=>{

        }

    },[count])


    const changeBgColor =(status:boolean,direction:boolean,index:number)=>{

        let data = []
        data = JSON.parse(JSON.stringify(currentFriendMsg))

        data.map((item:any,i:number)=>{
            if(Object.keys(item).length){

                if(direction && i === index){

                    status ? item.bgColor = 'var(--gray-color)' : item.bgColor = 'var(--white-color)'
                }
                else if((!direction) && i === index){

                    !status ? item.bgColor = 'var(--success-font-color)' : item.bgColor = 'var(--deep-green-color)'

                }
            }
            return true

        })
        changeBg(data[index],index,listId)

    }

    const changeMsg = (e:any)=>{

        let msg = e.target.value.trim()

        setMsg(msg)

    }

    const sendMsg = (msg:string)=>{
        let time = new Date().getTime()
        setMsg('')

        if(msg.length){

            changeChatList({
                userId:customer.user_id,
                avatar:customer.avatar,
                user:customer.username,
                isLeft:false,
                bgColor:'var(--success-font-color)',
                msg:emojiToUtf16(msg),
                msgCode:transMsgToNameCode(msg,emojiIndex),
                time,
                isGroupChat:friendInfo.isGroupChat,
                room:listId
            },listId)
            let c = count
            c++
            setCount( c)

            //向父组件发送事件，将消息发动给后端的socket
            props.socketMsg({
                type:friendInfo.type,
                sender:customer.username,
                userId:customer.user_id,
                receiver:friendInfo.user,
                avatar:customer.avatar,
                sendTime:time,
                room: listId,
                chatName:friendInfo.user ,
                chatAvatar:friendInfo.avatar,
                isGroupChat:friendInfo.isGroupChat,
                msg:emojiToUtf16(msg),
                msgCode:emojiIndex.length ? transMsgToNameCode(msg,emojiIndex) : ''
            })

            setEmojiIndex([])
        }

    }
    const keyboardSendMsg = (e:any)=>{

        if(e.keyCode === 13 && msg.length ){
            sendMsg(msg)

        }
    }

    const iconClick = (item:any)=>{
        switch (item.title) {
            case '表情':
                changeEmojiStatus()
                break;
        }
    }

    const CustomEventChooseEmoji =(event:any)=>{

        let data = msg + event.detail.emoji

        let indexArr = JSON.parse(JSON.stringify(emojiIndex))
        indexArr.push({
            index:data.length -2,
            nameCode:event.detail.nameCode
        })
        setEmojiIndex(indexArr)
        setMsg(data)
        textAreaRef.current?.focus()
        document.removeEventListener('chooseEmoji',CustomEventChooseEmoji)
    }

    document.addEventListener('chooseEmoji',CustomEventChooseEmoji)

    const beforeUpload = (file:RcFile)=>{
        let type = file.type.split('/')
        if(type[0] === 'image'){
            let reader = new FileReader()

            reader.readAsArrayBuffer(file)

            reader.onload = function () {

                // @ts-ignore
                let chunkList = createFileChunk(reader.result,reader.result?.byteLength,100*1024)
                chunkList.map((item:any,i:number)=>{
                    if(i === chunkList.length -1){
                        props.socket.emit('sendMsg',{
                            isGroupChat:false,
                            imgChunk:item,
                            chunkCount:chunkList.length
                        })
                    }
                    else{
                        props.socket.emit('sendMsg',item)
                    }
                })


            }
        }
        else{
            messageApi.open({
                type:'error',
                content:'暂时只支持图片传送'
            })
        }
        return false
    }

    return <Layout className={'content-con'}>
        {contextHolder}
        <Header className={'user-box'}>
            <span className={'receiver-title text-ellipsis'}>{friendInfo.user}</span>
        </Header>
        <Content className={'msg-content'}>
            <MessageContent changeBgColor={changeBgColor} data={currentFriendMsg}></MessageContent>
        </Content>
        <Divider className={'chat-divider'} />
        <Footer className={'sender-operations'}>
            <div className={'icon-list'}>
                <div className={'operations-box'}>
                    {
                        operations.map((item:IconMenu,index:number)=>{
                            return <div className={'icon-box'} key={index} onClick={()=> iconClick(item)}>
                                {item.title === '发送文件' ? <Upload showUploadList={false} beforeUpload={beforeUpload}>{item.component()}</Upload> : item.component()}
                            </div>
                        })
                    }
                </div>
                <div className={'chat-way'}>
                    {
                        chatWay.map((item:IconMenu,index:number)=>{
                            return <div className={'icon-box'} key={index}>
                                {item.component()}
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={'text-area-box'}>
                <TextArea ref={textAreaRef} style={{height:'100%',resize:'none'}} bordered={false} value={msg} onKeyDown={keyboardSendMsg} onChange={changeMsg}></TextArea>
            </div>
            <div className={'send-btn-box'}>
                <Button className={'send-button'} size={'small'} onClick={()=> sendMsg(msg)}>发送(S)</Button>
            </div>
        </Footer>
    </Layout>
}

export default withHook(ChatContent)