import './chatSiderWindow.sass'
import {Avatar, Button, Input, Switch} from "antd";
import {MinusOutlined, PlusOutlined, RightOutlined, SearchOutlined} from "@ant-design/icons";
import PopoverCommon from "../Common/PopoverCommon/PopoverCommon";
import {useMessageStore} from "../../zustand/store";
import {useRef} from "react";

export default function ChatSiderWindow (props:any) {
  const {friendInfo,chatWindowSiderInfo,chatWindowStatus,customer} = useMessageStore((state:any)=> state)
  const windowRef = useRef(null)

  const showWindowPop = (data:any)=>{
    props.showWindowPop(data)
  }

  const showHideModal = ()=>{
    props.showHideModal()
  }

  return <div className={'chat-window-info'} ref={windowRef}>
    {friendInfo.isGroupChat ?
      <div className={'input-box'} style={{marginTop: '1.5rem'}}>
        <Input prefix={<SearchOutlined></SearchOutlined>} placeholder={'搜索群成员'}></Input>
      </div>
      : undefined}
    <div className={'chat-members'} style={!friendInfo.isGroupChat ? {justifyContent: 'flex-start'} : {}}>
      {chatWindowSiderInfo.members?.map((item: any) => {
        return <div className={'member-item'} key={item.user_id}
                    onClick={() => showWindowPop({user_id: item.user_id, isShowPop: !item.isShowPop})}>
          <Avatar className={'item-avatar'} src={item.avatar} shape={'square'} size={40}></Avatar>
          <span className={'item-username text-ellipsis'}>{item.username}</span>
          <PopoverCommon open={item.isShowPop} customer={item}
                         btnTitle={item.isSelf ? '发消息' : ''}></PopoverCommon>
        </div>
      })}
      <div className={'member-item add-btn'}>
        <Avatar className={'item-avatar'} size={40} shape={'square'} icon={<PlusOutlined></PlusOutlined>}></Avatar>
        <span className={'item-username'}>添加</span>
      </div>
      {friendInfo.isGroupChat ? <div className={'member-item reduce-btn'}>
        <Avatar className={'item-avatar'} size={40} shape={'square'}
                icon={<MinusOutlined></MinusOutlined>}></Avatar>
        <span className={'item-username'}>移出</span>
      </div> : null}
    </div>
    {friendInfo.isGroupChat ? <div className={'group-info'}>
      <div className={'group-name-box info-item'}>
        <span>群聊名称</span>
        <span>{friendInfo.user}</span>
      </div>
      <div className={'group-notice-box info-item'}>
        <span>群公告</span>
        <span>发布后会通知全部群成员</span>
      </div>
      <div className={'group-note-box info-item'}>
        <span>备注</span>
        <span>群聊的备注仅自己可见</span>
      </div>
      <div className={'group-self-name-box info-item'}>
        <span>我在本群的昵称</span>
        <span>{customer.username}</span>
      </div>
    </div> : undefined}
    <div className={'clear-history-box'}>
      <span>聊天记录</span>
      <RightOutlined style={{color: 'var(--deep-gray-color)'}}></RightOutlined>
    </div>
    <div className={'chat-window-operation'}>
      {friendInfo.isGroupChat ?
        <div className={'operation-item-box'}>
          <span>显示群成员昵称</span>
          <Switch checked={true}
                  className={chatWindowStatus ? 'operation-switch operation-switch-open' : 'operation-switch'}
                  size={'small'}></Switch>
        </div> : undefined}
      <div className={'operation-item-box'}>
        <span>消息免打扰</span>
        <Switch className={!chatWindowStatus ? 'operation-switch operation-switch-open' : 'operation-switch'}
                size={'small'}></Switch>
      </div>
      <div className={'operation-item-box'}>
        <span>置顶聊天</span>
        <Switch className={!chatWindowStatus ? 'operation-switch operation-switch-open' : 'operation-switch'}
                size={'small'}></Switch>
      </div>
      {friendInfo.isGroupChat ?
        <div className={'operation-item-box'}>
          <span>保存到通讯录</span>
          <Switch className={!chatWindowStatus ? 'operation-switch operation-switch-open' : 'operation-switch'}
                  size={'small'}></Switch>
        </div> : undefined}
    </div>
    <div className={'btn-box'}>
      {/*<Button className={'btn'} ghost={true} onClick={()=> showHideModal(true)}>清空聊天记录</Button>*/}
      <span className={'btn'} onClick={() => showHideModal()}>清空聊天记录</span>
    </div>
    {friendInfo.isGroupChat ?
      <div className={'btn-box'}>
        <Button className={'btn'} ghost={true}>退出群聊</Button>
      </div> : undefined
    }
  </div>
}