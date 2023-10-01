import {Button, Divider, Image, Popover} from "antd";
import './popoverCommon.sass'
import { operationsData } from "../../../common/staticData/data";

export default function PopoverCommon(props:any){
    const {customer,children,open,placement} = props
    const btnList = [
        {
            title:'发消息',
            component:operationsData['operations'][3].component()
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

    const content = (
        <div className={'popover-box'}>
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
                            <span id={'notes'}>{customer.notes}</span>
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
                                    return <div className={'list-item'} key={index}>
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

    return <Popover arrow={props.arrow} content={content} open={open} placement={placement} trigger={'click'}>
        {children}
    </Popover>
}