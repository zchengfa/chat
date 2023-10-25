import './groupFriendList.sass'
import {Input, List, Checkbox, Image, Button} from 'antd'
import {SearchOutlined,CloseCircleFilled} from "@ant-design/icons";
import {useState} from "react";

export default function GroupFriendList(props:any){
    const list = props.list
    const [data,setData] = useState(()=>{
        let d:any[] = []
        list.map((item:any)=>{
            if(item.content){
                d.push(item)
            }
            return true
        })

        d.map((item:any)=>{
            return item.content.map((it:any)=>{
                it.isActived = false
                return it.isChecked = false
            })
        })
        return d
    })

    const [checkedList,setCheckedList] = useState(()=> [] as any[])
    const [inputValue,setInputValue] = useState('')

    const chooseFriend = (parentIndex:number,childrenIndex:number)=>{
        let d = JSON.parse(JSON.stringify(data)),cl:any[] = []
        d.map((item:any,index:number)=>{
            if(index === parentIndex){
                item.content.map((it:any,i:number)=>{
                    if(i === childrenIndex){
                        it.isActived = true
                        it.isChecked = !it.isChecked
                    }
                    else{
                        it.isActived = false
                    }
                    return true
                })
            }
            else{
                item.content.map((it:any,i:number)=>{
                   return  it.isActived = false
                })
            }
            return true

        })

        d.map((item:any)=>{
            return item.content.map((it:any)=>{
                if(it.isChecked){
                    cl.push(it)
                }
                return true
            })
        })

        setData(d)
        setCheckedList(cl)
    }

    const groupComBtnClick = (isAdd:boolean)=>{
        if(!isAdd){
            props.groupComBtnClick(isAdd)
        }
        else if(isAdd && checkedList.length){
            let data:any[] = []
            checkedList.map((item:any)=>{
                return data.push({
                    user_id:item.user_id,
                    username:item.username,
                    avatar:item.avatar
                })
            })
            props.groupComBtnClick(isAdd,data.splice(0,8))
        }
    }

    const deleteChoose = (id:any)=>{
        let d = JSON.parse(JSON.stringify(data))
        d.map((item:any)=>{
           return item.content.map((it:any)=>{
                if(it.user_id === id){
                    it.isChecked = false
                }
                return true
           })
        })

        checkedList.map((item:any,index:number)=>{
            if(item.user_id === id){
                checkedList.splice(index,1)
            }
            return true
        })
        setData(d)
    }

    const inputChange = (e:any)=>{
        setInputValue(e.target.value.trim())
    }

    const resetInput = ()=>{
        setInputValue('')
    }

    return <div className={'group-friend-list'}>
        <div className={'group-left group-item'}>
            <Input value={inputValue} onChange={inputChange} className={'group-input'} prefix={<SearchOutlined style={{color:'var(--deep-gray-color)'}} />} suffix={inputValue.length ? <CloseCircleFilled style={{color:'var(--deep-gray-color)'}} onClick={resetInput}/> : null} placeholder={'搜索'}></Input>
            <div className={'group-list-box'}>
                <List
                    className={'group-list'}
                    dataSource={data}
                    renderItem={(item:any,index:number)=>{
                        return <List.Item style={{border:'none'}} key={index} className={'group-list-item'}>
                            <h6 className={'item-title'}>{item.title}</h6>
                            {
                                item.content.map((it:any,i:number)=>{
                                    return <div key={i} className={'item-box'} style={it.isActived ? {backgroundColor:'var(--deep-gray-color)'} : undefined} onClick={()=> chooseFriend(index,i)} >
                                        <Checkbox checked={it.isChecked} className={'list-checkbox'}/>
                                        <Image className={'item-img'} src={it.avatar} preview={false}></Image>
                                        <div className={'friend-list-username text-ellipsis'}>{it.username}</div>
                                    </div>
                                })
                            }
                        </List.Item>
                    }}
                >

                </List>
            </div>
        </div>
        <div className={'group-right group-item'}>
            <div className={'title-box'}>
                <span className={'group-right-title'}>选择联系人</span>
                {checkedList.length ? <span className={'friend-count'}>已选择{checkedList.length}个联系人</span> : null}
            </div>
            <div className={'had-choose-box'}>
                <List
                    className={'had-choose-list'}
                    grid={{column:3}}
                    dataSource={checkedList}
                    renderItem={(item:any)=>{
                        return <List.Item className={'had-choose-list-item'}>
                            <CloseCircleFilled className={'close-friend-icon'} title={'移除'}  onClick={()=> deleteChoose(item.user_id)}/>
                            <Image preview={false} src={item.avatar} className={'choose-item-img'} ></Image>
                            <span className={'item-username text-ellipsis'}>{item.username}</span>
                        </List.Item>
                    }}
                ></List>
            </div>
            <div className={'group-btn-box'}>
                <Button className={checkedList.length ? 'complete-btn-actived btn' : 'complete-btn btn'} onClick={()=>groupComBtnClick(true)}>完成</Button>
                <Button className={'cancel-btn btn'} onClick={()=>groupComBtnClick(false)}>取消</Button>
            </div>
        </div>
    </div>
}