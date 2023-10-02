import {List, Avatar, Button, Badge} from "antd";
import { UsergroupDeleteOutlined } from '@ant-design/icons'
import './friendList.sass'
import withHook from "../../hook/withHook";

function FriendList (props:any){
    const friendRequestCount = props.Zustand.friendRequest.length
    const friendListInfo = props.Zustand.friendListInfo
    const list = props.Zustand.friendList

    const showListContent = (type:string,title:string,index:number,id:number)=>{
        props.showListContent(type,title,index,id)
    }

    const itemElement = (item:any,index:number)=>{
        return <div key={index} className={ index === friendListInfo?.index && item.user_id === friendListInfo?.user_id ? 'avatar-username actived' : 'avatar-username'} onClick={()=> showListContent(item.type,item.username,index,item.user_id)}>
            {item.type && item.type!=='btn' ? <Badge count={item.type === 'new' && !friendListInfo?.hasBeenRead ?friendRequestCount : 0} overflowCount={99} size={'small'}>
                <div style={item.type === 'new' ?{backgroundColor:'var(--orange-color)'} :{backgroundColor:'var(--blue-color)'}} className={'avatar type-avatar'}>{item.avatar}</div>
            </Badge>: <Avatar className={'avatar'} src={item.avatar}></Avatar>
            }
            <span className={'username'}>{item.username}</span>
        </div>
    }

    return <List className={'friend-list'} itemLayout={'vertical'}
        dataSource={list}
        renderItem={(item:any,index:number)=>{
            if(item.type === 'btn'){
                return <List.Item className={'list-item list-btn-item'}><Button icon={<UsergroupDeleteOutlined />} className={'friend-manage'} size={'large'}>{item.username}</Button></List.Item>
            }
            else{
               return <List.Item className={'list-item'}>
                    <h6 className={'item-title'}>{item.title}</h6>
                   {
                       item.content ? item.content.map((i:any,itemIn:number)=>{
                           return itemElement(i,itemIn)
                       }) : itemElement(item,index)
                   }
                </List.Item>
            }

        }}
    >
    </List>
}

export default withHook(FriendList)