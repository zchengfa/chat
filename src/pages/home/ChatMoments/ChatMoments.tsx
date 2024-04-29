import './chatMoments.sass'
import {chatMomentsTopData} from "../../../common/staticData/data";
import {useMessageStore} from "../../../zustand/store";
import {EmptyLoveIconComponent, TwoDotIconComponent} from "../../../common/svg/svg";
import {useEffect, useState} from "react";
import {dealMsgTime} from "../../../util/util";
import {message} from "antd";
import {getChatMomentsData} from "../../../network/request";

//import axios, { AxiosResponse} from "axios";

function ChatMoments (props:any){
  const [messageApi,contextHolder] = message.useMessage()
  const {showChatMoments,customer} = useMessageStore((state:any)=> state)

  // axios.post('http://localhost:4000/saveMoments', {
  //   user_id: customer.user_id,
  //   text: '天气特别好，不仅让人们感受到大自然的美丽，还启示着人们珍惜当下的美好时光。在这美好的天气里，勇敢面对生活的挑战，让人生更加充实而有意义。',
  //   images: [
  //     'https://img2.baidu.com/it/u=3561988920,3951379968&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  //     'https://img2.baidu.com/it/u=1280140863,2947445516&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  //     'https://img0.baidu.com/it/u=3102940913,2464544074&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  //     'https://img0.baidu.com/it/u=4236361924,4020603376&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
  //   ],
  //   sendTime: new Date().getTime(),
  // },{
  //   headers:{
  //     Authorization:sessionStorage.getItem('token')
  //   }
  // }).then ((res:AxiosResponse) => {
  //   console.log(res)
  // })
  const [momentsData,setMomentsData] = useState(()=>{
    return [
      {
        user:{
          user_id:1234,
          username:'小沫',
          avatar:'https://img1.baidu.com/it/u=2763978340,265256553&fm=253&fmt=auto&app=120&f=JPEG?w=200&h=200'
        },
        content:{
          moments_text:'天气特别好，不仅让人们感受到大自然的美丽，还启示着人们珍惜当下的美好时光。在这美好的天气里，勇敢面对生活的挑战，让人生更加充实而有意义。',
          images:[
            'https://img2.baidu.com/it/u=3561988920,3951379968&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            'https://img2.baidu.com/it/u=1280140863,2947445516&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            'https://img0.baidu.com/it/u=3102940913,2464544074&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            'https://img0.baidu.com/it/u=4236361924,4020603376&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
          ],
          send_time:1713416890871,
          content_id:374284
        },
        location:'加利福尼亚',
        liked:['靓仔','alen'],
        comments:[
          {
            comments_user_id:24334,
            username:'靓仔',
            comment_content:'真好啊',
            comment_id:6666
          }
        ]
      },
      {
        user:{
          user_id:54674,
          username:'默默',
          avatar:'https://img0.baidu.com/it/u=1772830230,3996007766&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200'
        },
        content:{
          moments_text:'风景真好',
          images:[
            'https://img2.baidu.com/it/u=3561988920,3951379968&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            'https://img2.baidu.com/it/u=1280140863,2947445516&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            'https://img0.baidu.com/it/u=3102940913,2464544074&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            'https://img0.baidu.com/it/u=4236361924,4020603376&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
          ],
          send_time:1713316890871,
          content_id:374284
        },
        location:'非洲',
        liked:['非洲人'],
        comments:[
          {
            comments_user_id:98797,
            username:'靓仔',
            comment_text:'nice',
            comment_id:66688
          }
        ]
      }
    ]
  })

  const [operateStatus,setOperateStatus] = useState(()=>{
    let data:any = {}
    momentsData?.forEach((item:any)=>{
      data[item.user.user_id] = false
    })
    return data
  })

  const btnClick = (type:number,index:number)=>{
    if(type === 1 && index === 2){
      showChatMoments()
    }
  }

  const changeOperateStatus = (id:string | number,status:boolean)=>{
    let data = JSON.parse(JSON.stringify(operateStatus))
    for (const dataKey in data) {
      dataKey.toString()  === id.toString() ? data[dataKey] = !status : data[dataKey] = false
    }

    setOperateStatus(data)
  }

  const operateClick = (type:number,id:string | number)=>{
    const typeObj:any = {
      0:'取消',
      1:'赞',
      2:'评论'
    }

    messageApi.open({
      type:'warning',
      content:typeObj[type] + '功能完善中'
    }).then()
  }

  useEffect(()=>{
    const getData = async ()=>{
      let res = await getChatMomentsData(customer.user_id)
      let data = JSON.parse(JSON.stringify(momentsData))
      data.push(...res.data['moments'])
      setMomentsData(data)

      let status:any = {}
      data?.forEach((item:any)=>{
        status[item.user.user_id] = false
      })
      setOperateStatus(status)
    }

    getData().then()
    const changeBg = (e:any)=>{
      let targetEl:any = document.getElementsByClassName('content-header').item(0)
      let changeEl:any = document.getElementsByClassName('moments-operate-btn').item(0)
      let scrollTop = e.target.scrollTop,targetHeight = targetEl?.clientHeight
      scrollTop >= targetHeight ? changeEl.style.backgroundColor = 'var(--gray-color)' : changeEl.style.backgroundColor = 'transparent'

    }
    let el:any = document.getElementsByClassName('moments-content').item(0)
    el?.addEventListener('scroll',changeBg)

    return ()=>{
      el?.removeEventListener('scroll',changeBg)
    }
  },[])

  return <div className={'chat-moments-container'}>
    {contextHolder}
  {/*  顶部操作按钮*/}
    <div className={'moments-operate-btn'}>
      <div className={'left-btn-box btn-item-box'}>
        {
          chatMomentsTopData['left'].map((item:any,index:number)=>{
            return <div className={'btn-icon'} title={item.title} key={index} onClick={()=> btnClick(0,index)}>
              {item.icon}
            </div>
          })
        }
      </div>
      <div className={'right-btn-box btn-item-box'}>
        {
          chatMomentsTopData['right'].map((item:any,index:number)=>{
            return <div className={'btn-icon'} title={item.title} key={index} onClick={()=> btnClick(1,index)}>
              {item.icon}
            </div>
          })
        }
      </div>
    </div>
    <div className={'moments-content'}>
      <div className={'content-header'}>
        <div className={'moments-user'}>
          <span className={'user'}>随风</span>
          <img className={'user-avatar'} src="https://img1.baidu.com/it/u=1608918934,1260897104&fm=253&fmt=auto?w=200&h=200" alt="avatar"/>
        </div>
      </div>
      <div className={'moments-list'}>
        {
          momentsData?.map((item:any,index:number)=>{
            return <div className={'moments-item'} key={index}>
              <div className={'moments-left'}>
                <img className={'moments-avatar'} src={item.user.avatar} alt="avatar"/>
              </div>
              <div className={'moments-right'}>
                <span className={'username right-item-span'}>{item.user.username}</span>
                <span className={'moments-text right-item-span'}>{item.content.moments_text}</span>
                <div className={'moments-images'}>
                  {
                    item.content?.images?.map((content:any,ci:number)=>{
                      return <img src={content} key={ci} className={'content-img-item'} alt="moments_img"/>
                    })
                  }
                </div>
                {item.location ? <span className={'location right-item-span'}>{item.location}</span> : null}
                <div className={'time-operate'}>
                  <span className={'send-time'}>{dealMsgTime(item.content.send_time)}</span>
                  <div className={'like-operate-box'} title={'评论'} onClick={()=> changeOperateStatus(item.user.user_id,operateStatus[item.user.user_id])}>
                    <TwoDotIconComponent className={'like-operate'}></TwoDotIconComponent>
                    {
                      operateStatus[item.user.user_id] ? <div className={'operate-box'}>
                        {
                          item.liked?.indexOf(item.user.username) === -1 ?
                            <button className={'operate-item-btn'} onClick={()=> operateClick(1,item.content.content_id)}>赞</button> :
                            <button className={'operate-item-btn'} onClick={()=> operateClick(0,item.content.content_id)}>取消</button>
                        }
                        <button className={'operate-item-btn'} onClick={()=> operateClick(2,item.content.content_id)}>评论</button>
                      </div> : null
                    }
                  </div>
                </div>
                {
                  item.liked?.length || item.comments?.length ?
                  <div className={'moments-comment'}>
                    <div className={'liked-box'}>
                      {item.liked ? <EmptyLoveIconComponent className={'empty-love-icon'}></EmptyLoveIconComponent> : null}
                      {
                        item.liked?.map((l: any, lIndex: number) => {
                          return <span
                            key={lIndex}>{item.liked.length - 1 === lIndex && item.liked.length > 1 ? '，' + l : l}</span>
                        })
                      }
                    </div>
                    {
                      item.comments?.map((comment: any, coi: number) => {
                        return <div className={'comments-item'} key={coi}>
                          <span>{comment.username}：</span>
                          <span style={{color: 'var(--normal-text-color)'}}>{comment.comment_content}</span>
                        </div>
                      })
                    }
                  </div> : null
                }
              </div>
            </div>
          })
        }
      </div>
    </div>
  </div>
}

export default ChatMoments