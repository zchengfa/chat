import WithHook from "../../hook/withHook";
import {Component,Fragment} from "react";
import SiderMenu from "../../components/SiderMenu/SiderMenu";
import {Layout} from "antd";

class Home extends Component<any, any>{

    toLogin = ()=> {
        const { navigate } = this.props.router
        navigate('/login')
    }
    addMsg = ()=>{
        this.props.Zustand.changeMsg()
    }

    render(){
        const { message } = this.props.Zustand

        const { Sider } = Layout
        // return <div>
        //     {/*<button  onClick={this.toLogin}>登录</button>*/}
        //     {/*<button  onClick={this.addMsg}>增加</button>*/}
        //     {/*<span>{message}</span>*/}
        // </div>

        return <Fragment>
            <Layout>
                <Sider width={'60px'}>
                    <SiderMenu></SiderMenu>
                </Sider>
            </Layout>
        </Fragment>
    }


}

export default WithHook(Home)