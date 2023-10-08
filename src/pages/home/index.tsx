import WithHook from "../../hook/withHook";
import {Component, Fragment} from "react";
import SiderMenu from "../../components/SiderMenu/SiderMenu";
import ChatList from "../../components/ChatList/ChatList";
import ChatContent from "../../components/ChatContent/ChatContent";
import FriendList from "../../components/FriendList/FriendList";
import {Button, Divider, Input, Layout, Space} from "antd";
import {correctIconComponent, menu, MenuType, MsgDataType, otherMenu} from "../../common/staticData/data";
import './index.sass'
import {CloseCircleOutlined, RightOutlined, SearchOutlined, UserSwitchOutlined} from '@ant-design/icons'
import {searchUserInfo} from "../../network/request";
import PopoverCommon from "../../components/Common/PopoverCommon/PopoverCommon";
import FriendApplication from "../../components/FriendApplication/FriendApplication";
import FriendListContent from "../../components/FriendListContent/FriendListContent";

class Home extends Component<any, any>{
    constructor(props:any) {
        super(props);
        this.state = {
            menu,
            otherMenu,
            nameArr:[],
            searchRightComponent:correctIconComponent[0].component(this.chatGroup),
            inputProp:undefined,
            inputRef:this.props.Refs,
            placeholder:'搜索',
            currentMenu:'聊天',
            isShowAddFriendBtn: undefined,
            inputValue:undefined,
            menuList:{
                '聊天':<ChatList chatWithSender={this.chatWithSender}></ChatList>,
                "通讯录":<FriendList showListContent={this.showListContent}></FriendList>
            },
            listContent:{
                '聊天':<ChatContent socketMsg={this.socketMsg}></ChatContent>,
                '通讯录':<FriendListContent acceptApply={this.acceptApply} applyStatus={props.Zustand.isAcceptApply}></FriendListContent>
            },
            searchUserData:{},
            showFriendCom:false,
            isSelf:undefined,
            isShowPop:undefined,
            acceptApplyData:null
        }
    }
    socketMsg = (data:any)=>{

        this.props.socket.emit('sendMsg',data)
    }
    /**
     * 接受SiderMenu子组件发出的点击事件
     * @param childIndex { number } 点击的项在列表中的索引
     * @param menuName { string } 列表名
     */
    changeMenu = (childIndex:number,menuName:string)=>{

        const m:MenuType[] = this.state[menuName]

        this.getMenuTitle(menuName,childIndex)
        if(this.state.nameArr.indexOf(menuName) === -1 ){
            this.state.nameArr.push(menuName)
        }

        const propArr:string[] = Object.keys(this.state)
        propArr.map((i:any)=>{
            if(Object.prototype.toString.call(this.state[i] === '[object Array]')){
                try {
                    this.state[i].map((item:any)=>{
                        if(Object.hasOwn(item,'isActived')){
                            item.isActived = false
                        }
                        return null
                    })
                }
                catch (e){

                }
            }

            return null
        })

        m.map((item:MenuType,index:number)=>{

            return index === childIndex ? item.isActived = true : item.isActived = false
        })

        this.setState({
            nameArr:this.state.nameArr,
            isShowFriendBtn:undefined,
            inputProp:null,
            inputValue:undefined,
            placeholder:'搜索'
        })

        try {
           if(menuName === 'menu'){
               let setClickFunc = childIndex ? this.addFriend : this.chatGroup
               this.setState({
                   searchRightComponent:correctIconComponent[childIndex].component(setClickFunc)
               })
           }
        }catch (e){}

    }
    addFriend = ()=>{
        this.setState({
            placeholder:'chat_ID/手机号',
            isShowFriendBtn:true
        })
    }
    chatGroup = ()=>{
        console.log('发起群聊')
    }
    closeAddFriendBtn = ()=>{
        this.setState({
            placeholder:'搜索',
            isShowFriendBtn:false,
            inputValue:undefined,
            inputProp:null
        })
    }
    /**
     * 获取用户点击的具体项的菜单项名称
     * @param name { string } 数组名
     * @param index { number } 索引
     */
    getMenuTitle = (name:string,index:number)=>{
        let arr = []
        name === 'menu' ? arr = this.state.menu : arr = this.state.otherMenu
        this.setState({
            currentMenu:arr[index].title
        })
    }
    /**
     * 输入框聚焦时，在输入框后面添加关闭组件
     */
    inputFocus = ()=>{

       this.setState({
           placeholder:'',
           inputProp:<CloseCircleOutlined className={'close-icon'} onClick={(event)=> this.closeInputStatus(event,this.state.inputRef)}/>
       })
    }
    /**
     * 点击关闭组件
     * 1.清楚输入框内容
     * 2.隐藏关闭组件
     * 3.隐藏搜索结果组件
     */
    closeInputStatus = (e:any,ref:any)=>{

        //阻止事件冒泡
        e.stopPropagation()
        ref.current.blur()
        this.setState({
            inputValue:undefined,
            inputProp:null,
            placeholder:'搜索'
        })
    }
    inputChange = (e:any)=>{
        this.setState({
            inputValue:e.target.value
        })
    }
    /**
     * 失去焦点后触发
     */
    inputBlur = ()=>{

        if(!this.state.isShowFriendBtn){

            this.setState({
                placeholder:'搜索',
                inputProp:null,
                inputValue:undefined,
            })
        }
    }
    chatWithSender = (data:MsgDataType,id:number)=>{
        const { changeListId,saveFriendInfo } = this.props.Zustand
        this.setState({
            recieverInfo:data
        })
        changeListId(id)
        saveFriendInfo(data)
    }

    /**
     * 点击按钮、搜索用户信息
     * 先用自己的信息跟搜索词进行比对，如果搜索的是自己的账号，直接赋值自己的信息
     * 若搜索的人是自己的好友，则展示好友信息，不向后台发起请求
     * 若能搜索到信息则以气泡卡片形式展示用户信息
     * 若没有搜索到则关闭搜索页，展示网络搜索页并告诉用户无法找到该用户
     */
     searchUsers = async ()=>{

        const {customer,friendList} = this.props.Zustand
        const { inputValue } = this.state
        let info:any = {},isSelf = true,isEmpty = false

        if(customer.account === inputValue || customer.username === inputValue){
            info = customer
        }
        else if(Object.keys(searchUserFromList(inputValue)).length){
            info = searchUserFromList(inputValue)
            info.isFriend = true
            isSelf = false
        }
        else{
          await searchUserInfo(this.state.inputValue,Number(customer.user_id)).then((res:any)=>{
                if(!res.data.errMsg){

                    let data = res.data
                    isNaN(Number(this.state.inputValue)) ? data.source = '通过搜索昵称添加' : data.source = '通过搜索账号添加'
                    isSelf = false
                    info = data
                }
                else{
                    isEmpty = true
                    console.log(res.data.errMsg)
                }
            })
        }

        function searchUserFromList(value:string | number){
            let user = {}
            friendList.map((item:any)=>{
                if(Array.isArray(item.content)){
                     item.content.map((obj:any)=>{
                        if(obj.username === value || obj.account === value){
                            user = obj
                        }
                        return user
                    })
                }
                return user
            })
            return user
        }

        if(!isEmpty){
            this.setState({
                searchUserData:info,
                isSelf,
                isShowPop:true
            })
        }
    }
    /**
     * 点击Layout盒子将搜索用户的结果数据清零，道道关闭气泡卡片的效果(需使用事件捕获)
     */
    blurPop =()=>{

        this.setState({
            isShowPop:false
        })
        //console.log('blur')
    }
    /**
     * 需判断是否是自己，若是自己则是发消息操作，反之则是显示好友申请组件
     */
    showFriendApplication = ()=>{
       if(this.state.isSelf){
           //给自己发消息
           console.log('需要完善给自己发消息操作')
       }
       else{
           this.setState({
               showFriendCom:true
           })
           this.props.Zustand.changeAcceptApply(false)
       }
    }
    cancelFriendApp =()=>{
        this.setState({
            showFriendCom:false
        })
    }
    /**
     * （接收FriendListContent组件发出的事件）点击接受按钮打开FriendApplication组件
     */
    acceptApply = (item:any)=>{
        this.setState({
            showFriendCom:true,
            acceptApplyData:item
        })
        this.props.Zustand.changeAcceptApply(true)
    }

    /**
     * 接收FriendApplication组件发出的确认添加好友的申请事件
     */
    confirmSendRequest =(formData:any)=>{
        const {isAcceptApply} = this.props.Zustand
        if(!isAcceptApply){
            const {user_id,username,account,avatar} = this.props.Zustand.customer
            const data = this.state.searchUserData

            this.props.socket.emit('sendFriendRequest',{
                formData,
                sender:{ SUN:user_id, SUA:username, SA:account,SAV:avatar },
                receiver:{RUN:data.user_id,RUA:data.username,RA:data.account},
                applyTime:new Date().getTime(),
                source:data.source
            })

        }
        else{
            let data = this.state.acceptApplyData
            data.sender.formData = formData
            this.props.socket.emit('acceptApply',data)
        }
        this.setState({
            showFriendCom:false
        })
    }
    /**
     * 接收FriendList组件发出的事件
     * @param type
     * @param title
     * @param index
     * @param id
     */
    showListContent=(type:string,title:string,index:number,id:number)=>{
        //修改激活项索引
        this.props.Zustand.changeIndexInfo(type,title,index,id)
    }

    render(){
        const { Sider,Content } = Layout
        const { menu,otherMenu,searchRightComponent,inputProp,inputRef,placeholder,isShowFriendBtn,inputValue,searchUserData,showFriendCom,isSelf,isShowPop } = this.state
        const { listId,customer,friendListInfo} = this.props.Zustand
        const { contextHolder } = this.props.Message

        return <Fragment>
            <Layout onClickCapture={this.blurPop}>
                {contextHolder}
                {/*侧边栏*/}
                <Sider width={'70px'}>
                    <SiderMenu menu = {menu} otherMenu= {otherMenu} userInfo={customer} changeMenuContent={this.changeMenu}></SiderMenu>
                </Sider>
                {/*中部搜索框及各个菜单项详情列表*/}
                <div className={'middle-com'}>
                    <Space direction={'horizontal'} style={{width:'100%'}} className={'space-self'}>
                        <Input ref={inputRef} value={inputValue} style={{backgroundColor:'var(--gray-color)'}} onBlur={this.inputBlur} onChange={this.inputChange} suffix={inputProp} onFocus={this.inputFocus} prefix={isShowFriendBtn ? <UserSwitchOutlined /> : <SearchOutlined />} placeholder={placeholder}></Input>
                        {isShowFriendBtn ? <Button className={'cancel-btn'} onClick={this.closeAddFriendBtn}>取消</Button> : <Button style={{backgroundColor:'var(--gray-color)'}} icon={searchRightComponent}></Button>}
                    </Space>
                    { isShowPop ? <PopoverCommon btnClick={this.showFriendApplication} customer={searchUserData} arrow={false} open={!!searchUserData} btnTitle={isSelf ? '发消息' : '添加到通讯录'}></PopoverCommon>:null}

                    <div className={'middle-list'}>
                        {this.state.menuList[this.state.currentMenu]}
                        {
                            // 搜索添加朋友页
                            isShowFriendBtn ? <div className={'friend-search-result'}>
                                <Divider style={{margin: '0'}}></Divider>
                                {
                                    inputValue ? <div className={'search-item'}>
                                        <div className={'avatar-box'}>
                                            <SearchOutlined style={{display:'flex',justifyContent:'center',alignItems:'center',width:"25px",height:'25px',lineHeight:'25px',color:'var(--white-color)',fontSize:'20px'}} />
                                        </div>
                                        <div className={'item-search'} onClick={this.searchUsers}>
                                            <div className={'value-box'}>
                                                <span style={{width:'42px'}}>搜索：</span>
                                                <span className={'search-value'}>{inputValue}</span>
                                            </div>
                                            <RightOutlined style={{color:'var(--deep-gray-color)'}} />
                                        </div>
                                    </div> : null
                                }
                            </div> : null
                        }
                    </div>
                </div>
                <Content className={'index-content'}>
                    {listId !== undefined || friendListInfo?.index !== undefined  ? this.state.listContent[this.state.currentMenu] : null}
                    {/*{friendListIndexAc !== undefined ? this.state.listContent[this.state.currentMenu] : null}*/}
                </Content>
                {showFriendCom ? <FriendApplication confirm={this.confirmSendRequest} cancel={this.cancelFriendApp}></FriendApplication> : null}
            </Layout>
        </Fragment>
    }

    componentDidMount() {
        //处理聊天列表与聊天记录的时间（待完善）
        this.props.Zustand.changeStorageTime()

        const user = this.props.Zustand.customer
        this.props.socket.emit('online',{
            name:user.username,
            account:user.account,
            user_id:user.user_id
        })
        this.props.socket.on('reciever',(data:any)=>{
            const {friendList} = data
            this.props.Zustand.changeFriendList(friendList,true)
        })

        this.props.socket.on('receiveMessage',(data:any)=>{

            this.props.Zustand.changeChatList({
                userId:data.userId,
                user:data.sender,
                type:'msg',
                msg:data.msg,
                avatar:data.avatar,
                time:data.sendTime,
                isMute:true,
                hasBeenRead:false,
                isGroupChat:false
            },data.userId,true)
        })
        /**
         * 好友请求已发送给对方
         */
        this.props.socket.on('sendRequestSuccess',()=>{

            this.props.Message.messageApi.open({
                type: 'success',
                content: '好友请求已发送',
            })
        })

        /**
         * 收到好友请求
         */
        this.props.socket.on('receiveFriendRequest',(data:any)=>{
            this.props.Zustand.changeFriendRequest(data)

        })

        /**
         * 已同意对方的好友申请，将对方的信息添加到你的好友列表中，并删除对应的申请列表项
         */
        this.props.socket.on('hadAcceptApply',(info:any)=>{
            this.props.Message.messageApi.open({
                type: 'success',
                content: '接受该好友申请成功',
            })

            this.props.Zustand.changeFriendRequest(info,'shift')
        })

        /**
         * 好友已经同意您的申请，将好友的信息添加到你的好友列表中
         */
        this.props.socket.on('friendHadAcceptApply',(info:any)=>{

            this.props.Zustand.changeFriendRequest(info,'shift')
        })

        if(!this.props.Zustand.chatList.length){
            this.props.Zustand.changeChatList({
                userId: this.props.Zustand.customer.user_id,
                type: 'self',
                msg: '',
                user: '文件传输助手',
                time: new Date().getTime(),
                hasBeenRead: true,
                isGroupChat: false,
                avatar:'',
            } as unknown as MsgDataType)
        }

        document.addEventListener('sendMsg',(event:any)=>{
            //点击发消息，1.选择聊天菜单项、2.查看聊天列表中是否有与该该好友的通讯记录，有就直接激活与该好友的聊天状态，没有就添加一个聊天记录项
            this.changeMenu(0,'menu')
            const list = this.props.Zustand.chatList
            const {user_id,username,avatar} = event.detail.data
            let isInclude = false
            let data = {
                userId:user_id,
                msg: '',
                user: username,
                time: new Date().getTime(),
                hasBeenRead: true,
                isGroupChat: false,
                avatar,
            } as unknown as MsgDataType

            list.map((item:any)=>{
               if(item.userId === user_id){
                   isInclude = true
               }
            })
            if(!isInclude){
                this.props.Zustand.changeChatList(data)
            }

            this.chatWithSender(data,user_id)
        })

    }

    componentWillUnmount() {
        document.removeEventListener('sendMsg',()=>{})
    }
}

export default WithHook(Home)