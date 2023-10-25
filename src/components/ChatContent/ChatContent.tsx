import './chatContent.sass'
import { Layout,Divider,Input,Button } from "antd";
import { operationsData,IconMenu } from "../../common/staticData/data";
import MessageContent from "../MessageContent/MessageContent";
import {useEffect, useState} from "react";
import {emojiToUtf16, transMsgToNameCode} from "../../util/util";
import withHook from "../../hook/withHook";

function ChatContent (props:any){
    const { Header,Content,Footer } = Layout
    const { operations,chatWay } = operationsData
    const { TextArea } = Input
    const [msg,setMsg] = useState('')
    const [emojiIndex,setEmojiIndex] = useState([])
    const [count,setCount] = useState(0)
    const {currentFriendMsg,friendInfo,customer,changeChatList,changeBg,listId,changeEmojiStatus} = props.Zustand

    //监听聊天消息列表，列表数据量变化，让最后一项出现在视口，保持滚动到最新消息
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
                isLeft:false,
                bgColor:'var(--success-font-color)',
                msg:emojiToUtf16(msg),
                msgCode:transMsgToNameCode(msg,emojiIndex),
                time
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
                avatar:friendInfo.avatar,
                sendTime:time,
                room: listId,
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
        document.removeEventListener('chooseEmoji',CustomEventChooseEmoji)
    }

    document.addEventListener('chooseEmoji',CustomEventChooseEmoji)

    return <Layout className={'content-con'}>
        <Header className={'user-box'}>
            <span className={'receiver-title'}>{friendInfo.user}</span>
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
                                {item.component()}
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
                <TextArea style={{height:'100%',resize:'none'}} bordered={false} value={msg} onKeyDown={keyboardSendMsg} onChange={changeMsg}></TextArea>
            </div>
            <div className={'send-btn-box'}>
                <Button className={'send-button'} size={'small'} onClick={()=> sendMsg(msg)}>发送(S)</Button>
            </div>
        </Footer>
    </Layout>
}

export default withHook(ChatContent)