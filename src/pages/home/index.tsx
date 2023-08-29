import WithHook from "../../hook/withHook";
import {Component,Fragment} from "react";
import SiderMenu from "../../components/SiderMenu/SiderMenu";
import {Layout} from "antd";
import { menu,menuType,otherMenu } from "../../common/staticData/data";


class Home extends Component<any, any>{

    constructor(props:any) {
        super(props);
        this.state = {
            menu,
            otherMenu,
            nameArr:[]
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

        //this.state.nameArr.map((i:any)=> this.state[i].map((item:any)=> item.isActived = false))

        m.map((item:menuType,index:number)=>{
            return index === childIndex ? item.isActived = true : item.isActived = false
        })

        this.setState({
            ...this.state.nameArr
        })

    }
    render(){
        const { Sider } = Layout

        return <Fragment>
            <Layout>
                <Sider width={'70px'}>
                    <SiderMenu menu = {this.state.menu} otherMenu= {this.state.otherMenu} changeMenuContent={this.changeMenu}></SiderMenu>
                </Sider>
            </Layout>
        </Fragment>
    }


}

export default WithHook(Home)