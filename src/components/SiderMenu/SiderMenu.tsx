import { Component } from "react";
import './siderMenu.sass'
import {Avatar,Image} from "antd";
import { UserOutlined } from '@ant-design/icons'
import { MenuType} from "../../common/staticData/data";
import withHook from "../../hook/withHook";
import PopoverCommon from "../Common/PopoverCommon/PopoverCommon";

class SiderMenu extends Component<any, any>{
    changeMenuContent = (index:number,menuName:string)=>{
        this.props.changeMenuContent(index,menuName)
    }

    menuHtml = (htmlProps:any)=> <div className={'data-item'} key={htmlProps.index} onClick={() => this.changeMenuContent(htmlProps.index,htmlProps.menuName)}>
      <img className={'menu-img'} src={htmlProps.image} alt="menu_img" title={htmlProps.title}/>
      {htmlProps.hasPop ? htmlProps.pop() : undefined}
    </div>

    correctMenuHtml = (data:MenuType[],menuName:string)=> {
      return data.map((item:any,index:number) => {
        let htmlProps = {index,image:item.image,title:item.title,menuName,hasPop:item.hasPop,pop:item.pop}
        if (item.isActived && item.imageAc) {
          htmlProps.image = item.imageAc
        }
        return this.menuHtml(htmlProps)
      })
    }

    btnClick =()=>{
        console.log('给自己发消息')
    }

    render(){

      const {customer} = this.props.Zustand

      return <div className={'side'}>
        {this.props.userInfo ? <PopoverCommon isSelf={true} btnClick={this.btnClick} btnTitle={'更换头像'} placement={'rightBottom'} children={<Image className={'avatar'} src={customer.avatar} preview={false}></Image>} customer={customer}></PopoverCommon>  : <Avatar className={'avatar'} size={64} icon={<UserOutlined />}></Avatar>}
        <div className={'side-top'}>{this.correctMenuHtml(this.props.menu,'menu')}</div>
        <div className={'side-bottom'}>{this.correctMenuHtml(this.props.otherMenu,'otherMenu')}</div>
      </div>
    }
}

export default withHook(SiderMenu)