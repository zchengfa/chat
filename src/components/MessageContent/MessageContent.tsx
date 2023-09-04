
import './messageContent.sass'
import {useEffect,useState} from "react";


export default function MessageContent (props:any) {



    const msgData = props.msgData

    useEffect(()=>{

        const el = document.getElementsByClassName('msg-li').item(msgData.length -1)
        el?.scrollIntoView({behavior:'smooth'})
        console.log(el)

    },[msgData])

    const msgMouseEnter = (direction:boolean,index:number)=>{
        props.changeBgColor(1,direction,index)

    }
    const msgMouseleave = (direction:boolean,index:number)=>{
        props.changeBgColor(0,direction,index)

    }

    const msgBox = (direction:boolean,item:any,index:number)=>{

        return  <div className={direction ? "message-item-left-box message-item-box" : "message-item-right-box message-item-box"}>
            <div className={'msg-avatar-box'}>
                <img className={'msg-avatar'} src={item.avatar} alt="avatar"/>
                <div className={'angle'} style={direction ? {borderRightColor: item.bgColor} : {borderLeftColor: item.bgColor}}></div>
            </div>
            <div className={item.img ? 'msg-img-box' : 'msg-box'} onMouseEnter={()=> msgMouseEnter(direction,index)} onMouseLeave={()=> msgMouseleave(direction,index)} style={direction ? {backgroundColor: item.bgColor} : {backgroundColor: item.bgColor}}>
                {item.img ? <img className={'msg-image'} src={item.img} alt="msg_image"/> : <span className={'msg'}>{item.msg}</span>}
            </div>
        </div>
    }


    return <div className={'message-content'}>
        <ul className={'msg-ul'}>
            {
                msgData.map((item:any,index:number)=>{

                    return <li className={'msg-li'} key={index}>
                        {item.timeout ? <div className={'timeout'}><span className={'timeout-span'}>{item.timeout}</span></div> : null}
                        {item.isLeft ? msgBox(true,item,index) : msgBox(false,item,index)}
                    </li>
                })
            }

        </ul>
    </div>
}