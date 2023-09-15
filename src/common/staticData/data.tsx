
import {PlusOutlined, UserAddOutlined} from '@ant-design/icons'
import {
  EmojiIconComponent,
  FileIconComponent,
  ScissorsIconComponent,
  MessageIconComponent,
  TelephoneIconComponent,
  CameraIconComponent,
  NewFriendIconComponent, CommonIconComponent
} from '../svg/svg'
export interface MenuType {
  title:string,
  image:string,
  imageAc:string,
  isActived:boolean
}
export const menu:MenuType[] = [
  {
    title:'聊天',
    image:require('../images/chat.png'),
    imageAc:require('../images/chat_ac.png'),
    isActived:true
  },
  {
    title:'通讯录',
    image:require('../images/friend.png'),
    imageAc:require('../images/friend_ac.png'),
    isActived:false
  },
  {
    title:'收藏',
    image:require('../images/square.png'),
    imageAc:require('../images/square_ac.png'),
    isActived:false
  },
  {
    title:'聊天文件',
    image:require('../images/files.png'),
    imageAc:require('../images/files_ac.png'),
    isActived:false
  },
  {
    title:'朋友圈',
    image:require('../images/circle.png'),
    imageAc:require('../images/circle_ac.png'),
    isActived:false
  },
  {
    title:'搜一搜',
    image:require('../images/search.png'),
    imageAc:require('../images/search_ac.png'),
    isActived:false
  }
]

export const otherMenu:MenuType[] = [
  {
    title:'小程序面板',
    image:require('../images/miniprogram.png'),
    imageAc:require('../images/miniprogram_ac.png'),
    isActived:false
  },
  {
    title:'手机',
    image:require('../images/iphone.png'),
    imageAc:require('../images/iphone_ac.png'),
    isActived:false
  },
  {
    title:'设置及其他',
    image:require('../images/other.png'),
    imageAc:require('../images/other_ac.png'),
    isActived:false
  }
]
export const correctIconComponent = [
  {
    title:'聊天',
    component:()=> <PlusOutlined />
  },
  {
    title:'通讯录',
    component:()=> <UserAddOutlined />
  }
]

export interface MsgDataType {
  userId:number,
  user:string,
  type:string,
  msg:string,
  avatar:string,
  time:string,
  isMute:boolean,
  hasBeenRead:boolean,
  isGroupChat:boolean
}
// export const messageData:MsgDataType[] = [
//   {
//     id:3156987,
//     user:'用户1号',
//     type:'text',
//     msg:'这是一条用于测试的聊天消息',
//     avatar:'',
//     time:'刚刚',
//     isMute:false,
//     hasBeenRead:false,
//     isGroupChat:false
//   },
//   {
//     userId:5678453,
//     user:'沙雕1号',
//     type:'text',
//     msg:'你好',
//     avatar:'',
//     time:'08/10',
//     isMute:true,
//     hasBeenRead:false,
//     isGroupChat: false
//   }
// ]

export interface IconMenu {
  title:string
  component:Function
}
export const operationsData = {
  operations:[
    {
      title:'表情',
      component:()=> <EmojiIconComponent />
    },
    {
      title:'发送文件',
      component:()=> <FileIconComponent />
    },
    {
      title:'截图',
      component:()=> <ScissorsIconComponent />
    },
    {
      title:'聊天记录',
      component:()=> <MessageIconComponent />
    }
  ],
  chatWay:[
    {
      title:'语音聊天',
      component:()=> <TelephoneIconComponent />
    },
    {
      title:'视频聊天',
      component:()=> <CameraIconComponent />
    }
  ],
  list:[
    {
      title:'新的朋友',
      component:()=> <NewFriendIconComponent></NewFriendIconComponent>
    },
    {
      title:'公众号',
      component:()=> <CommonIconComponent></CommonIconComponent>
    }
  ]
}