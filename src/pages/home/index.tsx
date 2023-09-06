import WithHook from "../../hook/withHook";
import {Component,Fragment} from "react";
import SiderMenu from "../../components/SiderMenu/SiderMenu";
import ChatList from "../../components/ChatList/ChatList";
import ChatContent from "../../components/ChatContent/ChatContent";
import {Layout,Space,Input,Button} from "antd";
import {menu, MenuType, otherMenu, correctIconComponent, MsgDataType} from "../../common/staticData/data";
import './index.sass'
import { SearchOutlined,CloseCircleOutlined } from '@ant-design/icons'

class Home extends Component<any, any>{

    constructor(props:any) {
        super(props);
        this.state = {
            menu,
            otherMenu,
            nameArr:[],
            searchRightComponent:correctIconComponent[0].component(),
            inputProp:undefined,
            inputRef:this.props.Refs,
            placeholder:'搜索',
            currentMenu:'聊天',
            menuList:{
                '聊天':<ChatList chatWithSender={this.chatWithSender}></ChatList>
            },
            listContent:{
                '聊天':<ChatContent></ChatContent>
            }
        }
    }
    showListContent = ()=>{
        switch (this.state.currentMenu) {
            case '聊天':
                return <ChatContent></ChatContent>
            default:
                return true
        }
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
            nameArr:this.state.nameArr
        })

        try {
           if(menuName === 'menu'){
               this.setState({
                   searchRightComponent:correctIconComponent[childIndex].component()
               })
           }
        }catch (e){}

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
           inputProp:<CloseCircleOutlined onClick={(event)=> this.closeInputStatus(event,this.state.inputRef)}/>
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

    }
    /**
     * 失去焦点后触发
     */
    inputBlur = ()=>{

        this.setState({
            placeholder:'搜索',
            inputProp:null
        })
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
        const { menu,otherMenu,searchRightComponent,inputProp,inputRef,placeholder } = this.state
        const { listId } = this.props.Zustand

        return <Fragment>
            <Layout>
                {/*侧边栏*/}
                <Sider width={'70px'}>
                    <SiderMenu menu = {menu} otherMenu= {otherMenu} changeMenuContent={this.changeMenu}></SiderMenu>
                </Sider>
                {/*中部搜索框及各个菜单项详情列表*/}
                <div className={'middle-com'}>
                    <Space direction={'horizontal'} style={{width:'100%'}} className={'space-self'}>
                        <Input ref={inputRef}  style={{backgroundColor:'var(--gray-color)'}} onBlur={this.inputBlur} suffix={inputProp} onFocus={this.inputFocus} prefix={<SearchOutlined />} placeholder={placeholder}></Input>
                        <Button style={{backgroundColor:'var(--gray-color)'}} icon={searchRightComponent}></Button>
                    </Space>
                    <div className={'middle-list'}>
                        {this.state.menuList[this.state.currentMenu]}
                    </div>
                </div>
                <Content className={'index-content'}>
                    {listId !== undefined ? this.state.listContent[this.state.currentMenu] : null}
                </Content>
            </Layout>
        </Fragment>
    }


}

export default WithHook(Home)