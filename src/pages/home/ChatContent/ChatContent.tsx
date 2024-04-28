import './chatContent.sass'
import {Layout, Divider, Input, Button, Upload, message, Modal} from "antd";
import {operationsData, IconMenu, commonApplicationComponent} from "../../../common/staticData/data";
import MessageContent from "../../../components/MessageContent/MessageContent";
import {useEffect, useState} from "react";
import {
  createFileChunk,
  emojiToUtf16,
  generateID,
  isMobile,
  transMsgToNameCode,
  Uint8ArrayToBase64
} from "../../../util/util";
import withHook from "../../../hook/withHook";
import {RcFile} from "antd/es/upload";
import NavBar from "../../../components/Common/NavBar/NavBar";
import Chat from "../../../components/Chat/Chat";
import ChatSiderWindow from "../../../components/ChatSiderWindow/ChatSiderWindow";
import screenShot from 'js-web-screen-shot'

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
    changeChatWindowSiderInfo,
    changeSendMsgStatus
  } = props.Zustand

  const textAreaRef = props.Refs
  const [messageApi, contextHolder] = message.useMessage()
  const {moreHorization} = commonApplicationComponent
  const [modalOpen, setModalOpen] = useState(false)
  const [screenShotImg,setScreenShot] = useState([])

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
    changeBg(data[index], index, listId[customer.user_id])

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
      const id = generateID()
      changeChatList({
        id,
        isSending:true,
        userId: customer.user_id,
        user: customer.username,
        isLeft: false,
        bgColor: 'var(--success-font-color)',
        msg: emojiToUtf16(msg),
        msgCode: transMsgToNameCode(msg, emojiIndex),
        time,
        isGroupChat: friendInfo[customer.user_id]?.isGroupChat,
        room: friendInfo[customer.user_id]?.isGroupChat ? listId[customer.user_id] : undefined
      }, listId[customer.user_id])
      let c = count
      c++
      setCount(c)

      //向父组件发送事件，将消息发动给后端的socket
      const socketData = {
        id,
        type: 'msg',
        sender: customer.username,
        userId: customer.user_id,
        receiver: friendInfo[customer.user_id]?.user,
        sendTime: time,
        room: friendInfo[customer.user_id]?.isGroupChat ? listId[customer.user_id] : undefined,
        chatName: friendInfo[customer.user_id]?.user,
        isGroupChat: friendInfo[customer.user_id]?.isGroupChat,
        msg: emojiToUtf16(msg),
        msgCode: emojiIndex.length ? transMsgToNameCode(msg, emojiIndex) : ''
      }
      if(isMobile){
        const send = () => {
          props.socket.emit('sendMsg', socketData, (response: any) => {
            //有响应，说明消息已经发送给了服务器（可以清除消息发送状态）
            changeSendMsgStatus({msgId: response, receiver: friendInfo[customer.user_id]?.userId})
          })
        }
        if (props.socket.connected) {
          send()
        } else {
          let timer = setTimeout(() => {
            if (props.socket.connected) {
              send()
            } else {
              changeSendMsgStatus({
                msgId: socketData.id,
                receiver: friendInfo[customer.user_id]?.userId,
                isFailed: true
              })
            }
            clearTimeout(timer)
          }, 10000)
        }
      }
      else{
        props.socketMsg(socketData)
      }

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
      case '截图':
        screenShotEvent()
        break;
    }
  }

  /**
   * 截图
   * @constructor
   */
  const screenShotEvent = ()=>{
    new screenShot({
      completeCallback:(res:{base64:string,cutInfo:any})=>{
        //保存截图
        screenShotImg.push((res.base64) as never)
        setScreenShot(JSON.parse(JSON.stringify(screenShotImg)))
        //输入框聚焦
        textAreaRef.current?.focus()
      },
      closeCallback:()=>{
        console.log('截图窗口关闭')
      }
    })
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
        const id = generateID()

        changeChatList({
          id,
          type: 'img',
          userId: customer.user_id,
          user: customer.username,
          isLeft: false,
          bgColor: 'var(--success-font-color)',
          msg: '[图片]',
          imgID: chunkList[0]['identity'],
          img: Uint8ArrayToBase64(new Uint8Array((reader.result) as ArrayBufferLike)),
          time: new Date().getTime(),
          isGroupChat: friendInfo[customer.user_id]?.isGroupChat,
          room: friendInfo[customer.user_id]?.isGroupChat ? listId[customer.user_id] : undefined,
          chatName: friendInfo[customer.user_id]?.user,
        }, listId[customer.user_id])

        chunkList.forEach((item: any) => {
          props.socket.emit('sendMsg', {
            id,
            isGroupChat: friendInfo[customer.user_id]?.isGroupChat,
            ...item,
            sender: customer.username,
            userId: customer.user_id,
            receiver: friendInfo[customer.user_id]?.user,
            rID: friendInfo[customer.user_id]?.userId,
            chunkCount: chunkList.length,
            sendTime: new Date().getTime(),
            room: friendInfo[customer.user_id]?.isGroupChat ? listId[customer.user_id] : undefined,
            chatName: friendInfo[customer.user_id]?.user,
          })
        })
      }
    } else {
      messageApi.open({
        type: 'error',
        content: '暂时只支持图片传送'
      }).then(r => {})
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

  const addItemClick = (item:any,index:number)=>{
    messageApi.open({
      type: 'warning',
      content: item.title + '功能完善中'
    }).then(r  =>{})
  }

  const audioEvent = (item:any,index:number)=>{
    messageApi.open({
      type: 'warning',
      content: '语音功能完善中'
    }).then(r  =>{})
  }

  const backEvent = ()=>{
    //初始化chat组件状态
    props.Zustand.initStatus()
    //修改listId,以确保后续在首页接受消息时可保证都在未读状态
    props.Zustand.changeListId(0)

  }

  const moreEvent = ()=>{
    props.router.navigate('/chatWindowInfo')
  }

  return <div className={'content-con'}>
    <Layout className={'content-con-layout'}>
      {contextHolder}
      <Modal centered={true} mask={false} okText={'清空'} closeIcon={false} width={300} cancelText={'取消'}
             open={modalOpen} onCancel={() => showHideModal(false)}
             onOk={deleteHistory}
      >
        <span style={{display:"inline-block",textAlign:'center'}}>删除聊天记录，包括聊天中的图片、文件、视频等内容</span>
      </Modal>
      <Header className={isMobile ? 'user-box user-box-mobile' : 'user-box'}>
        {
          isMobile ? <NavBar backEvent={backEvent} back more moreEvent={moreEvent}></NavBar> : <div className={'PC-header'}>
            <div className={'title-box'} style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
            <span
              className={'receiver-title text-ellipsis'}>{friendInfo[customer.user_id]?.isGroupChat ? friendInfo[customer.user_id]?.chatName : friendInfo[customer.user_id]?.user}</span>
              {friendInfo[customer.user_id]?.isGroupChat ?
                <span className={'receiver-title members-count'}>({chatWindowSiderInfo[customer.user_id]?.length})</span> : null}
            </div>
            {
              friendInfo[customer.user_id]?.type !== 'self' ?
                <div style={{fontSize: '20px'}} onClick={() => changeWindowStatus(!chatWindowStatus)}>{moreHorization}</div>
                : null
            }

          </div>
        }
      </Header>
      <Content className={'msg-content'}>
        <MessageContent changeBgColor={changeBgColor} data={currentFriendMsg}></MessageContent>
      </Content>
      <Divider className={'chat-divider'}/>
      {
        isMobile ? <Footer className={'chat-footer'}>
          <Chat msg={msg} audioEvent={audioEvent} addItemClick={addItemClick} onSend={()=> sendMsg(msg)} keyDownEvent={(e:any)=>keyboardSendMsg(e)} changeEvent={(e:any)=> changeMsg(e)}></Chat>
        </Footer>  :<Footer className={'sender-operations'}>
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
            {
              screenShotImg?.map((item:any,index:number)=>{
                return <img style={{width:'100px',height:'auto'}} src={item} alt="screent shot" key={index}/>
              })
            }
            <TextArea ref={textAreaRef} style={{flex:1,height: '100%', resize: 'none'}} bordered={false} value={msg}
                      onKeyDown={keyboardSendMsg} onChange={changeMsg} onFocus={textareaFocus}></TextArea>
          </div>
          <div className={'send-btn-box'}>
            <Button className={'send-button'} size={'small'} onClick={() => sendMsg(msg)}>发送(S)</Button>
          </div>
        </Footer>
      }
    </Layout>

    {
      friendInfo[customer.user_id]?.type !== 'self' ?
        <div className={chatWindowStatus ? 'content-sider-actived' : 'content-sider'} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          borderLeft: '1px solid var(--deep-gray-color)',
          overflowY: 'scroll',
        }}>
          {/*    聊天窗口包含的好友或者群聊信息*/}
          {chatWindowStatus ? <ChatSiderWindow showWindowPop={showWindowPop} showHideModal={showHideModal}></ChatSiderWindow> : null}
        </div>
        : null
    }

  </div>
}

export default withHook(ChatContent)