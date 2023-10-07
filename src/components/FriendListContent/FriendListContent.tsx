import {Layout,List,Avatar,Button} from "antd";
import {useMessageStore} from "../../zustand/store";
import './friendListContent.sass'
import withHook from "../../hook/withHook";
import PopoverCommon from "../Common/PopoverCommon/PopoverCommon";
function FriendListContent(props:any){
    const { Header,Content } = Layout
    const {title,type} = useMessageStore((state:any)=> state.friendListInfo)
    const friendRequest = useMessageStore((state:any)=> state.friendRequest)
    const {user_id} = props.Zustand.customer
    const friendData = props.Zustand.friendData

    const acceptApply = (item:any)=>{

        const data = {
            receiver:{
                formData:item.formData,
                info:{
                    username:item.sender.SUA,
                    user_id:item.sender.SUN
                }
            },
            source:item.source,
            sender:{
                info:item.receiver
            }
        }

        props.acceptApply(data)
    }


    return <Layout className={'content-con'}>
        {
            type ? <Header className={'user-box'}>
                <span className={'receiver-title'}>{title}</span>
            </Header> : null
        }
        <Content className={type ? 'content-normal' : 'content-center'}>
            {type === 'new' ? <List className={'friend-list-request'}
                                    dataSource={friendRequest[user_id]}
                                    renderItem={(item:any)=>{
                                        return <List.Item>
                                            <div className={'list-item'}>
                                                <Avatar className={'request-avatar'} src={item.sender.SAV}></Avatar>
                                                <div className={'name-msg'}>
                                                    <span>{item.sender.SUA}</span>
                                                    <span className={'msg'}>{item.formData.sender}</span>
                                                </div>
                                                { item.isExpired ? <Button size={'small'} disabled={true}>已过期</Button> : <Button size={'small'} onClick={()=> acceptApply(item)} className={'accept-btn'}>接受</Button> }
                                            </div>
                                        </List.Item>
                                    }}
            ></List> : null}

            {type === 'common' ? <div>公众号</div> : null}
            {
                type === undefined ? <div className={'friend-data'}>
                    <PopoverCommon customer={friendData} isPopover={false}></PopoverCommon>
                </div> : null
            }
        </Content>
    </Layout>
}

export default withHook(FriendListContent)