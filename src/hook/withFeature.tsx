import {useMessageStore} from "../zustand/store";
import {MsgDataType} from "../common/staticData/data";

function WithFeature(CommonComponent:any){

  function Feature(props:any){
    const {changeChatList,chatList,customer,saveFriendInfo,changeChatWindowSiderInfo,friendInfo,changeListId} = useMessageStore((state: any) => state)
    const chatWithFriend = (e:any)=>{
      const {user_id, username, avatar} = e
      const list = chatList[customer.user_id]

      let isInclude = false
      let data = {
        userId: user_id,
        msg: '',
        user: username,
        time: new Date().getTime(),
        hasBeenRead: true,
        isGroupChat: false,
        avatar,
      } as unknown as MsgDataType

      //判断好友是否在聊天列表中
      list.map((item: any) => {
        if (item.userId === user_id) {

          isInclude = true
        }
        return true
      })
      //不在列表中，需要添加好友到聊天列表中
      if (!isInclude) {
        changeChatList(data)
      }
      //修改列表激活状态
      changeListId(user_id)
      //保存好友信息，用于聊天窗口所需数据展示
      saveFriendInfo(data)

      //获取好友信息
      let friendList = JSON.parse(localStorage.getItem('friendList') as string), arr: any[] = []
      friendList.forEach((item: any) => {
        item.content.forEach((it: any) => {
          if (friendInfo.userId === it.user_id) {
            arr.push({
              isFriend: true,
              ...it
            })
          }
        })
      })
      changeChatWindowSiderInfo({
        members: arr
      })
    }
    return <CommonComponent chat={chatWithFriend} {...props}></CommonComponent>
  }
  return Feature
}

export default WithFeature