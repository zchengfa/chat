
import {PlusOutlined, UserAddOutlined} from '@ant-design/icons'
import {
  EmojiIconComponent,
  FileIconComponent,
  ScissorsIconComponent,
  MessageIconComponent,
  TelephoneIconComponent,
  CameraIconComponent,
  NewFriendIconComponent,
  CommonIconComponent,
  CircleFriendIconComponent,
  LockIconComponent,
  ChatIconComponent,
  CorrectIconComponent, EyeIconComponent
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
    component:(click?:any)=> <PlusOutlined onClick={click} />
  },
  {
    title:'通讯录',
    component:(click?:any)=> <UserAddOutlined onClick={click} />
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
  isGroupChat:boolean,
  showTime?:string
}


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

export const friendApplication = {
  circleFriend:<CircleFriendIconComponent />,
  lock:<LockIconComponent className={'lock-icon'} />,
  chat:<ChatIconComponent />,
  correct:<CorrectIconComponent className={'correct-icon'}/>,
  eye:<EyeIconComponent className={'eye-icon'}/>
}

/**
 * 表情json
 */
export const emoji = [
  {
    "emoji": "🌹",
    "code": "&#127801;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🍀",
    "code": "&#127808;",
    "nameCode": "[四叶草]",
    "title": "四叶草"
  },
  {
    "emoji": "🍎",
    "code": "&#127822;",
    "nameCode": "[苹果]",
    "title": "苹果"
  },
  {
    "emoji": "💰",
    "code": "&#128176;",
    "nameCode": "[钱包]",
    "title": "钱包"
  },
  {
    "emoji": "📱",
    "code": "&#128241;",
    "nameCode": "[手机]",
    "title": "手机"
  },
  {
    "emoji": "🌙",
    "code": "&#127769;",
    "nameCode": "[月亮]",
    "title": "月亮"
  },
  {
    "emoji": "🍁",
    "code": "&#127809;",
    "nameCode": "[枫叶]",
    "title": "枫叶"
  },
  {
    "emoji": "🍂",
    "code": "&#127810;",
    "nameCode": "[叶子]",
    "title": "叶子"
  },
  {
    "emoji": "🍃",
    "code": "&#127811;",
    "nameCode": "[绿叶]",
    "title": "绿叶"
  },
  {
    "emoji": "🌷",
    "code": "&#127799;",
    "nameCode": "[花]",
    "title": "花"
  },
  {
    "emoji": "💎",
    "code": "&#128142;",
    "nameCode": "[钻石]",
    "title": "钻石"
  },
  {
    "emoji": "🔪",
    "code": "&#128298;",
    "nameCode": "[刀]",
    "title": "刀"
  },
  {
    "emoji": "🔫",
    "code": "&#128299;",
    "nameCode": "[水枪]",
    "title": "水枪"
  },
  {
    "emoji": "🏀",
    "code": "&#127936;",
    "nameCode": "[篮球]",
    "title": "篮球"
  },
  {
    "emoji": "👄",
    "code": "&#128068;",
    "nameCode": "[吻]",
    "title": "吻"
  },
  {
    "emoji": "👍",
    "code": "&#128077;",
    "nameCode": "[赞]",
    "title": "赞"
  },
  {
    "emoji": "🔥",
    "code": "&#128293;",
    "nameCode": "[火]",
    "title": "火"
  },
  {
    "emoji": "😀",
    "code": "&#128512;",
    "nameCode": "[笑]",
    "title": "玫瑰"
  },
  {
    "emoji": "😁",
    "code": "&#128513;",
    "nameCode": "[大笑]",
    "title": "玫瑰"
  },
  {
    "emoji": "😂",
    "code": "&#128514;",
    "nameCode": "[哭]",
    "title": "哭"
  },
  {
    "emoji": "😃",
    "code": "&#128515;",
    "nameCode": "[开心]",
    "title": "开心"
  },
  {
    "emoji": "😄",
    "code": "&#128516;",
    "nameCode": "[哈哈]",
    "title": "哈哈"
  },
  {
    "emoji": "😅",
    "code": "&#128517;",
    "nameCode": "[汗]",
    "title": "汗"
  },
  {
    "emoji": "😆",
    "code": "&#128518;",
    "nameCode": "[眯眼笑]",
    "title": "眯眼笑"
  },
  {
    "emoji": "😉",
    "code": "&#128521;",
    "nameCode": "[眨眼]",
    "title": "眨眼"
  },
  {
    "emoji": "😊",
    "code": "&#128522;",
    "nameCode": "[微笑]",
    "title": "微笑"
  },
  {
    "emoji": "😋",
    "code": "&#128523;",
    "nameCode": "[馋]",
    "title": "馋"
  },
  {
    "emoji": "😎",
    "code": "&#128526;",
    "nameCode": "[戴墨镜]",
    "title": "戴墨镜"
  },
  {
    "emoji": "😍",
    "code": "&#128525;",
    "nameCode": "[喜欢]",
    "title": "喜欢"
  },
  {
    "emoji": "😘",
    "code": "&#128536;",
    "nameCode": "[喜爱]",
    "title": "喜爱"
  },
  {
    "emoji": "😗",
    "code": "&#128535;",
    "nameCode": "[嘟嘴1]",
    "title": "嘟嘴"
  },
  {
    "emoji": "😙",
    "code": "&#128537;",
    "nameCode": "[嘟嘴2]",
    "title": "嘟嘴2"
  },
  {
    "emoji": "😚",
    "code": "&#128538;",
    "nameCode": "[嘟嘴3]",
    "title": "嘟嘴3"
  },
  {
    "emoji": "😇",
    "code": "&#128519;",
    "nameCode": "[光圈]",
    "title": "光圈"
  },
  {
    "emoji": "😐",
    "code": "&#128528;",
    "nameCode": "[苦涩]",
    "title": "苦涩"
  },
  {
    "emoji": "😑",
    "code": "&#128529;",
    "nameCode": "[无奈]",
    "title": "无奈"
  },
  {
    "emoji": "😶",
    "code": "&#128566;",
    "nameCode": "[惊讶]",
    "title": "惊讶"
  },
  {
    "emoji": "😏",
    "code": "&#128527;",
    "nameCode": "[歪嘴]",
    "title": "歪嘴"
  },
  {
    "emoji": "😣",
    "code": "&#128547;",
    "nameCode": "[眯眼苦涩]",
    "title": "眯眼苦涩"
  },
  {
    "emoji": "😥",
    "code": "&#128549;",
    "nameCode": "[掉汗]",
    "title": "掉汗"
  },
  {
    "emoji": "😮",
    "code": "&#128558;",
    "nameCode": "[吐舌]",
    "title": "吐舌"
  },
  {
    "emoji": "😯",
    "code": "&#128559;",
    "nameCode": "[惊讶！]",
    "title": "惊讶！"
  },
  {
    "emoji": "😪",
    "code": "&#128554;",
    "nameCode": "[困]",
    "title": "困"
  },
  {
    "emoji": "😫",
    "code": "&#128555;",
    "nameCode": "[啊]",
    "title": "啊"
  },
  {
    "emoji": "😴",
    "code": "&#128564;",
    "nameCode": "[睡觉]",
    "title": "睡觉"
  },
  {
    "emoji": "😌",
    "code": "&#128524;",
    "nameCode": "[害羞]",
    "title": "害羞"
  },
  {
    "emoji": "😛",
    "code": "&#128539;",
    "nameCode": "[哈哈！]",
    "title": "哈哈！"
  },
  {
    "emoji": "😜",
    "code": "&#128540;",
    "nameCode": "[调皮]",
    "title": "调皮"
  },
  {
    "emoji": "😝",
    "code": "&#128541;",
    "nameCode": "[眯眼调皮]",
    "title": "眯眼调皮"
  },
  {
    "emoji": "😒",
    "code": "&#128530;",
    "nameCode": "[耷眼]",
    "title": "耷眼"
  },
  {
    "emoji": "😓",
    "code": "&#128531;",
    "nameCode": "[苦]",
    "title": "苦"
  },
  {
    "emoji": "😔",
    "code": "&#128532;",
    "nameCode": "[不开心]",
    "title": "不开心"
  },
  {
    "emoji": "😕",
    "code": "&#128533;",
    "nameCode": "[傲娇]",
    "title": "傲娇"
  },
  {
    "emoji": "😲",
    "code": "&#128562;",
    "nameCode": "[瞪眼笑]",
    "title": "瞪眼笑"
  },
  {
    "emoji": "😷",
    "code": "&#128567;",
    "nameCode": "[戴口罩]",
    "title": "戴口罩"
  },
  {
    "emoji": "😖",
    "code": "&#128534;",
    "nameCode": "[苦涩！]",
    "title": "苦涩！"
  },
  {
    "emoji": "😞",
    "code": "&#128542;",
    "nameCode": "[不开心！]",
    "title": "不开心！"
  },
  {
    "emoji": "😟",
    "code": "&#128543;",
    "nameCode": "[想哭]",
    "title": "想哭"
  },
  {
    "emoji": "😤",
    "code": "&#128548;",
    "nameCode": "[生气]",
    "title": "生气"
  },
  {
    "emoji": "😢",
    "code": "&#128546;",
    "nameCode": "[掉泪]",
    "title": "掉泪"
  },
  {
    "emoji": "😭",
    "code": "&#128557;",
    "nameCode": "[大哭]",
    "title": "大哭"
  },
  {
    "emoji": "😦",
    "code": "&#128550;",
    "nameCode": "[啊？]",
    "title": "啊？"
  },
  {
    "emoji": "😧",
    "code": "&#128551;",
    "nameCode": "[啊2]",
    "title": "啊2"
  },
  {
    "emoji": "😨",
    "code": "&#128552;",
    "nameCode": "[害怕]",
    "title": "害怕"
  },
  {
    "emoji": "😬",
    "code": "&#128556;",
    "nameCode": "[龇牙]",
    "title": "龇牙"
  },
  {
    "emoji": "😰",
    "code": "&#128560;",
    "nameCode": "[害怕！]",
    "title": "害怕！"
  },
  {
    "emoji": "😱",
    "code": "&#128561;",
    "nameCode": "[惊讶2]",
    "title": "惊讶2"
  },
  {
    "emoji": "😳",
    "code": "&#128563;",
    "nameCode": "[不知所措]",
    "title": "不知所措"
  },
  {
    "emoji": "😵",
    "code": "&#128565;",
    "nameCode": "[哦]",
    "title": "哦"
  },
  {
    "emoji": "😡",
    "code": "&#128545;",
    "nameCode": "[生大气]",
    "title": "生大气"
  },
  {
    "emoji": "😠",
    "code": "&#128544;",
    "nameCode": "[有点生气]",
    "title": "有点生气"
  },
  {
    "emoji": "😈",
    "code": "&#128520;",
    "nameCode": "[恶魔]",
    "title": "恶魔"
  },
  {
    "emoji": "👿",
    "code": "&#128127;",
    "nameCode": "[恶魔2]",
    "title": "恶魔2"
  },
  {
    "emoji": "👹",
    "code": "&#128121;",
    "nameCode": "[恶魔3]",
    "title": "恶魔3"
  },
  {
    "emoji": "👺",
    "code": "&#128122;",
    "nameCode": "[恶魔4]",
    "title": "恶魔4"
  },
  {
    "emoji": "💀",
    "code": "&#128128;",
    "nameCode": "[骷髅]",
    "title": "骷髅"
  },
  {
    "emoji": "👻",
    "code": "&#128123;",
    "nameCode": "[幽灵]",
    "title": "幽灵"
  },
  {
    "emoji": "👽",
    "code": "&#128125;",
    "nameCode": "[外星人]",
    "title": "外星人"
  },
  {
    "emoji": "👦",
    "code": "&#128102;",
    "nameCode": "[小伙]",
    "title": "小伙"
  },
  {
    "emoji": "👧",
    "code": "&#128103;",
    "nameCode": "[靓仔]",
    "title": "靓仔"
  },
  {
    "emoji": "👨",
    "code": "&#128104;",
    "nameCode": "[叼毛]",
    "title": "叼毛"
  },
  {
    "emoji": "👩",
    "code": "&#128105;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👴",
    "code": "&#128116;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👵",
    "code": "&#128117;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👶",
    "code": "&#128118;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👱",
    "code": "&#128113;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👮",
    "code": "&#128110;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👲",
    "code": "&#128114;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👳",
    "code": "&#128115;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👷",
    "code": "&#128119;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👸",
    "code": "&#128120;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "💂",
    "code": "&#128130;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🎅",
    "code": "&#127877;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👰",
    "code": "&#128112;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👼",
    "code": "&#128124;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "💆",
    "code": "&#128134;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "💇",
    "code": "&#128135;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🙍",
    "code": "&#128589;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🙎",
    "code": "&#128590;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🙅",
    "code": "&#128581;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🙆",
    "code": "&#128582;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "💁",
    "code": "&#128129;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🙋",
    "code": "&#128587;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🙇",
    "code": "&#128583;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🙌",
    "code": "&#128588;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🙏",
    "code": "&#128591;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👤",
    "code": "&#128100;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👥",
    "code": "&#128101;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🚶",
    "code": "&#128694;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🏃",
    "code": "&#127939;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👯",
    "code": "&#128111;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "💃",
    "code": "&#128131;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👫",
    "code": "&#128107;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👬",
    "code": "&#128108;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👭",
    "code": "&#128109;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "💏",
    "code": "&#128143;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "💑",
    "code": "&#128145;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👪",
    "code": "&#128106;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "💪",
    "code": "&#128170;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👈",
    "code": "&#128072;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👉",
    "code": "&#128073;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👆",
    "code": "&#128070;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👇",
    "code": "&#128071;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "✋✊",
    "code": "✋✊",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👊",
    "code": "&#128074;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👋",
    "code": "&#128075;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👏",
    "code": "&#128079;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👐",
    "code": "&#128080;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👣",
    "code": "&#128099;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👀",
    "code": "&#128064;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👂",
    "code": "&#128066;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👃",
    "code": "&#128067;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👅",
    "code": "&#128069;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👄",
    "code": "&#128068;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "💋",
    "code": "&#128139;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👓",
    "code": "&#128083;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👔",
    "code": "&#128084;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👕",
    "code": "&#128085;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👖",
    "code": "&#128086;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👗",
    "code": "&#128087;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👘",
    "code": "&#128088;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👙",
    "code": "&#128089;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👚",
    "code": "&#128090;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👛",
    "code": "&#128091;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👜",
    "code": "&#128092;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👝",
    "code": "&#128093;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🎒",
    "code": "&#127890;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "💼",
    "code": "&#128188;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👞",
    "code": "&#128094;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👟",
    "code": "&#128095;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👠",
    "code": "&#128096;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👡",
    "code": "&#128097;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👢",
    "code": "&#128098;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👑",
    "code": "&#128081;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "👒",
    "code": "&#128082;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🎩",
    "code": "&#127913;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🎓",
    "code": "&#127891;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "💄",
    "code": "&#128132;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "💅",
    "code": "&#128133;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "💍",
    "code": "&#128141;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  },
  {
    "emoji": "🌂",
    "code": "&#127746;",
    "nameCode": "[玫瑰]",
    "title": "玫瑰"
  }
]