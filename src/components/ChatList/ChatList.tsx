import './chatList.sass'
import { Avatar,Badge,Space } from "antd";
import { UserOutlined } from '@ant-design/icons'
import {BellIconComponent, FileTransIconComponent} from '../../common/svg/svg'
import { MsgDataType } from '../../common/staticData/data'

import withHook from "../../hook/withHook";

function ChatList (props:any){

  const { chatList,listId } = props.Zustand

  const chatWithSender = (item:MsgDataType,id:number)=>{

    props.chatWithSender(item,id)
  }

  const chatListElement = ()=>{
    return chatList.map((item:any,index:number)=>{
      return <li key={index}>
        <div className={Number(listId) === Number(item.userId) ? 'message-box actived' : 'message-box'} onClick={()=> chatWithSender(item,item.userId)}>
          <Space className={'msg-left'}>
            <Badge dot={!item.hasBeenRead}>
              { item.avatar.length ? <img className={'avatar'} src={item.avatar} alt=""/> : item.type === 'text' ? <Avatar shape={'square'} icon={<UserOutlined />}></Avatar> : <div className={'avatar'} style={{backgroundColor:'var(--success-font-color)'}}><FileTransIconComponent /></div> }
            </Badge>
          </Space>
          <Space className={'msg-right'}>
            <div className={'user-msg'}>
              <p className={'chat-user'}>{item.user}</p>
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
