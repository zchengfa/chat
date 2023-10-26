
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

import Emoji from '../../components/Common/Emoji/Emoji'

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
    component:(click?:any)=> <PlusOutlined title={'发起群聊'} onClick={click} />
  },
  {
    title:'通讯录',
    component:(click?:any)=> <UserAddOutlined title={'添加朋友'} onClick={click} />
  }
]


export interface MsgDataType {
  room?: any;
  userId:number,
  user:string,
  type:string,
  msg:string,
  avatar:string,
  time:string,
  isMute:boolean,
  hasBeenRead:boolean,
  isGroupChat:boolean,
  msgCode?:string
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
      component:()=> <Emoji children={<EmojiIconComponent />}></Emoji>
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


export interface EmojiType {
  emoji:string,
  code:string,
  nameCode:string,
  title:string
}
/**
 * 表情json
 */
export const emoji:EmojiType[] = [
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
    "title": "笑"
  },
  {
    "emoji": "😁",
    "code": "&#128513;",
    "nameCode": "[大笑]",
    "title": "大笑"
  },
  {
    "emoji": "😂",
    "code": "&#128514;",
    "nameCode": "[笑哭]",
    "title": "笑哭"
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
    "nameCode": "[男孩]",
    "title": "男孩"
  },
  {
    "emoji": "👧",
    "code": "&#128103;",
    "nameCode": "[女孩]",
    "title": "女孩"
  },
  {
    "emoji": "👨",
    "code": "&#128104;",
    "nameCode": "[男人]",
    "title": "男人"
  },
  {
    "emoji": "👩",
    "code": "&#128105;",
    "nameCode": "[女人]",
    "title": "女人"
  },
  {
    "emoji": "👴",
    "code": "&#128116;",
    "nameCode": "[老爷爷]",
    "title": "老爷爷"
  },
  {
    "emoji": "👵",
    "code": "&#128117;",
    "nameCode": "[老奶奶]",
    "title": "老奶奶"
  },
  {
    "emoji": "👶",
    "code": "&#128118;",
    "nameCode": "[小孩]",
    "title": "小孩"
  },
  {
    "emoji": "👱",
    "code": "&#128113;",
    "nameCode": "[小伙]",
    "title": "小伙"
  },
  {
    "emoji": "👮",
    "code": "&#128110;",
    "nameCode": "[警察]",
    "title": "警察"
  },
  {
    "emoji": "👲",
    "code": "&#128114;",
    "nameCode": "[地主]",
    "title": "地主"
  },
  {
    "emoji": "👳",
    "code": "&#128115;",
    "nameCode": "[老外]",
    "title": "老外"
  },
  {
    "emoji": "👷",
    "code": "&#128119;",
    "nameCode": "[工人]",
    "title": "工人"
  },
  {
    "emoji": "👸",
    "code": "&#128120;",
    "nameCode": "[国王]",
    "title": "国王"
  },
  {
    "emoji": "💂",
    "code": "&#128130;",
    "nameCode": "[士兵]",
    "title": "士兵"
  },
  {
    "emoji": "🎅",
    "code": "&#127877;",
    "nameCode": "[圣诞老人]",
    "title": "圣诞老人"
  },
  {
    "emoji": "👰",
    "code": "&#128112;",
    "nameCode": "[婚纱]",
    "title": "婚纱"
  },
  {
    "emoji": "👼",
    "code": "&#128124;",
    "nameCode": "[婴儿]",
    "title": "婴儿"
  },
  {
    "emoji": "💆",
    "code": "&#128134;",
    "nameCode": "[洗头]",
    "title": "洗头"
  },
  {
    "emoji": "💇",
    "code": "&#128135;",
    "nameCode": "[剪头发]",
    "title": "剪头发"
  },
  {
    "emoji": "🙍",
    "code": "&#128589;",
    "nameCode": "[男的]",
    "title": "男的"
  },
  {
    "emoji": "🙎",
    "code": "&#128590;",
    "nameCode": "[靓仔]",
    "title": "靓仔"
  },
  {
    "emoji": "🙅",
    "code": "&#128581;",
    "nameCode": "[双手交叉]",
    "title": "双手交叉"
  },
  {
    "emoji": "🙆",
    "code": "&#128582;",
    "nameCode": "[比心]",
    "title": "比心"
  },
  {
    "emoji": "💁",
    "code": "&#128129;",
    "nameCode": "[托手]",
    "title": "托手"
  },
  {
    "emoji": "🙋",
    "code": "&#128587;",
    "nameCode": "[打招呼]",
    "title": "打招呼"
  },
  {
    "emoji": "🙇",
    "code": "&#128583;",
    "nameCode": "[伤心boy]",
    "title": "伤心boy"
  },
  {
    "emoji": "🙌",
    "code": "&#128588;",
    "nameCode": "[双手]",
    "title": "双手"
  },
  {
    "emoji": "🙏",
    "code": "&#128591;",
    "nameCode": "[祈祷]",
    "title": "祈祷"
  },
  {
    "emoji": "👤",
    "code": "&#128100;",
    "nameCode": "[用户]",
    "title": "用户"
  },
  {
    "emoji": "👥",
    "code": "&#128101;",
    "nameCode": "[双人]",
    "title": "双人"
  },
  {
    "emoji": "🚶",
    "code": "&#128694;",
    "nameCode": "[散步]",
    "title": "散步"
  },
  {
    "emoji": "🏃",
    "code": "&#127939;",
    "nameCode": "[跑步]",
    "title": "跑步"
  },
  {
    "emoji": "👯",
    "code": "&#128111;",
    "nameCode": "[体操]",
    "title": "体操"
  },
  {
    "emoji": "💃",
    "code": "&#128131;",
    "nameCode": "[跳舞]",
    "title": "跳舞"
  },
  {
    "emoji": "👫",
    "code": "&#128107;",
    "nameCode": "[一起]",
    "title": "一起"
  },
  {
    "emoji": "👬",
    "code": "&#128108;",
    "nameCode": "[牵手]",
    "title": "牵手"
  },
  {
    "emoji": "👭",
    "code": "&#128109;",
    "nameCode": "[伙伴]",
    "title": "伙伴"
  },
  {
    "emoji": "💏",
    "code": "&#128143;",
    "nameCode": "[情侣]",
    "title": "情侣"
  },
  {
    "emoji": "💑",
    "code": "&#128145;",
    "nameCode": "[情侣2]",
    "title": "情侣2"
  },
  {
    "emoji": "👪",
    "code": "&#128106;",
    "nameCode": "[一家人]",
    "title": "一家人"
  },
  {
    "emoji": "💪",
    "code": "&#128170;",
    "nameCode": "[强壮]",
    "title": "强壮"
  },
  {
    "emoji": "👈",
    "code": "&#128072;",
    "nameCode": "[击毙你]",
    "title": "击毙你"
  },
  {
    "emoji": "👉",
    "code": "&#128073;",
    "nameCode": "[鸡哔你]",
    "title": "鸡哔你"
  },
  {
    "emoji": "👆",
    "code": "&#128070;",
    "nameCode": "[向上]",
    "title": "向上"
  },
  {
    "emoji": "👇",
    "code": "&#128071;",
    "nameCode": "[向下]",
    "title": "向下"
  },
  {
    "emoji": "👊",
    "code": "&#128074;",
    "nameCode": "[捶]",
    "title": "捶"
  },
  {
    "emoji": "👋",
    "code": "&#128075;",
    "nameCode": "[击掌]",
    "title": "击掌"
  },
  {
    "emoji": "👏",
    "code": "&#128079;",
    "nameCode": "[双手拍]",
    "title": "双手拍"
  },
  {
    "emoji": "👐",
    "code": "&#128080;",
    "nameCode": "[双手]",
    "title": "双手"
  },
  {
    "emoji": "👣",
    "code": "&#128099;",
    "nameCode": "[双脚]",
    "title": "双脚"
  },
  {
    "emoji": "👀",
    "code": "&#128064;",
    "nameCode": "[眼睛]",
    "title": "眼睛"
  },
  {
    "emoji": "👂",
    "code": "&#128066;",
    "nameCode": "[耳朵]",
    "title": "耳朵"
  },
  {
    "emoji": "👃",
    "code": "&#128067;",
    "nameCode": "[鼻子]",
    "title": "鼻子"
  },
  {
    "emoji": "👅",
    "code": "&#128069;",
    "nameCode": "[舌头]",
    "title": "舌头"
  },
  {
    "emoji": "👄",
    "code": "&#128068;",
    "nameCode": "[嘴巴]",
    "title": "嘴巴"
  },
  {
    "emoji": "💋",
    "code": "&#128139;",
    "nameCode": "[唇]",
    "title": "唇"
  },
  {
    "emoji": "👓",
    "code": "&#128083;",
    "nameCode": "[眼镜]",
    "title": "眼镜"
  },
  {
    "emoji": "👔",
    "code": "&#128084;",
    "nameCode": "[西装]",
    "title": "西装"
  },
  {
    "emoji": "👕",
    "code": "&#128085;",
    "nameCode": "[短袖]",
    "title": "短袖"
  },
  {
    "emoji": "👖",
    "code": "&#128086;",
    "nameCode": "[裤子]",
    "title": "裤子"
  },
  {
    "emoji": "👗",
    "code": "&#128087;",
    "nameCode": "[裙子]",
    "title": "裙子"
  },
  {
    "emoji": "👘",
    "code": "&#128088;",
    "nameCode": "[和服]",
    "title": "和服"
  },
  {
    "emoji": "👙",
    "code": "&#128089;",
    "nameCode": "[内衣]",
    "title": "内衣"
  },
  {
    "emoji": "👚",
    "code": "&#128090;",
    "nameCode": "[V领]",
    "title": "V领"
  },
  {
    "emoji": "👛",
    "code": "&#128091;",
    "nameCode": "[水果]",
    "title": "水果"
  },
  {
    "emoji": "👜",
    "code": "&#128092;",
    "nameCode": "[名牌包包]",
    "title": "名牌包包"
  },
  {
    "emoji": "👝",
    "code": "&#128093;",
    "nameCode": "[可爱包包]",
    "title": "可爱包包"
  },
  {
    "emoji": "🎒",
    "code": "&#127890;",
    "nameCode": "[书包]",
    "title": "书包"
  },
  {
    "emoji": "💼",
    "code": "&#128188;",
    "nameCode": "[公文包]",
    "title": "公文包"
  },
  {
    "emoji": "👞",
    "code": "&#128094;",
    "nameCode": "[皮鞋]",
    "title": "皮鞋"
  },
  {
    "emoji": "👟",
    "code": "&#128095;",
    "nameCode": "[休闲鞋]",
    "title": "休闲鞋"
  },
  {
    "emoji": "👠",
    "code": "&#128096;",
    "nameCode": "[高跟鞋]",
    "title": "高跟鞋"
  },
  {
    "emoji": "👡",
    "code": "&#128097;",
    "nameCode": "[拖鞋]",
    "title": "拖鞋"
  },
  {
    "emoji": "👢",
    "code": "&#128098;",
    "nameCode": "[靴子]",
    "title": "靴子"
  },
  {
    "emoji": "👑",
    "code": "&#128081;",
    "nameCode": "[皇冠]",
    "title": "皇冠"
  },
  {
    "emoji": "👒",
    "code": "&#128082;",
    "nameCode": "[帽子]",
    "title": "帽子"
  },
  {
    "emoji": "🎩",
    "code": "&#127913;",
    "nameCode": "[礼帽]",
    "title": "礼帽"
  },
  {
    "emoji": "🎓",
    "code": "&#127891;",
    "nameCode": "[学士帽]",
    "title": "学士帽"
  },
  {
    "emoji": "💄",
    "code": "&#128132;",
    "nameCode": "[口红]",
    "title": "口红"
  },
  {
    "emoji": "💅",
    "code": "&#128133;",
    "nameCode": "[美甲]",
    "title": "美甲"
  },
  {
    "emoji": "💍",
    "code": "&#128141;",
    "nameCode": "[钻戒]",
    "title": "钻戒"
  },
  {
    "emoji": "🌂",
    "code": "&#127746;",
    "nameCode": "[雨伞]",
    "title": "雨伞"
  }
]