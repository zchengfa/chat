import { Component } from "react";
import './messageContent.sass'
import {List, Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons'
import InfiniteScroll from "react-infinite-scroll-component";
import {utf16ToEmoji} from "../../util/util";
import withHook from "../../hook/withHook";

class MessageContent extends Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            loading:false
        }
    }
    msgMouseEvent = (isEnter:boolean,direction:boolean,index:number)=>{
        this.props.changeBgColor(isEnter,direction,index)
    }
    msgBox = (direction:boolean,item:any,index:number)=>{

        return  <div className={direction ? "message-item-left-box message-item-box" : "message-item-right-box message-item-box"}>
            <div className={'msg-avatar-box'}>
                <img className={'msg-avatar'} src={item.avatar} alt="avatar"/>
                <div className={'angle'} style={direction ? {borderRightColor: item.bgColor} : {borderLeftColor: item.bgColor}}></div>
            </div>
            <div className={item.img ? 'msg-img-box' : 'msg-box'} onMouseEnter={()=> this.msgMouseEvent(true,direction,index)} onMouseLeave={()=> this.msgMouseEvent(false,direction,index)} style={direction ? {backgroundColor: item.bgColor} : {backgroundColor: item.bgColor}}>
                {item.img ? <img className={'msg-image'} src={item.img} alt="msg_image"/> : <span className={'msg'}>{utf16ToEmoji(item.msg)}</span>}
            </div>
        </div>
    }

    loadMore = ()=>{
        const {changeCount} = this.props.Zustand
        this.setState({
            loading:true
        })

        let timer = setTimeout(()=>{
            changeCount()
            this.setState({
                loading:false
            },()=>{

                clearTimeout(timer)
            })
        },500)
    }

    render(){
        let {data,Zustand} = this.props
        const {loading} = this.state

        data = data ? data : []

        return <div className={'message-content'}>
           <div className={'msg-ul'}>
               <InfiniteScroll
                   inverse={true}
                   next={this.loadMore}
                   hasMore={Zustand.msgData[Zustand.listId]?.length > data.length}
                   loader={<div className={'loader'}>
                       <Spin indicator={<LoadingOutlined style={{color:'var(--deep-gray-color)'}}/>} spinning={loading} />
                       <span className={'loader-msg'}>查看更多消息</span>
                   </div>}
                   dataLength={data.length}
                   height={'54vh'}
                   style={data.length > 8 ? { display: 'flex', flexDirection: 'column-reverse'}:{}}
               >
                   <List
                       className={'msg-list'}
                       dataSource={data}
                       bordered={false}
                       renderItem={(item:any,index:number)=>{

                           return item.msg?.length ? <List.Item className={'msg-li'} style={{border:'none'}} key={index}>
                               {
                                   Object.keys(item).length ? (item.isLeft ? this.msgBox(true,item,index) : this.msgBox(false,item,index)) : null
                               }

                           </List.Item> : <List.Item style={{border:'none'}}  className={'msg-li'} key={index}>
                               {item.timeout ? <div className={'timeout'}><span className={'timeout-span'}>{item.timeout}</span></div> : null}
                           </List.Item>
                       }}
                   >
                   </List>
               </InfiniteScroll>
           </div>

        </div>
    }
}

export default withHook(MessageContent)