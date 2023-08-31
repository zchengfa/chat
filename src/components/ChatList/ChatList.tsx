import './chatList.sass'
import { Avatar,Badge,Space } from "antd";
import { UserOutlined } from '@ant-design/icons'
import { BellIconComponent } from '../../common/svg/svg'
import { messageData } from '../../common/staticData/data'

export default function ChatList (){
  const chatListElement = ()=>{
    return messageData.map((item:any,index:number)=>{
      return <li key={index}>
        <div className={'message-box'}>
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
    {chatListElement()}
  </ul>
}