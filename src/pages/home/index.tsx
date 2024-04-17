import WithHook from "../../hook/withHook";
import {Component, Fragment} from "react";
import SiderMenu from "../../components/SiderMenu/SiderMenu";
import ChatList from "./ChatList/ChatList";
import ChatContent from "./ChatContent/ChatContent";
import FriendList from "./FriendList/FriendList";
import GroupFriendList from "../../components/GroupFriendList/GroupFriendList";
import {Button, Divider, Input, Layout} from "antd";
import {correctIconComponent, menu, MenuType, MsgDataType, otherMenu} from "../../common/staticData/data";
import './index.sass'
import {CloseCircleOutlined, RightOutlined, SearchOutlined, UserSwitchOutlined} from '@ant-design/icons'
import {searchUserInfo, strangerInfoForGroup} from "../../network/request";
import PopoverCommon from "../../components/Common/PopoverCommon/PopoverCommon";
import FriendApplication from "../../components/FriendApplication/FriendApplication";
import FriendListContent from "./FriendListContent/FriendListContent";
import {socket, SocketEvent} from "../../socket/socket";
import {CollectionList} from "./CollectionList/CollectionList";
import {CollectionListContent} from "./CollectionListContent/CollectionListContent";
import {isMobile} from "../../util/util";
import NavBar from "../../components/Common/NavBar/NavBar";
import TabBar from "../../components/Common/TabBar/TabBar";

class Home extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      menu,
      otherMenu,
      nameArr: [],
      searchRightComponent: correctIconComponent[0].component(this.chatGroup),
      inputProp: undefined,
      inputRef: this.props.Refs,
      placeholder: '搜索',
      currentMenu: '聊天',
      currentIndex: 0,
      isShowAddFriendBtn: undefined,
      inputValue: undefined,
      menuList: {
        '聊天': <ChatList contextMenuTarget={'context-menu'} chatWithSender={this.chatWithSender}></ChatList>,
        "通讯录": <FriendList showListContent={this.showListContent}></FriendList>,
        "收藏": <CollectionList></CollectionList>
      },
      listContent: {
        '聊天': <ChatContent socketMsg={this.socketMsg}></ChatContent>,
        '通讯录': <FriendListContent acceptApply={this.acceptApply}
                                     applyStatus={props.Zustand.isAcceptApply}></FriendListContent>,
        '收藏': <CollectionListContent></CollectionListContent>
      },
      searchUserData: {},
      showFriendCom: false,
      isSelf: undefined,
      isShowPop: undefined,
      acceptApplyData: null,
      isShowFriendList: false
    }
  }

  socketMsg = (data: any) => {
    const {changeSendMsgStatus,friendInfo,customer} = this.props.Zustand
    let receiver = friendInfo[customer.user_id].isGroupChat ? friendInfo[customer.user_id].room : friendInfo[customer.user_id].userId
    const send = () => {
      this.props.socket.emit('sendMsg', data, (response: any) => {
        //有响应，说明消息已经发送给了服务器（可以清除消息发送状态）
        changeSendMsgStatus({msgId: response, receiver})
      })
    }
    if (this.props.socket.connected) {
      send()
    } else {
      let timer = setTimeout(() => {
        if (this.props.socket.connected) {
          send()
        } else {
          this.props.Zustand.changeSendMsgStatus({
            msgId: data.id,
            receiver,
            isFailed: true
          })
        }
        clearTimeout(timer)
      }, 10000)
    }
  }
  /**
   * 接受SiderMenu子组件发出的点击事件
   * @param childIndex { number } 点击的项在列表中的索引
   * @param menuName { string } 列表名
   */
  changeMenu = (childIndex: number, menuName: string) => {
    const m: MenuType[] = this.state[menuName]
    this.getMenuTitle(menuName, childIndex)
    if (this.state.nameArr.indexOf(menuName) === -1) {
      this.state.nameArr.push(menuName)
    }
    const propArr: string[] = Object.keys(this.state)
    propArr.map((i: any) => {
      if (Object.prototype.toString.call(this.state[i] === '[object Array]')) {
        try {
          this.state[i].map((item: any) => {
            if (Object.hasOwn(item, 'isActived')) {
              item.isActived = false
            }
            return null
          })
        } catch (e) {
        }
      }
      return null
    })

    m.forEach((item: MenuType, index: number) => {
      if (menuName === 'menu' && [0, 1, 2].indexOf(childIndex) !== -1) {
        if (index === childIndex) {
          item.isActived = true
        }
        this.setState({
          currentIndex: childIndex
        })
      } else {
        let d = this.state.menu
        d[this.state.currentIndex].isActived = true
      }
    })

    this.setState({
      nameArr: this.state.nameArr,
      isShowFriendBtn: undefined,
      inputProp: null,
      inputValue: undefined,
      placeholder: '搜索'
    })
    if (menuName === 'menu') {
      let setClickFunc = childIndex ? this.addFriend : this.chatGroup
      this.setState({
        searchRightComponent: correctIconComponent[childIndex]?.component(setClickFunc)
      })

      const {otherMenu} = this.state
      otherMenu.forEach((item: any) => {
        if (item.hasPop) {
          item.hasPop = false
        }
      })
      if ([0, 1, 2].indexOf(childIndex) === -1) {
        //点击的是顶部除前三个菜单项
        //console.log(m)
      }
    } else {
      //点击的是底部三个菜单项
      m.forEach((item: MenuType, i: number) => {
        i === childIndex && childIndex !== 0 ? item.hasPop = !item.hasPop : item.hasPop = false
      })

    }
  }
  addFriend = () => {
    this.setState({
      placeholder: 'chat_ID/手机号',
      isShowFriendBtn: true
    })
  }
  /**
   * 点击按钮显示选择联系人加入群聊组件
   */
  chatGroup = () => {
    this.setState({
      isShowFriendList: true
    })
  }
  closeAddFriendBtn = () => {
    this.setState({
      placeholder: '搜索',
      isShowFriendBtn: false,
      inputValue: undefined,
      inputProp: null
    })
  }
  /**
   * 获取用户点击的具体项的菜单项名称
   * @param name { string } 数组名
   * @param index { number } 索引
   */
  getMenuTitle = (name: string, index: number) => {
    let arr: any[]
    name === 'menu' ? arr = this.state.menu : arr = this.state.otherMenu
    if (name === 'menu' && [0, 1, 2].indexOf(index) !== -1) {
      this.setState({
        currentMenu: arr[index].title
      })
    }
  }
  /**
   * 输入框聚焦时，在输入框后面添加关闭组件
   */
  inputFocus = () => {

    this.setState({
      placeholder: '',
      inputProp: <CloseCircleOutlined className={'close-icon'}
                                      onClick={(event) => this.closeInputStatus(event, this.state.inputRef)}/>
    })
  }
  /**
   * 点击关闭组件
   * 1.清楚输入框内容
   * 2.隐藏关闭组件
   * 3.隐藏搜索结果组件
   */
  closeInputStatus = (e: any, ref: any) => {

    //阻止事件冒泡
    e.stopPropagation()
    ref.current.blur()
    this.setState({
      inputValue: undefined,
      inputProp: null,
      placeholder: '搜索'
    })
  }
  inputChange = (e: any) => {
    this.setState({
      inputValue: e.target.value
    })
  }
  /**
   * 失去焦点后触发
   */
  inputBlur = () => {
    if (!this.state.isShowFriendBtn) {
      this.setState({
        placeholder: '搜索',
        inputProp: null,
        inputValue: undefined,
      })
    }
  }
  chatWithSender = async (data: MsgDataType, id: any) => {
    const {changeListId, saveFriendInfo} = this.props.Zustand
    //刷新为当前点击的好友信息
    this.setState({
      recieverInfo: data
    })
    //修改列表激活状态
    await changeListId(id)

    //保存好友信息，用于聊天窗口所需数据展示
    await saveFriendInfo(data);

    this.getWindowInfo(data)

    if(isMobile){
      this.props.router.navigate('/chatContent')
    }
  }

  getWindowInfo = (data: any) => {
    let {customer, friendInfo, changeChatWindowSiderInfo,changeUserAvatar} = this.props.Zustand
    //如果点击的列表项是属于群聊（发起带有当前群聊房间id的请求，获取与当前用户不是好友关系的用户信息，
    // 属于好友关系的用户信息可以从已获得的好友信息列表获取）
    //从本地存储中获取该用户的好友列表数据
    let friendList = JSON.parse(localStorage.getItem('friendList') as string), list: any[] = [],avatar:any = {}
    if (data.isGroupChat) {
      strangerInfoForGroup(data.room, Number(customer.user_id)).then((res: any) => {
        avatar[customer.user_id] = customer.avatar
        list.push({
          isSelf: true,
          ...customer
        })
        friendList.forEach((item: any) => {
          item.content.forEach((it: any) => {
            if (res.data.friendIds.indexOf(it.user_id) !== -1) {
              avatar[it.user_id] = it.avatar
              list.push({
                isFriend: true,
                ...it
              })
            }
          })
        })
        res.data.strangerUsers.forEach((item: any) => {
          avatar[item.user_id] = item.avatar
          list.push({
            isStranger: true,
            ...item
          })
        })
        changeChatWindowSiderInfo(list)
        changeUserAvatar(0,avatar)
      })
    } else {
      friendList.forEach((item: any) => {
        item.content.forEach((it: any) => {
          if (friendInfo[customer.user_id]?.userId === it.user_id) {
            list.push({
              isFriend: true,
              ...it
            })
          }
        })
      })
      changeChatWindowSiderInfo(list)
    }
  }
  /**
   * 点击按钮、搜索用户信息
   * 先用自己的信息跟搜索词进行比对，如果搜索的是自己的账号，直接赋值自己的信息
   * 若搜索的人是自己的好友，则展示好友信息，不向后台发起请求
   * 若能搜索到信息则以气泡卡片形式展示用户信息
   * 若没有搜索到则关闭搜索页，展示网络搜索页并告诉用户无法找到该用户
   */
  searchUsers = async (e: any) => {
    e.stopPropagation()
    const {customer, friendList} = this.props.Zustand
    const {inputValue} = this.state
    let info: any = {}, isSelf = true, isEmpty = false

    if (customer.account === inputValue || customer.username === inputValue) {
      info = customer
    } else if (Object.keys(searchUserFromList(inputValue)).length) {
      info = searchUserFromList(inputValue)
      info.isFriend = true
      isSelf = false
    } else {
      await searchUserInfo(this.state.inputValue, Number(customer.user_id)).then((res: any) => {
        if (!res.data.errMsg) {

          let data = res.data
          isNaN(Number(this.state.inputValue)) ? data.source = '通过搜索昵称添加' : data.source = '通过搜索账号添加'
          isSelf = false
          info = data
        } else {
          isEmpty = true
          //后续需处理没有查询到符合条件的用户情况
          console.log(res.data.errMsg)
        }
      })
    }

    function searchUserFromList(value: string | number) {
      let user = {}
      friendList.forEach((item: any) => {
        if (Array.isArray(item.content)) {
          item.content.forEach((obj: any) => {
            if (obj.username === value || obj.account === value) {
              user = obj
            }
          })
        }
      })
      return user
    }

    if (!isEmpty) {
      this.setState({
        searchUserData: info,
        isSelf,
        isShowPop: true
      })
    }

  }
  /**
   * 1.点击Layout盒子将搜索用户的结果数据清零，道道关闭气泡卡片的效果(需使用事件捕获)
   * 2.关闭显示中的表情组件
   * 2.隐藏contextMenu组件
   */
  blurCom = () => {
    this.setState({
      isShowPop: false
    })

    const {emojiStatus, customer,changeEmojiStatus,chatWindowStatus,changeWindowStatus,changeChatWindowSiderInfo,chatWindowSiderInfo} = this.props.Zustand
    if (emojiStatus) {
      changeEmojiStatus()
    }
    if(chatWindowStatus){
      changeWindowStatus(false)
    }
    changeChatWindowSiderInfo(chatWindowSiderInfo[customer.user_id])

    let contextMenuEl:any = document.getElementById('context-menu')
    contextMenuEl.style.display = 'none'
  }
  /**
   * 需判断是否是自己，若是自己则是发消息操作，反之则是显示好友申请组件
   */
  showFriendApplication = () => {
    if (this.state.isSelf) {
      //给自己发消息
      console.log('需要完善给自己发消息操作')
    } else {
      this.setState({
        showFriendCom: true
      })
      this.props.Zustand.changeAcceptApply(false)
    }
  }
  cancelFriendApp = () => {
    this.setState({
      showFriendCom: false
    })
  }
  /**
   * （接收FriendListContent组件发出的事件）点击接受按钮打开FriendApplication组件
   */
  acceptApply = (item: any) => {
    this.setState({
      showFriendCom: true,
      acceptApplyData: item
    })
    this.props.Zustand.changeAcceptApply(true)
  }

  /**
   * 接收FriendApplication组件发出的确认添加好友的申请事件
   */
  confirmSendRequest = (formData: any) => {
    const {isAcceptApply} = this.props.Zustand
    if (!isAcceptApply) {
      const {user_id, username, account, avatar} = this.props.Zustand.customer
      const data = this.state.searchUserData

      this.props.socket.emit('sendFriendRequest', {
        formData,
        sender: {SUN: user_id, SUA: username, SA: account, SAV: avatar},
        receiver: {RUN: data.user_id, RUA: data.username, RA: data.account},
        applyTime: new Date().getTime(),
        source: data.source
      })

    } else {
      let data = this.state.acceptApplyData
      data.sender.formData = formData
      this.props.socket.emit('acceptApply', data)
    }
    this.setState({
      showFriendCom: false
    })
  }
  /**
   * 接收FriendList组件发出的事件
   * @param type
   * @param title
   * @param index
   * @param id
   */
  showListContent = (type: string, title: string, index: number, id: number) => {
    //修改激活项索引
    this.props.Zustand.changeIndexInfo(type, title, index, id)
  }

  /**
   * 自定义事件（发消息）
   * @param event
   * @constructor
   */
  CustomEventSendMsg = (event: any) => {
    //点击发消息，1.选择聊天菜单项、2.查看聊天列表中是否有与该好友的通讯记录，有就直接激活与该好友的聊天状态，没有就添加一个聊天记录项
    this.changeMenu(0, 'menu')
    const list = this.props.Zustand.chatList[this.props.Zustand.customer.user_id]
    const {user_id, username} = event.detail.data
    let isInclude = false
    let data = {
      userId: user_id,
      msg: '',
      user: username,
      time: new Date().getTime(),
      hasBeenRead: true,
      isGroupChat: false,
    } as unknown as MsgDataType

    list.map((item: any) => {
      if (item.userId === user_id) {
        isInclude = true
      }
      return true
    })
    if (!isInclude) {
      this.props.Zustand.changeChatList(data)
    }

    this.chatWithSender(data, user_id).then()
  }

  /**
   * 接收子组件事件（关闭选择联系人加入群聊组件）
   */
  groupComBtnClick = (isAdd: boolean, data?: any[]) => {
    if (isAdd) {
      //只选择了一位联系人，不创建群聊，开启私人对私人聊天
      if (data?.length === 1) {
        let e = {
          detail: {
            data: data[0]
          }
        }
        this.CustomEventSendMsg(e)
      } else {
        const {user_id, username} = this.props.Zustand.customer
        //socket加入群聊
        this.props.socket.emit('inviteFriendJoinGroup', {
          creator: {user_id, username},
          members: data
        })
      }
    }
    this.setState({
      isShowFriendList: false
    })
  }
  render() {
    const {Sider, Content} = Layout
    const {
      menu,
      otherMenu,
      searchRightComponent,
      inputProp,
      inputRef,
      placeholder,
      isShowFriendBtn,
      inputValue,
      searchUserData,
      showFriendCom,
      isSelf,
      isShowPop,
      isShowFriendList,
      currentMenu,
      currentIndex,
    } = this.state
    const {listId, customer, friendListInfo, friendList} = this.props.Zustand
    const {contextHolder} = this.props.Message

    return <Fragment>
      {!isMobile ? <Layout onClick={this.blurCom}>
        {contextHolder}
        {/*侧边栏*/}
        <Sider width={'70px'}>
          <SiderMenu menu={menu} otherMenu={otherMenu} userInfo={customer}
                     changeMenuContent={this.changeMenu}></SiderMenu>
        </Sider>
        {/*中部搜索框及各个菜单项详情列表*/}
        <div className={'middle-com'} style={currentIndex === 2 ? {backgroundColor: 'transparent'} : {}}>
          <div className={'space-self'}
               style={currentIndex === 2 ? {width: '100%', backgroundColor: 'transparent'} : {width: '100%'}}>
            <Input ref={inputRef} value={inputValue} style={{flex: 1, backgroundColor: 'var(--gray-color)'}}
                   onBlur={this.inputBlur} onChange={this.inputChange} suffix={inputProp} onFocus={this.inputFocus}
                   prefix={isShowFriendBtn ? <UserSwitchOutlined/> : <SearchOutlined/>}
                   placeholder={placeholder}></Input>
            {isShowFriendBtn ? <Button className={'cancel-btn'} onClick={this.closeAddFriendBtn}>取消</Button> :
              currentMenu === '收藏' ? undefined :
                <Button className={'normal'} style={{marginLeft: '1rem', backgroundColor: 'var(--gray-color)'}}
                        icon={searchRightComponent}></Button>}
          </div>
          {isShowPop ? <PopoverCommon btnClick={this.showFriendApplication} customer={searchUserData} arrow={false}
                                      open={!!searchUserData} isSelf={isSelf}
                                      btnTitle={isSelf ? '发消息' : '添加到通讯录'}></PopoverCommon> : null}

          <div className={'middle-list'}>
            {this.state.menuList[this.state.currentMenu]}
            {
              // 搜索添加朋友页
              isShowFriendBtn ? <div className={'friend-search-result'}>
                <Divider style={{margin: '0'}}></Divider>
                {
                  inputValue ? <div className={'search-item'}>
                    <div className={'avatar-box'}>
                      <SearchOutlined style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: "25px",
                        height: '25px',
                        lineHeight: '25px',
                        color: 'var(--white-color)',
                        fontSize: '20px'
                      }}/>
                    </div>
                    <div className={'item-search'} onClick={this.searchUsers}>
                      <div className={'value-box'}>
                        <span style={{width: '42px'}}>搜索：</span>
                        <span className={'search-value'}>{inputValue}</span>
                      </div>
                      <RightOutlined style={{color: 'var(--deep-gray-color)'}}/>
                    </div>
                  </div> : null
                }
              </div> : null
            }
          </div>
        </div>
        <Content className={'index-content'}>
          {this.state.currentMenu === '聊天' && listId[customer.user_id] !== undefined ? this.state.listContent['聊天'] : null}
          {this.state.currentMenu === '通讯录' && friendListInfo?.index !== undefined ? this.state.listContent['通讯录'] : null}
          {this.state.currentMenu === '收藏' ? this.state.listContent['收藏'] : null}
        </Content>
        {showFriendCom ? <FriendApplication btnClick={this.showFriendApplication} confirm={this.confirmSendRequest}
                                            cancel={this.cancelFriendApp}></FriendApplication> : null}
        {isShowFriendList ?
          <GroupFriendList list={friendList} groupComBtnClick={this.groupComBtnClick}></GroupFriendList> : null}
      </Layout> : <Layout onClick={this.blurCom}>
        <NavBar add title={'聊天'}></NavBar>
        <ChatList chatWithSender={this.chatWithSender}></ChatList>
        <TabBar routes={this.props.routes}></TabBar>
      </Layout>}
    </Fragment>
  }

  componentDidMount() {
    const {
      msgData,
      listId,
      changeStorageTime,
      getCurrentMsgData,
      chatList,
      changeChatList,
      customer
    } = this.props.Zustand

    //处理聊天列表与聊天记录的时间
    changeStorageTime()

    if (msgData[listId[customer.user_id]]) {
      getCurrentMsgData()
    }

    if (!chatList[customer.user_id].length) {
      changeChatList({
        userId: customer.user_id,
        type: 'self',
        msg: '',
        user: '文件传输助手',
        time: new Date().getTime(),
        hasBeenRead: true,
        isGroupChat: false,
        isAssistant: true
      } as unknown as MsgDataType)
    }

    //防止多次进出首页时socket的_callbacks里会有多个重复方法
    if(socket['_callbacks'] === undefined){
      SocketEvent({Zustand: this.props.Zustand, Message: this.props.Message})
    }
    else if(typeof socket['_callbacks'] === "object" && Object.keys(socket['_callbacks']).length === 0){
      SocketEvent({Zustand: this.props.Zustand, Message: this.props.Message})
    }
    document.addEventListener('sendMsg', this.CustomEventSendMsg)
  }

  componentWillUnmount() {
    document.removeEventListener('sendMsg', this.CustomEventSendMsg)
  }
}

export default WithHook(Home)