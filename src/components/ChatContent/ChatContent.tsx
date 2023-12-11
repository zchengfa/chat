import './chatContent.sass'
import {Layout, Divider, Input, Button, Upload, message, Avatar, Switch, Modal} from "antd";
import {operationsData, IconMenu, commonApplicationComponent} from "../../common/staticData/data";
import MessageContent from "../MessageContent/MessageContent";
import {useEffect, useRef, useState} from "react";
import {createFileChunk, emojiToUtf16, transMsgToNameCode, Uint8ArrayToBase64} from "../../util/util";
import withHook from "../../hook/withHook";
import {RcFile} from "antd/es/upload";
import PopoverCommon from "../Common/PopoverCommon/PopoverCommon";
import {PlusOutlined, MinusOutlined, RightOutlined, SearchOutlined} from "@ant-design/icons";

function ChatContent(props: any) {
  const {Header, Content, Footer} = Layout
  const {operations, chatWay} = operationsData
  const {TextArea} = Input
  const [msg, setMsg] = useState('')
  const [emojiIndex, setEmojiIndex] = useState([])
  const [count, setCount] = useState(0)
  const {
    currentFriendMsg,
    friendInfo,
    customer,
    changeChatList,
    changeBg,
    listId,
    changeEmojiStatus,
    changeWindowStatus,
    chatWindowStatus,
    chatWindowSiderInfo,
    changeChatWindowSiderInfo
  } = props.Zustand
  const textAreaRef = props.Refs
  const [messageApi, contextHolder] = message.useMessage()
  const {moreHorization} = commonApplicationComponent
  const [modalOpen, setModalOpen] = useState(false)
  const windowRef = useRef(null)

  useEffect(() => {
    changeWindowStatus(false)
    return () => {

    }
  }, [count, listId])


  const changeBgColor = (status: boolean, direction: boolean, index: number) => {

    let data = []
    data = JSON.parse(JSON.stringify(currentFriendMsg))

    data.map((item: any, i: number) => {
      if (Object.keys(item).length) {

        if (direction && i === index) {

          status ? item.bgColor = 'var(--gray-color)' : item.bgColor = 'var(--white-color)'
        } else if ((!direction) && i === index) {

          !status ? item.bgColor = 'var(--success-font-color)' : item.bgColor = 'var(--deep-green-color)'

        }
      }
      return true

    })
    changeBg(data[index], index, listId)

  }

  const changeMsg = (e: any) => {
    let msg = e.target.value.trim()
    setMsg(msg)
  }

  const sendMsg = (msg: string) => {
    closeChatWindow()
    let time = new Date().getTime()
    setMsg('')
    if (msg.length) {

      changeChatList({
        userId: customer.user_id,
        avatar: customer.avatar,
        user: customer.username,
        isLeft: false,
        bgColor: 'var(--success-font-color)',
        msg: emojiToUtf16(msg),
        msgCode: transMsgToNameCode(msg, emojiIndex),
        time,
        isGroupChat: friendInfo.isGroupChat,
        room: friendInfo.isGroupChat ? listId : undefined
      }, listId)
      let c = count
      c++
      setCount(c)

      //向父组件发送事件，将消息发动给后端的socket
      props.socketMsg({
        type: 'msg',
        sender: customer.username,
        userId: customer.user_id,
        receiver: friendInfo.user,
        avatar: customer.avatar,
        sendTime: time,
        room: friendInfo.isGroupChat ? listId : undefined,
        chatName: friendInfo.user,
        chatAvatar: friendInfo.isGroupChat ? friendInfo.avatar : undefined,
        isGroupChat: friendInfo.isGroupChat,
        msg: emojiToUtf16(msg),
        msgCode: emojiIndex.length ? transMsgToNameCode(msg, emojiIndex) : ''
      })

      setEmojiIndex([])
    }

  }
  const keyboardSendMsg = (e: any) => {
    if (e.keyCode === 13 && msg.length) {
      sendMsg(msg)
    }
  }

  const iconClick = (e: any, item: any) => {
    e.stopPropagation()
    switch (item.title) {
      case '表情':
        changeEmojiStatus()
        break;
    }
  }

  const CustomEventChooseEmoji = (event: any) => {

    let data = msg + event.detail.emoji

    let indexArr = JSON.parse(JSON.stringify(emojiIndex))
    indexArr.push({
      index: data.length - 2,
      nameCode: event.detail.nameCode
    })
    setEmojiIndex(indexArr)
    setMsg(data)
    textAreaRef.current?.focus()

    document.removeEventListener('chooseEmoji', CustomEventChooseEmoji)
  }

  document.addEventListener('chooseEmoji', CustomEventChooseEmoji)

  const beforeUpload = (file: RcFile) => {
    let type = file.type.split('/')
    if (type[0] === 'image') {
      let reader = new FileReader()

      reader.readAsArrayBuffer(file)

      reader.onload = function () {
        // @ts-ignore
        let chunkList = createFileChunk(reader.result, reader.result?.byteLength, 100 * 1024)

        changeChatList({
          type: 'img',
          userId: customer.user_id,
          avatar: customer.avatar,
          user: customer.username,
          isLeft: false,
          bgColor: 'var(--success-font-color)',
          msg: '[图片]',
          imgID: chunkList[0]['identity'],
          img: Uint8ArrayToBase64(new Uint8Array((reader.result) as ArrayBufferLike)),
          time: new Date().getTime(),
          isGroupChat: friendInfo.isGroupChat,
          room: friendInfo.isGroupChat ? listId : undefined,
          chatName: friendInfo.user,
          chatAvatar: friendInfo.isGroupChat ? friendInfo.avatar : undefined,
        }, listId)

        chunkList.forEach((item: any) => {
          props.socket.emit('sendMsg', {
            isGroupChat: friendInfo.isGroupChat,
            ...item,
            sender: customer.username,
            userId: customer.user_id,
            receiver: friendInfo.user,
            rID: friendInfo.userId,
            avatar: customer.avatar,
            chunkCount: chunkList.length,
            sendTime: new Date().getTime(),
            room: friendInfo.isGroupChat ? listId : undefined,
            chatName: friendInfo.user,
            chatAvatar: friendInfo.isGroupChat ? friendInfo.avatar : undefined,
          })
        })
      }
    } else {
      messageApi.open({
        type: 'error',
        content: '暂时只支持图片传送'
      })
    }
    return false
  }

  const showWindowPop = (data: { user_id: number, isShowPop: boolean }) => {
    changeChatWindowSiderInfo(chatWindowSiderInfo, data)
  }

  //显示对话框
  const showHideModal = (status: boolean = true) => {
    setModalOpen(status)
  }

  const deleteHistory = () => {
    setModalOpen(false)
    console.log('清空聊天记录')
  }
  const textareaFocus = () => {
    closeChatWindow()
  }

  const closeChatWindow = () => {
    if (chatWindowStatus) {
      changeWindowStatus(false)
    }
  }

  return <div className={'content-con'}>
    <Layout className={'content-con-layout'}>
      {contextHolder}
      <Modal centered={true} mask={false} okText={'清空'} closeIcon={false} width={300} cancelText={'取消'}
             open={modalOpen} onCancel={() => showHideModal(false)}
             onOk={deleteHistory}
      >
        <span>删除聊天记录，包括聊天中的图片、文件、视频等内容</span>
      </Modal>
      <Header className={'user-box'}>
        <div className={'title-box'} style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
          <span className={'receiver-title text-ellipsis'}>{friendInfo.user}</span>
          {friendInfo.isGroupChat ?
            <span className={'receiver-title members-count'}>({chatWindowSiderInfo.members.length})</span> : null}
        </div>
        <div style={{fontSize: '20px'}}
             onClickCapture={() => changeWindowStatus(!chatWindowStatus)}>{moreHorization}</div>
      </Header>
      <Content className={'msg-content'}>
        <MessageContent changeBgColor={changeBgColor} data={currentFriendMsg}></MessageContent>
      </Content>
      <Divider className={'chat-divider'}/>
      <Footer className={'sender-operations'}>
        <div className={'icon-list'}>
          <div className={'operations-box'}>
            {
              operations.map((item: IconMenu, index: number) => {
                return <div className={'icon-box'} key={index} onClick={(e) => iconClick(e, item)}>
                  {item.title === '发送文件' ? <Upload showUploadList={false}
                                                       beforeUpload={beforeUpload}>{item.component()}</Upload> : item.component()}
                </div>
              })
            }
          </div>
          <div className={'chat-way'}>
            {
              chatWay.map((item: IconMenu, index: number) => {
                return <div className={'icon-box'} key={index}>
                  {item.component()}
                </div>
              })
            }
          </div>
        </div>
        <div className={'text-area-box'}>
          <TextArea ref={textAreaRef} style={{height: '100%', resize: 'none'}} bordered={false} value={msg}
                    onKeyDown={keyboardSendMsg} onChange={changeMsg} onFocus={textareaFocus}></TextArea>
        </div>
        <div className={'send-btn-box'}>
          <Button className={'send-button'} size={'small'} onClick={() => sendMsg(msg)}>发送(S)</Button>
        </div>
      </Footer>
    </Layout>
    <div className={chatWindowStatus ? 'content-sider-actived' : 'content-sider'} style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderLeft: '1px solid var(--deep-gray-color)'
    }}>
      {/*    聊天窗口包含的好友或者群聊信息*/}
      <div className={'chat-window-info'} style={{overflowY: 'scroll'}} ref={windowRef}>
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
    </div>
  </div>
}

export default withHook(ChatContent)