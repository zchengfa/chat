import './chatList.sass'
import { Avatar,Badge,Space } from "antd";
import { UserOutlined } from '@ant-design/icons'
import { BellIconComponent } from '../../common/svg/svg'
import { MsgDataType } from '../../common/staticData/data'

import withHook from "../../hook/withHook";
//import {useMessageStore} from "../../zustand/store";

function ChatList (props:any){

  const { chatList,listId } = props.Zustand
  // const chatList = useMessageStore((state:any)=> state.chatList)
  // const listId = useMessageStore((state:any)=> state.listId)
  // const changeChatList = useMessageStore((state:any)=> state.changeChatList)
  // const random = Math.floor(Math.random()*1000000)
  // changeChatList(
  //     {
  //       userId:random,
  //       user:random,
  //       type:'text',
  //       msg:'你好',
  //       avatar:'https://img2.baidu.com/it/u=898272967,442100033&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  //       time:'08/10',
  //       isMute:true,
  //       hasBeenRead:false,
  //       isGroupChat: false
  //   }
  // )

  const chatWithSender = (item:MsgDataType,id:number)=>{
    props.chatWithSender(item,id)
  }

  const chatListElement = ()=>{
    return chatList.map((item:any,index:number)=>{
      return <li key={index}>
        <div className={listId === item.userId ? 'message-box actived' : 'message-box'} onClick={()=> chatWithSender(item,item.userId)}>
          <Space className={'msg-left'}>
            <Badge dot={!item.hasBeenRead}>
              { item.avatar.length ? <img className={'avatar'} src={item.avatar} alt=""/> : <Avatar shape={'square'} icon={<UserOutlined />}></Avatar> }
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
 export default withHook(ChatList)
//export default ChatList