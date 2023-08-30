import WithHook from "../../hook/withHook";
import {Component,Fragment} from "react";
import SiderMenu from "../../components/SiderMenu/SiderMenu";
import {Layout,Space,Input,Button} from "antd";
import { menu,menuType,otherMenu,correctIconComponent } from "../../common/staticData/data";
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
            isInputBlur:undefined,
            inputRef:this.props.Refs
        }
    }

    /**
     * 接受SiderMenu子组件发出的点击事件
     * @param childIndex { number } 点击的项在列表中的索引
     * @param menuName { string } 列表名
     */
    changeMenu = (childIndex:number,menuName:string)=>{
        const m:menuType[] = this.state[menuName]

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

        m.map((item:menuType,index:number)=>{

            return index === childIndex ? item.isActived = true : item.isActived = false
        })

        this.setState({
            ...this.state.nameArr
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
     * 输入框聚焦时，在输入框后面添加关闭组件
     */
    inputFocus = ()=>{

       this.setState({
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
        console.log('失去焦点')
    }
    render(){
        const { Sider } = Layout
        const { menu,otherMenu,searchRightComponent,inputProp,inputRef } = this.state

        return <Fragment>
            <Layout>
                <Sider width={'70px'}>
                    <SiderMenu menu = {menu} otherMenu= {otherMenu} changeMenuContent={this.changeMenu}></SiderMenu>
                </Sider>
                <div className={'middle-com'}>
                    <Space direction={'horizontal'} style={{width:'100%'}} className={'space-self'}>
                        <Input ref={inputRef}  style={{backgroundColor:'var(--gray-color)'}} onBlur={this.inputBlur} suffix={inputProp} onFocus={this.inputFocus} prefix={<SearchOutlined />} placeholder={'搜索'}></Input>
                        <Button style={{backgroundColor:'var(--gray-color)'}} icon={searchRightComponent}></Button>
                    </Space>
                </div>
            </Layout>
        </Fragment>
    }


}

export default WithHook(Home)