import './chatList.sass'
import { Avatar,Badge,Space } from "antd";
import { UserOutlined } from '@ant-design/icons'
import {BellIconComponent, FileTransIconComponent} from '../../../common/svg/svg'
import { MsgDataType,contextMenuChatList } from '../../../common/staticData/data'
import {isMobile} from "../../../util/util";
import {useContextMenuStore} from "../../../zustand/store";

import withHook from "../../../hook/withHook";

function ChatList (props:any){

  const { chatList,listId,customer } = props.Zustand
 const {changeContextMenu} = useContextMenuStore((state:any)=> state)
  const chatWithSender = (item:MsgDataType,id:any)=>{
    //判断点击项是否是在激活状态，防止重复点击
    if(listId[customer.user_id] !== id && !isMobile){
      props.chatWithSender(item,id)
    }
    else{
      props.chatWithSender(item,id)
    }
  }

  const contextMenuEvent = (e:any,index:number)=>{
    if(!isMobile){
      e.preventDefault()
      const contextMenuEl:any = document.getElementById(props.contextMenuTarget)
      contextMenuEl.style.display = 'block'
      contextMenuEl.style.left = e.clientX + 'px'
      contextMenuEl.style.top = e.clientY + 'px'
      const liEl:any =document.getElementsByClassName('list-item').item(index)
      let data = liEl.dataset.chattype === 'true' ? contextMenuChatList.isGroupChat : contextMenuChatList.isNormal
      changeContextMenu(data)
    }
  }

  const chatListElement = ()=>{
    return chatList[customer.user_id].map((item:any,index:number)=>{
      return <li key={index} className={'list-item'} data-index={index} data-chattype={item.isGroupChat} onContextMenu={(event)=> contextMenuEvent(event,index)}>
        <div className={(item.isGroupChat ? listId[customer.user_id]?.toString() === item.room?.toString() : listId[customer.user_id]?.toString() === item.userId?.toString() ) && !isMobile ? 'message-box actived' : 'message-box'} onClick={()=> chatWithSender(item,item.isGroupChat ? item.room : item.userId)}>
          <Space className={'msg-left'}>
            <Badge dot={!item.hasBeenRead}>
              { item.avatar.length ? <div className={'avatar'}><img style={item.isGroupChat ?{width:'2.5rem',borderRadius:'.2rem'} : {width:'2.5rem',height:'2.5rem',borderRadius:'.2rem'}} src={item.isGroupChat ? item.chatAvatar : item.avatar} alt=""/></div> : item.type === 'text' ? <Avatar shape={'square'} icon={<UserOutlined />}></Avatar> : <div className={'avatar'} style={{alignItems:'center',backgroundColor:'var(--success-font-color)'}}><FileTransIconComponent /></div> }
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

  return <ul className={isMobile ? 'list-container-mobile' : 'list-container'}>

    {chatList[customer.user_id]?.length ? chatListElement() : null}
  </ul>
}
 export default withHook(ChatList)
