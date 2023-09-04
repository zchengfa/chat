import './chatContent.sass'
import { Layout,Divider,Input,Button } from "antd";
import { operationsData,IconMenu } from "../../common/staticData/data";
import MessageContent from "../MessageContent/MessageContent";
import { useState} from "react";

export default function ChatContent (props:any){
    const { Header,Content,Footer } = Layout
    const { operations,chatWay } = operationsData
    const { TextArea } = Input
    const [msgData,setMsgData] = useState([
        {
            userId:0,
            avatar:'https://img0.baidu.com/it/u=2977473448,4146980684&fm=253&fmt=auto&app=138&f=JPEG?w=190&h=190',
            msg:'分别输出接口分步实施从色粉色粉色色好好发育粉我等哈我到五级大佬吊袜带',
            isLeft:false,
            bgColor:'var(--success-font-color)'
        },
        {
            userId:0,
            avatar:'https://img0.baidu.com/it/u=3891406513,1665181090&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200',
            msg:'耦合',
            isLeft:true,
            bgColor:'var(--white-color)'
        },
        {
            userId:0,
            avatar:'https://img0.baidu.com/it/u=3891406513,1665181090&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200',
            msg:'分手十年方式VS VS瑟夫',
            isLeft:true,
            bgColor:'var(--white-color)'
        },
        {
            userId:0,
            avatar:'https://img0.baidu.com/it/u=436036379,447094936&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200',
            img:'https://t7.baidu.com/it/u=2295973985,242574375&fm=193&f=GIF',
            isLeft:true,
            timeout:'20:03',
            bgColor:'var(--white-color)'

        },
        {
            userId:0,
            avatar:'https://img0.baidu.com/it/u=2977473448,4146980684&fm=253&fmt=auto&app=138&f=JPEG?w=190&h=190',
            img:'https://t7.baidu.com/it/u=2295973985,242574375&fm=193&f=GIF',
            isLeft:false,
            bgColor:'var(--success-font-color)'
        },

    ])

    const [msg,setMsg] = useState('')

    const changeBgColor =(status:0|1,direction:boolean,index:number)=>{

        let data = []
        data = JSON.parse(JSON.stringify(msgData))
        data.map((item:any,i:number)=>{
            if(direction && i === index){

               status === 1 ? item.bgColor = 'var(--gray-color)' : item.bgColor = 'var(--white-color)'
            }
            else if((!direction) && i === index){

               status === 0 ? item.bgColor = 'var(--success-font-color)' : item.bgColor = 'var(--deep-green-color)'

            }
            return null
        })
        setMsgData(data)

    }

    const changeMsg = (e:any)=>{
        setMsg(e.target.value)
    }

    const sendMsg = (msg:string)=>{
        if(msg.length){
            let data = []
            data = JSON.parse(JSON.stringify(msgData))
            data.push({
                avatar:'https://img0.baidu.com/it/u=2977473448,4146980684&fm=253&fmt=auto&app=138&f=JPEG?w=190&h=190',
                isLeft:false,
                bgColor:'var(--success-font-color)',
                msg
            })
            setMsgData(data)

            setMsg('')
        }

    }

    return <Layout className={'content-con'}>
        <Header className={'user-box'}>
            <span className={'receiver-title'}>{props.recieverInfo.user}</span>
        </Header>
        <Content className={'msg-content'}>
            <MessageContent msgData = {msgData} changeBgColor={changeBgColor}></MessageContent>
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
                <TextArea style={{height:'100%',resize:'none'}} bordered={false} value={msg} onChange={changeMsg}></TextArea>
            </div>
            <div className={'send-btn-box'}>
                <Button className={'send-button'} size={'small'} onClick={()=> sendMsg(msg)}>发送(S)</Button>
            </div>
        </Footer>
    </Layout>
}