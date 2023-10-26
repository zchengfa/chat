import './chatList.sass'
import { Avatar,Badge,Space } from "antd";
import { UserOutlined } from '@ant-design/icons'
import {BellIconComponent, FileTransIconComponent} from '../../common/svg/svg'
import { MsgDataType } from '../../common/staticData/data'

import withHook from "../../hook/withHook";

function ChatList (props:any){

  const { chatList,listId } = props.Zustand

  const chatWithSender = (item:MsgDataType,id:any)=>{

    props.chatWithSender(item,id)
  }

  const chatListElement = ()=>{
    return chatList.map((item:any,index:number)=>{
      return <li key={index}>
        <div className={(item.isGroupChat ? listId?.toString() === item.room?.toString() : listId?.toString() === item.userId?.toString() ) ? 'message-box actived' : 'message-box'} onClick={()=> chatWithSender(item,item.isGroupChat ? item.room : item.userId)}>
          <Space className={'msg-left'}>
            <Badge dot={!item.hasBeenRead}>
              { item.avatar.length ? <div className={'avatar'}><img style={{width:'2.5rem'}} src={item.isGroupChat ? item.chatAvatar : item.avatar} alt=""/></div> : item.type === 'text' ? <Avatar shape={'square'} icon={<UserOutlined />}></Avatar> : <div className={'avatar'} style={{alignItems:'center',backgroundColor:'var(--success-font-color)'}}><FileTransIconComponent /></div> }
            </Badge>
          </Space>
          <Space className={'msg-right'}>
            <div className={'user-msg'}>
              <p className={'chat-user text-ellipsis'}>{item.isGroupChat ? item.chatName : item.user}</p>
              <p className={'chat-msg'}>{item.msg}</p>
            </div>
            <div className={'time-mute'}>
              <p className={'chat-time'}>{item.showTime}</p>
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
