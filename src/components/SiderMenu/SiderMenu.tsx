import { Component } from "react";
import './siderMenu.sass'
import {Avatar} from "antd";
import { UserOutlined } from '@ant-design/icons'
import { menuType} from "../../common/staticData/data";

export default class SiderMenu extends Component<any, any>{
    constructor(props:any) {
        super(props);
        this.state = {

        }
    }
    changeMenuContent = (index:number,menuName:string)=>{
        this.props.changeMenuContent(index,menuName)
    }

    menuHtml = (htmlProps:any)=> <div className={'data-item'} key={htmlProps.index} onClick={() => this.changeMenuContent(htmlProps.index,htmlProps.menuName)}>
      <img className={'menu-img'} src={htmlProps.image} alt="menu_img" title={htmlProps.title}/>
    </div>

    correctMenuHtml = (data:menuType[],menuName:string)=> {
      return data.map((item:any,index:number) => {
        if(item.isActived){
          return this.menuHtml({index,image:item.imageAc,title:item.title,menuName})
        }
        else{
          return this.menuHtml({index,image:item.image,title:item.title,menuName})
        }
      })
    }

    render(){

      return <div className={'side'}>
        <Avatar className={'avatar'} size={64} icon={<UserOutlined />}></Avatar>
        <div className={'side-top'}>{this.correctMenuHtml(this.props.menu,'menu')}</div>
        <div className={'side-bottom'}>{this.correctMenuHtml(this.props.otherMenu,'otherMenu')}</div>
      </div>
    }
}