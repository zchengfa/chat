import {Button, Divider, Image, Popover, Upload,message} from "antd";
import './popoverCommon.sass'
import { operationsData } from "../../../common/staticData/data";
import {baseURL} from "../../../network/network";
import {RcFile} from "antd/es/upload";
import {useMessageStore} from "../../../zustand/store";
import {useState} from "react";

export default function PopoverCommon(props:any){
    const {customer,children,open,placement} = props
    const [messageApi,contextHolder] = message.useMessage()
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

    const {setUserInfo} = useMessageStore((state:any)=> state)

    const [fileList,setFileList] = useState([])


    const beforeUpload =(file:RcFile)=>{
        let isLimit = file.size/1024/1024 <2
        if(!isLimit){
            messageApi.open({
                type:'error',
                content:'上传的头像不可超过2M'
            })
        }

        return isLimit
    }

    const uploadChange = (e:any)=>{
        if(e.file.xhr){
            console.log(e.file.xhr)
            let {avatar,err} = JSON.parse(e.file.xhr.response)
            if(avatar){
                customer.avatar = avatar
                setUserInfo(customer)
            }
            if(err){
                messageApi.open({
                    type:'error',
                    content:err
                })
            }
        }
    }

    const addNotes = ()=>{
        alert('该功能待完善')
    }

    const content = (
        <div className={Object.keys(customer).length ? 'popover-box' : 'box-none'}>
            {contextHolder}
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
                    </div> : <Upload defaultFileList={fileList} action={baseURL + '/uploadAvatar?user_id=' + customer.user_id + '&username=' + customer.username} onChange={uploadChange} beforeUpload={beforeUpload} maxCount={1} name={'avatar'} accept={"image/png, image/jpeg"}><Button className={'btn'}>{props.btnTitle}</Button></Upload>
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