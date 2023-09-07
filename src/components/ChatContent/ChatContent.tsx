import './chatContent.sass'
import { Layout,Divider,Input,Button } from "antd";
import { operationsData,IconMenu } from "../../common/staticData/data";
import MessageContent from "../MessageContent/MessageContent";
import {useEffect, useState} from "react";
import {useMessageStore} from "../../zustand/store";

export default function ChatContent (props:any){
    const { Header,Content,Footer } = Layout
    const { operations,chatWay } = operationsData
    const { TextArea } = Input
    const msgData = useMessageStore((state:any)=> state.msgData)
    const [msg,setMsg] = useState('')
    const [count,setCount] = useState(0)

    const friendInfo = useMessageStore((state:any)=> state.friendInfo)
    const userId = useMessageStore((state:any)=> state.customer.userId)
    const changeChatList = useMessageStore((state:any)=> state.changeChatList)
    const changeBg = useMessageStore((state:any)=> state.changeBg)
    const listId = useMessageStore((state:any)=> state.listId)


    //监听聊天消息列表，列表数据量变化，让最后一项出现在视口，保持滚动到最新消息
    useEffect(()=>{

        const el = document.getElementsByClassName('msg-li').item(msgData[listId].length -1)

        el?.scrollIntoView({behavior:'smooth'})

        return ()=>{
            console.log('有新消息')
        }

    },[count])


    const changeBgColor =(status:0|1,direction:boolean,index:number)=>{

        let data = []
        data = JSON.parse(JSON.stringify(msgData[listId]))

        data.map((item:any,i:number)=>{
            if(Object.keys(item).length){

                if(direction && i === index){

                    status === 1 ? item.bgColor = 'var(--gray-color)' : item.bgColor = 'var(--white-color)'
                }
                else if((!direction) && i === index){

                    status === 0 ? item.bgColor = 'var(--success-font-color)' : item.bgColor = 'var(--deep-green-color)'

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

        setMsg('')

        if(msg.length){
            changeChatList({
                userId,
                avatar:'https://img0.baidu.com/it/u=2977473448,4146980684&fm=253&fmt=auto&app=138&f=JPEG?w=190&h=190',
                isLeft:false,
                bgColor:'var(--success-font-color)',
                msg
            },listId)
            let c = count
            c++
            setCount( c)
        }

    }
    const keyboardSendMsg = (e:any)=>{

        if(e.keyCode === 13 && msg.length ){
            sendMsg(msg)

        }
    }

    const setEmptyDiv = ()=>{
        sendMsg('')
    }

    return <Layout className={'content-con'}>
        <Header className={'user-box'}>
            <span className={'receiver-title'}>{friendInfo.user}</span>
        </Header>
        <Content className={'msg-content'}>
            <MessageContent changeBgColor={changeBgColor} setEmptyDiv={setEmptyDiv}></MessageContent>
        </Content>
        <Divider className={'chat-divider'} />
        <Footer className={'sender-operations'}>
            <div className={'icon-list'}>
                <div className={'operations-box'}>
                    {
                        operations.map((item:IconMenu,index:number)=>{
                            return <div className={'icon-box'} key={index}>
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