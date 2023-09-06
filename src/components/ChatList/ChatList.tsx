import './chatList.sass'
import { Avatar,Badge,Space } from "antd";
import { UserOutlined } from '@ant-design/icons'
import { BellIconComponent } from '../../common/svg/svg'
import { MsgDataType } from '../../common/staticData/data'
import {useMessageStore} from "../../zustand/store";



export default function ChatList (props:any){
  const chatList = useMessageStore((state:any)=> state.chatList)
  const activedId = useMessageStore((state:any)=> state.listId )
  //const changeChatList  = useMessageStore((state:any)=> state.changeChatList)
  // console.log(activedIndex)
  // changeChatList(
  //   {
  //     userId:5678453,
  //     user:'沙雕1号',
  //     type:'text',
  //     msg:'你好',
  //     avatar:'',
  //     time:'08/10',
  //     isMute:true,
  //     hasBeenRead:false,
  //     isGroupChat: false
  //   }
  // )

  // const saveMsgData  = useMessageStore((state:any)=> state.saveMsgData)
  // saveMsgData( {
  //       userId:5678453,
  //       avatar:'https://img0.baidu.com/it/u=2977473448,4146980684&fm=253&fmt=auto&app=138&f=JPEG?w=190&h=190',
  //       isLeft:false,
  //       bgColor:'var(--success-font-color)',
  //       msg:'哦啊无法范围'
  //     },5678453)
  const chatWithSender = (item:MsgDataType,id:number)=>{
    props.chatWithSender(item,id)
  }

  const chatListElement = ()=>{
    return chatList.map((item:any,index:number)=>{
      return <li key={index}>
        <div className={activedId === item.userId ? 'message-box actived' : 'message-box'} onClick={()=> chatWithSender(item,item.userId)}>
          <Space className={'msg-left'}>
            <Badge dot={!item.hasBeenRead}>
              <Avatar shape={'square'} icon={<UserOutlined />}></Avatar>
            </Badge>
          </Space>
          <Space className={'msg-right'}>
            <div className={'user-msg'}>
              <p className={'chat-user'}>{item.user}</p>
              <p className={'chat-msg'}>{item.msg}</p>
            </div>
            <div className={'time-mute'}>
              <p className={'chat-time'}>{item.time}</p>
              {item.isMute ? <BellIconComponent className={'chat-mute'} /> : null}
            </div>
          </Space>
        </div>
      </li>
    })
  }

  return <ul className={'list-container'}>
    {chatList?.length ? chatListElement() : null}
  </ul>
}