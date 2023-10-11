import { Component } from "react";
import withHook from "../../hook/withHook";
import './messageContent.sass'
import {List, Spin} from "antd";
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
        }
    }

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
                {item.img ? <img className={'msg-image'} src={item.img} alt="msg_image"/> : <span className={'msg'}>{utf16ToEmoji(item.msg)}</span>}
            </div>
        </div>
    }

    loadMore = ()=>{
        if (this.state.loading) {
            return;
        }
        this.setState({
            loading:true,
            hasMore:false
        })

    }

    render(){
        // const { msgData,listId} = this.props.Zustand
        // const currentMsgData = msgData[listId]

        const {data,hasMore} = this.state

        return <div className={'message-content'}>
           <div className={data.length > 8 ? 'msg-ul ul-reverse' : 'msg-ul'} id={'infiniteBox'}>
               <InfiniteScroll inverse={true} next={this.loadMore}
                               hasMore={hasMore}
                               loader={<Spin indicator={<LoadingOutlined />} />}
                               dataLength={data.length}
                               scrollableTarget={'infiniteBox'}
                               style={{ display: 'flex', flexDirection: 'column-reverse' }}
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
    componentDidMount() {
        const {msgData,listId } = this.props.Zustand

        this.setState({
            page:(msgData[listId].length)%(this.state.count) === 0 ? Math.floor(msgData[listId].length/this.state.count) :  Math.ceil((msgData[listId].length/this.state.count))
        })
        this.props.setEmptyDiv()
        this.loadMore()

    }
}

export default withHook(MessageContent)