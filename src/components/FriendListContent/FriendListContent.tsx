import {Layout,List,Avatar,Button} from "antd";
import {useMessageStore} from "../../zustand/store";
import './friendListContent.sass'
import withHook from "../../hook/withHook";
function FriendListContent(props:any){
    const { Header,Content } = Layout
    const {title} = useMessageStore((state:any)=> state.friendListInfo)
    const friendRequest = useMessageStore((state:any)=> state.friendRequest)

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
        <Header className={'user-box'}>
            <span className={'receiver-title'}>{title}</span>
        </Header>
        <Content>
            <List className={'friend-list-request'}
                dataSource={friendRequest}
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
            ></List>
        </Content>
    </Layout>
}

export default withHook(FriendListContent)