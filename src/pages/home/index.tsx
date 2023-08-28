import WithHook from "../../hook/withHook";
import {Component} from "react";


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
        return <div>
            <button  onClick={this.toLogin}>登录</button>
            <button  onClick={this.addMsg}>增加</button>
            <span>{message}</span>
        </div>
    }


}

export default WithHook(Home)