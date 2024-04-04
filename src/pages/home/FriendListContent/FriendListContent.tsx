import {Layout, List, Avatar, Button, Empty} from "antd";
import {useMessageStore} from "../../../zustand/store";
import './friendListContent.sass'
import withHook from "../../../hook/withHook";
import PopoverCommon from "../../../components/Common/PopoverCommon/PopoverCommon";
import {isMobile} from "../../../util/util";
import NavBar from "../../../components/Common/NavBar/NavBar";
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

    return <Layout className={isMobile ? 'mobile-content-con' : 'content-con'}>
        {isMobile ? <NavBar back more title={type ? title : undefined} emptyTitle={!type}></NavBar> : null}
        {
            type && !isMobile ? <Header className={'user-box'}>
                <span className={'receiver-title'}>{title}</span>
            </Header> : null
        }
        <Content className={isMobile ? 'fl-content' : type ? 'content-normal' : 'content-center'}>
            {type === 'new' ? <List className={'friend-list-request'}
                                    dataSource={friendRequest[user_id]}
                                    locale={{emptyText:<Empty description={<span style={{color:'var(--deep-gray-color)',fontSize:'var(--mini-font-size)'}}>暂无好友申请</span>}></Empty>}}
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