import './friendApplication.sass'
import {Form, Input, Switch,Button} from "antd";
import {useMessageStore} from "../../zustand/store";
import { friendApplication } from "../../common/staticData/data";
import {useState} from "react";

export default function FriendApplication(props:any){
    const user = useMessageStore((state:any)=> state.customer.username)
    const [checkStatus,setCheck] = useState([1,0])

    // const [sender,setSender] = useState('我是'+user)
    const [sender,setSender] = useState('我是'+user)
    const [notes,setNotes] = useState(undefined)
    const [tags,setTags] = useState(undefined)
    const [allow,setAllow] = useState(false)
    const [look,setLook] = useState(false)

    const check = (index:number)=>{
        index ? setCheck([1,0]) :setCheck([0,1])
    }

    const confirm = ()=>{
        let formData:any = {}
        if(checkStatus[0]){
            formData.friendCircleSport = true
        }
        else if(checkStatus[1]){
            formData.onlyChat = true
        }
        if(sender){
            formData.sender = sender
        }
        if(notes){
            formData.notes = notes
        }
        if(tags){
            formData.tags = tags
        }
        formData.allow = allow
        formData.look = look

        //点击确认按钮，收集表单数据，并向父组件发送事件，且携带表单数据
        props.confirm(formData)
    }

    const change = (e:any,target:string)=>{
        let value = e.target.value
        switch (target){
            case 'sender':
                setSender(value)
                break;
            case 'notes':
                setNotes(value)
                break;
            case 'tags':
                setTags(value)
                break;
            default:
                break;
        }
    }

    const switchChange = (checked:boolean,target:string)=>{
        if(target === 'allow'){
           setAllow(checked)
        }
        else if(target === 'look'){
            setLook(checked)
        }
    }

    const cancel = ()=>{
        props.cancel()
    }

    return <div className={'friend-app-container'}>
        <span className={'title'}>申请添加朋友</span>
        <div className={'form-box'}>
            <Form layout={'vertical'}>
                <Form.Item label={'发送添加朋友申请'}>
                    <Input defaultValue={'我是'+user} value={sender} onChange={(event)=> change(event,'sender')}></Input>
                </Form.Item>
                <Form.Item label={'备注名'} name={'notes'}>
                    <Input value={notes} onChange={(event)=> change(event,'notes')}></Input>
                </Form.Item>
                <Form.Item label={'标签'} name={'tags'}>
                    <Input placeholder={'添加标签'} value={tags} onChange={(event)=> change(event,'tags')}></Input>
                </Form.Item>
                <Form.Item label={'设置朋友权限'}>
                    <div className={'item-box radius-top'} onClick={()=> check(1)}>
                        <div className={'icon-box'}>
                            {friendApplication.circleFriend}
                        </div>
                        <div className={'authorization-box'}>
                            <span className={'authorization-text'}>聊天、朋友圈、微信运动等</span>
                            {checkStatus[0] ? friendApplication.correct : null}
                        </div>
                    </div>
                    <div className={'item-box radius-bottom'} onClick={()=> check(0)}>
                        <div className={'icon-box'}>
                            {friendApplication.chat}
                        </div>
                        <div className={'authorization-box'}>
                            <span className={'authorization-text'}>仅聊天</span>
                            {checkStatus[1] ? friendApplication.correct : null}
                        </div>
                    </div>
                </Form.Item>
                <Form.Item label={'朋友圈和状态'}>
                    <div className={'item-box  radius-top'}>
                        <div className={'icon-box circle-lock'}>
                            {friendApplication.circleFriend}
                            {friendApplication.lock}
                        </div>
                        <div className={'authorization-box'}>
                            <span className={'authorization-text'}>不让他（她）看</span>
                            <Switch className={'switch'} checked={allow} onChange={(checked)=> switchChange(checked,'allow')}></Switch>
                        </div>
                    </div>
                    <div className={'item-box radius-bottom'}>
                        <div className={'icon-box circle-eye'}>
                            {friendApplication.circleFriend}
                            {friendApplication.eye}
                        </div>
                        <div className={'authorization-box'}>
                            <span className={'authorization-text'}>不看他（她）</span>
                            <Switch className={'switch'} checked={look} onChange={(checked)=> switchChange(checked,'look')}></Switch>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </div>
        <div className={'btn-box'}>
            <Button htmlType={'submit'} onClick={confirm} type={'primary'} className={'form-btn'}>确定</Button>
            <Button onClick={cancel} className={'form-btn'}>取消</Button>
        </div>
    </div>
}