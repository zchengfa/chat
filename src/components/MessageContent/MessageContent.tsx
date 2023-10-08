import { Component } from "react";
import withHook from "../../hook/withHook";
import './messageContent.sass'

class MessageContent extends Component<any,any> {

    msgMouseEnter = (direction:boolean,index:number)=>{
        this.props.changeBgColor(1,direction,index)

    }
    msgMouseleave = (direction:boolean,index:number)=>{
        this.props.changeBgColor(0,direction,index)

    }
    msgBox = (direction:boolean,item:any,index:number)=>{

        return  <div className={direction ? "message-item-left-box message-item-box" : "message-item-right-box message-item-box"}>
            <div className={'msg-avatar-box'}>
                <img className={'msg-avatar'} src={item.avatar} alt="avatar"/>
                <div className={'angle'} style={direction ? {borderRightColor: item.bgColor} : {borderLeftColor: item.bgColor}}></div>
            </div>
            <div className={item.img ? 'msg-img-box' : 'msg-box'} onMouseEnter={()=> this.msgMouseEnter(direction,index)} onMouseLeave={()=> this.msgMouseleave(direction,index)} style={direction ? {backgroundColor: item.bgColor} : {backgroundColor: item.bgColor}}>
                {item.img ? <img className={'msg-image'} src={item.img} alt="msg_image"/> : <span className={'msg'}>{item.msg}</span>}
            </div>
        </div>
    }

    render(){
        const { msgData,listId } = this.props.Zustand
        const currentMsgData = msgData[listId]

        return <div className={'message-content'}>
            <ul className={'msg-ul'}>
                {
                    currentMsgData?.map((item:any,index:number)=>{

                        return item.msg?.length ? <li className={'msg-li'} key={index}>
                            {
                                Object.keys(item).length ? (item.isLeft ? this.msgBox(true,item,index) : this.msgBox(false,item,index)) : null
                            }

                        </li> : <li className={'msg-li'} key={index}>
                            {item.timeout ? <div className={'timeout'}><span className={'timeout-span'}>{item.timeout}</span></div> : null}
                        </li>
                    })
                }
            </ul>
        </div>
    }

    componentDidMount() {
        this.props.setEmptyDiv()
    }
}

export default withHook(MessageContent)