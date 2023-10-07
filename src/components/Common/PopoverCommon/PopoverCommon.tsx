import {Button, Divider, Image, Popover} from "antd";
import './popoverCommon.sass'
import { operationsData } from "../../../common/staticData/data";

export default function PopoverCommon(props:any){
    const {customer,children,open,placement} = props
    const btnList = [
        {
            title:'发消息',
            component:operationsData['operations'][3].component(),
            click:()=> {
                document.dispatchEvent(new CustomEvent('sendMsg',{'detail':{
                    data:{
                        username:customer.username,
                        avatar:customer.avatar,
                        user_id:customer.user_id
                    }
                }}))
            }
        },
        {
            title:'语音聊天',
            component:operationsData['chatWay'][0].component()
        },
        {
            title:'视频聊天',
            component:operationsData['chatWay'][1].component()
        }
    ]

    const btnClick = ()=>{
        props.btnClick()
    }

    const addNotes = ()=>{
        alert('该功能待完善')
    }

    const content = (
        <div className={Object.keys(customer).length ? 'popover-box' : 'box-none'}>
            <div className={'box-top'}>
                <Image className={'avatar'} src={customer.avatar} preview={false}></Image>
                <div className={'user-info'}>
                    <span className={'username'}>{customer.username}</span>
                    {customer.user_id ? <span className={'ID'}>ID：{customer.user_id}</span> : null}
                </div>
            </div>
            <Divider></Divider>
            <div className={'box-bottom'}>
                {
                    customer.isFriend ? <div className={'user-other'}>
                        <div className={'notes-box item-box'}>
                            <label htmlFor="notes" className={'label'}>备注</label>
                            {customer.notes !== 'null' ? <span id={'notes'}>{customer.notes}</span> : <span onClick={addNotes} style={{color:'var(--deep-gray-color)'}}>点击添加备注</span>}
                        </div>
                        <Divider></Divider>
                        <div className={'source-box item-box'}>
                            <label htmlFor="source" className={'label'}>来源</label>
                            <span id={'source'}>{customer.source}</span>
                        </div>
                        <Divider></Divider>
                        <div className={'btn-list item-box'}>
                            {
                                btnList.map((item:any,index:number)=>{
                                    return <div className={'list-item'} key={index} onClick={item.click}>
                                        {item.component}
                                        <span className={'btn-span'}>{item.title}</span>
                                    </div>
                                })
                            }
                        </div>
                    </div> : <Button className={'btn'} onClickCapture={btnClick}>{props.btnTitle}</Button>
                }
            </div>
        </div>
    )

    return props.isPopover ? <Popover arrow={props.arrow} content={content} open={open} placement={placement} trigger={'click'}>
        {children}
    </Popover> : content
}

PopoverCommon.defaultProps={
    isPopover:true
}