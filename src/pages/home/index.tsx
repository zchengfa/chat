import WithHook from "../../hook/withHook";
import {Component,Fragment} from "react";
import SiderMenu from "../../components/SiderMenu/SiderMenu";
import ChatList from "../../components/ChatList/ChatList";
import ChatContent from "../../components/ChatContent/ChatContent";
import FriendList from "../../components/FriendList/FriendList";
import {Layout, Space, Input, Button, Divider} from "antd";
import {menu, MenuType, otherMenu, correctIconComponent, MsgDataType} from "../../common/staticData/data";
import './index.sass'
import { SearchOutlined,CloseCircleOutlined,UserSwitchOutlined,RightOutlined } from '@ant-design/icons'

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
                "通讯录":<FriendList list={props.Zustand.friendList}></FriendList>
            },
            listContent:{
                '聊天':<ChatContent></ChatContent>
            }
        }
    }
    // showListContent = ()=>{
    //     switch (this.state.currentMenu) {
    //         case '聊天':
    //             return <ChatContent></ChatContent>
    //         default:
    //             return true
    //     }
    // }
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
            inputProp:null
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

    render(){
        const { Sider,Content } = Layout
        const { menu,otherMenu,searchRightComponent,inputProp,inputRef,placeholder,isShowFriendBtn,inputValue } = this.state
        const { listId,customer } = this.props.Zustand

        return <Fragment>
            <Layout>
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
                                        <div className={'item-search'}>
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
                    {listId !== undefined ? this.state.listContent[this.state.currentMenu] : null}
                </Content>
            </Layout>
        </Fragment>
    }

    componentDidMount() {

        this.props.socket.emit('online',this.props.Zustand.customer.username)

    }


}

export default WithHook(Home)