import './chatList.sass'
import { Avatar,Badge,Space } from "antd";
import { UserOutlined } from '@ant-design/icons'


export default function ChatList (){
  const messageData = [
    {
      id:3156987,
      user:'阿藏',
      type:'text',
      msg:'这是一条用于测试的聊天消息',
      avatar:'',
      time:'刚刚',
      isMute:false,
      hasBeenRead:false
    },
    {
      id:5678453,
      user:'沙雕',
      type:'text',
      msg:'你好',
      avatar:'',
      time:'08/10',
      isMute:false,
      hasBeenRead:false
    }
  ]
  const chatListElement = ()=>{
    return messageData.map((item:any,index:number)=>{
      return <li key={index}>
        <div className={'message-box'}>
          <Space>
            <Badge dot={!item.hasBeenRead}>
              <Avatar shape={'square'} icon={<UserOutlined />}></Avatar>
            </Badge>
          </Space>
          <Space>
            <div className={'chat-item-right'}>
              <div>
                <p>{item.user}</p>
                <p>{item.msg}</p>
              </div>
              <div>
                <p>{item.time}</p>
                <p>{item.isMute ? '静音':'未静音'}</p>
              </div>
            </div>
          </Space>
        </div>
      </li>
    })
  }

  return <div>
    <ul>
      {chatListElement()}
    </ul>
  </div>
}