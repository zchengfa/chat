import { Component } from "react";
import './siderMenu.sass'

export default class SiderMenu extends Component<any, any>{
    constructor(props:any) {
        super(props);
        this.state = {

        }
    }
    render(){
        return <div className={'side'}>侧边菜单</div>
    }
}