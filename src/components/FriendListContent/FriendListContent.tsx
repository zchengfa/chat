import {Layout,List,Avatar,Button} from "antd";
import {useMessageStore} from "../../zustand/store";
import './friendListContent.sass'
export default function FriendListContent(props:any){
    const { Header,Content } = Layout
    const {title} = useMessageStore((state:any)=> state.friendListInfo)
    const friendRequest = useMessageStore((state:any)=> state.friendRequest)

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
                            <Button size={'small'} className={'accept-btn'}>接受</Button>
                        </div>
                    </List.Item>
                }}
            ></List>
        </Content>
    </Layout>
}