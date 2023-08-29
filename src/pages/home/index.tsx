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
    changeMenu = (childIndex:any,menuName:string)=>{
        const m:menuType[] = this.state[menuName]


        if(this.state.nameArr.indexOf(menuName) === -1 ){
            this.state.nameArr.push(menuName)
        }

       // if(this.state.nameArr.length >= 2){
       //     const arr = this.state.nameArr
       //     arr.splice(this.state.nameArr.indexOf(menuName),1)
       //     console.log(arr)
       // }
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