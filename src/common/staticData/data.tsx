
import {PlusOutlined, UserAddOutlined} from '@ant-design/icons'
export interface menuType {
  title:string,
  image:string,
  imageAc:string,
  isActived:boolean
}
export const menu:menuType[] = [
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

export const otherMenu:menuType[] = [
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