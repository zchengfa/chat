import { Component } from "react";
import withHook from "../../hook/withHook";
import './messageContent.sass'
import {List, Spin,Skeleton,Divider,Avatar} from "antd";
import { LoadingOutlined } from '@ant-design/icons'
import InfiniteScroll from "react-infinite-scroll-component";
import {utf16ToEmoji} from "../../util/util";


class MessageContent extends Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            count:15,
            page:0,
            loading:false,
            data:this.props.Zustand.msgData[this.props.Zustand.listId],
            hasMore:true,
            currentData:this.props.Zustand.msgData[this.props.Zustand.listId].slice(this.props.Zustand.msgData[this.props.Zustand.listId].length-15,this.props.Zustand.msgData[this.props.Zustand.listId].length)
        }
    }

    msgMouseEvent = (isEnter:boolean,direction:boolean,index:number)=>{
        let { currentData } = this.state

        currentData.map((item:any,i:number)=>{
            if(i === index){
                if(direction){
                    isEnter ? item.bgColor = 'var(--gray-color)' : item.bgColor = 'var(--white-color)'
                }
                else{
                    !isEnter ? item.bgColor = 'var(--success-font-color)' : item.bgColor = 'var(--deep-green-color)'
                }
            }
            return true
        })

        this.setState({
            currentData
        })
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
        this.setState({
            loading:true
        })

        let timer = setTimeout(()=>{
            this.setState({
                loading:false
            })
        },3000)
        console.log('loading')
    }

    render(){
        // const { msgData,listId} = this.props.Zustand
        // const currentMsgData = msgData[listId]

        const {data,currentData,loading} = this.state

        return <div className={'message-content'}>
           <div className={'msg-ul'}>
               <InfiniteScroll
                   inverse={true}
                   next={this.loadMore}
                   hasMore={currentData.length < data.length}
                   loader={<Spin indicator={<LoadingOutlined/>} spinning={loading} />}
                   dataLength={currentData.length}
                   height={'54vh'}
                   style={data.length > 8 ? { display: 'flex', flexDirection: 'column-reverse' }:{}}
               >
                   <List
                       className={'msg-list'}
                       dataSource={currentData}
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