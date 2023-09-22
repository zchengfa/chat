import {List, Avatar, Button, Badge} from "antd";
import { UsergroupDeleteOutlined } from '@ant-design/icons'
import './friendList.sass'

export default function FriendList (props:any){
    return <List className={'friend-list'} itemLayout={'vertical'}
        dataSource={props.list}
        renderItem={(item:any)=>{
            if(item.type === 'btn'){
                return <List.Item className={'list-item list-btn-item'}><Button icon={<UsergroupDeleteOutlined />} className={'friend-manage'} size={'large'}>{item.username}</Button></List.Item>
            }
            else{
               return <List.Item className={'list-item'}>
                    <h6 className={'item-title'}>{item.title}</h6>
                    <div className={'avatar-username'}>
                        {item.type && item.type!=='btn' ? <Badge count={9} overflowCount={99} size={'small'}>
                            <div style={item.type === 'new' ?{backgroundColor:'var(--orange-color)'} :{backgroundColor:'var(--blue-color)'}} className={'avatar type-avatar'}>{item.avatar}</div>
                        </Badge>: <Avatar className={'avatar'} src={item.avatar}></Avatar>
                        }
                        <span className={'username'}>{item.username}</span>
                    </div>
                </List.Item>
            }

        }}
    >
    </List>
}