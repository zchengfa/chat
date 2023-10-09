// @ts-ignore
import cryptoJs from 'crypto-js/crypto-js'
import pinyin from "pinyin";
import {InputNumberProps} from "antd";


const key = cryptoJs.enc.Utf8.parse("1234123412PackMyBoxWithFiveDozenLiquorJugs");  //十六位十六进制数作为密钥
const iv = cryptoJs.enc.Utf8.parse('PackMyBoxWithFiveDozenLiquorJugs1234123412');   //十六位十六进制数作为密钥偏移量

//密码加密
export function encrypt(password:string) {
  let string = cryptoJs.enc.Utf8.parse(password);
  let encrypted = cryptoJs.AES.encrypt(string, key, { iv: iv, mode: cryptoJs.mode.CBC, padding: cryptoJs.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}

//密码解密
export function decrypt(password:string) {
  let encryptedHexStr = cryptoJs.enc.Hex.parse(password);
  let string = cryptoJs.enc.Base64.stringify(encryptedHexStr);
  let decrypt = cryptoJs.AES.decrypt(string, key, { iv: iv, mode: cryptoJs.mode.CBC, padding: cryptoJs.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(cryptoJs.enc.Utf8);
  return decryptedStr.toString();
}
export function debounce (func:Function,delay:number){
  let timer:any = null
  return (...args: any) =>{
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      //@ts-ignore
      func.apply(this,args)
    },delay)

  }
}

/**
 * 给函数对象的数组根据首字母进行排序
 * @param arr { Array } 数组
 * @param propertyName { string } 根据哪个属性
 * @return 排序后的数组
 */
export function sortByLocaleWithObject(arr:any[],propertyName:string){
 return arr.sort((a:any,b:any)=> a[propertyName].localeCompare(b[propertyName],'zh-CN-u-kf-upper'))
}

export function timeFormatting (fm:string,time?:any){
  //拓展Date的时间格式化函数
  // @ts-ignore
  // eslint-disable-next-line no-extend-native
  Date.prototype.format = function (fmt){
    let formatObject:any = {
      "M+": this.getMonth() + 1,                   //月份
      "D+": this.getDate(),                        //日
      "h+": this.getHours(),                       //小时
      "m+": this.getMinutes(),                     //分
      "s+": this.getSeconds(),                     //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds()                  //毫秒
    };

    //  获取年份
    // ①
    if (/(y+)/i.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (let k in formatObject) {
      // ②
      if (new RegExp("(" + k + ")", "g").test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1, (RegExp.$1.length === 1) ? (formatObject[k]) : (("00" + formatObject[k]).substr(("" + formatObject[k]).length)));

      }

    }
    return fmt;
  }
  if (time){
    return time.format(fm)
  }
  else {
    // @ts-ignore
    return new Date().format(fm)
  }

}

export function getFirstPinYin(str:string){
  let data = pinyin(str.substring(0,1)),p = undefined
  data.map((item:any)=>{
    return p = item[0].substring(0,1).toUpperCase()
  })
  return p

}

/**
 * 用于查验好友申请是否过期
 * @param arr { any[] } 数组
 */
export function verifyTime(arr:any[]){

  let time:number = new Date().getTime()
  //3天后过期
  let expired = 1000*60*60*24*3

  arr.map((item:any)=>{

    if(time - item.applyTime > expired){
      item.isExpired = true
    }
    else{
      item.isExpired = false
    }

  })

  return arr
}

/**
 * 处理给定时间与当前时间的间隔时间（五分钟前、当天几点几分、昨天几时几分、前天几时几分、星期一到七几时几分、几年几月几日几时几分）
 * @param time { number } 给定时间
 * @param separator { string | string[] | undefined } 时间分割符
 * @return { string } 返回处理后的时间
 */
export function dealMsgTime (time:number,separator:string | string[] | undefined = undefined){

  //返回处理后的时间
  let showTime = undefined,S = Object.prototype.toString.call(separator),YS = '',HS = ''

  if( S === '[object String]' ){
    YS = `YY` + separator + `MM` + separator + `DD`
    HS = `hh` + separator + `mm`
  }
  else if(Array.isArray(separator) ){
    YS = `YY` + separator[0] + `MM` + separator[0] + `DD`
    HS = `hh` + separator[1] + `mm`
  }
  else if( S === '[object Undefined]' ){
    YS = 'YY-MM-DD'
    HS = `hh:mm`
  }


  //获取当前时间(年月日)
  let nowDate = new Date()
  let NY = nowDate.getFullYear(),NM = nowDate.getMonth(),ND = nowDate.getDate()

  //获取给定的时间属于哪年哪月哪日
  let timeDate = new Date(time)
  let TY = timeDate.getFullYear(),TM = timeDate.getMonth(),TD = timeDate.getDate()

  //给定时间的几时几分
  let HM = timeFormatting(HS,new Date(time))

  //判断给定时间与当前时间是否是同年同月
  if( NY === TY && NM === TM ){
    let str = '',interval = ND - TD

    //再判断间隔天数(1.是否同一天、2.间隔一天、3.间隔两天、4.间隔三到七天、5.超过七天)
    if( ND === TD){
      //同一天（判断间隔是否超过5分钟）
      let fiveMinutes = 5*60*1000
      if(nowDate.getTime() - time >= fiveMinutes && nowDate.getTime() - time <= 7*60*1000){
        HM = '五分钟前'
      }
      str = ''
    }
    else if( interval === 1 ){
      //间隔一天
      str = '昨天'
    }
    else if( interval === 2){
      //间隔两天
      str = '前天'
    }
    else if(interval >= 3 && interval <= 7){
      //间隔三道七天获取给定时间是在星期几
      let week = new Date(time).getDay()
      switch (week) {
        case 0:
          str = '星期天';
          break;
        case 1:
          str = '星期一';
          break;
        case 2:
          str = '星期二';
          break;
        case 3:
          str = '星期三';
          break;
        case 4:
          str = '星期四';
          break;
        case 5:
          str = '星期五';
          break;
        case 6:
          str = '星期六';
          break;
      }
    }
    else if(interval > 7){
      str = timeFormatting(YS,new Date(time))
      HM = timeFormatting(HS,new Date(time))
    }

    showTime = str + HM

  }
  //异年同月或同年异月
  else{
    showTime = timeFormatting(YS + ' ' + HS,new Date(time))
  }

  return showTime
}

/**
 * 将表情符号转换为字符串
 * @param str { string } 表情符号
 */
export function emojiToUtf16(str:string){
  let pattern = /[\ud800-\udbff][\udc00-\udfff]/g

  str = str.replace(pattern, (char: string) => {
    let H,L,code;
    return (char.length === 2) ? function (){
      H = char.charCodeAt(0); // 取出高位

      L = char.charCodeAt(1); // 取出低位

      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法

      return "&#" + code + ";"
    }() : char
  })

  return str
}

/**
 * 字符串转表情
 * @param str { string } 字符串
 */
export function utf16ToEmoji(str:string){
  const reg = /\&#.*?;/g;
  return str.replace(reg, (char)=> {

    let H, L, code;

    return (char.length === 9) ? function (){
      let match:any = char.match(/[0-9]+/g)
      code = parseInt(match);

      H = Math.floor((code - 0x10000) / 0x400) + 0xD800;

      L = (code - 0x10000) % 0x400 + 0xDC00;

      return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
    }() : char

  });

}

export function emojiCode(){
  let s = '🌹🍀🍎💰📱🌙🍁🍂🍃🌷💎🔪🔫🏀👄👍🔥😀😁😂😃😄😅😆😉😊😋😎😍😘😗😙😚😇😐😑😶😏😣😥😮😯😪😫😴😌😛😜😝😒😓😔😕😲😷😖😞😟😤😢😭😦😧😨😬😰😱😳😵😡😠😈👿👹👺💀👻👽👦👧👨👩👴👵👶👱👮👲👳👷👸💂🎅👰👼💆💇🙍🙎🙅🙆💁🙋🙇🙌🙏👤👥🚶🏃👯💃👫👬👭💏💑👪💪👈👉👆👇✋✊👊👋👏👐👣👀👂👃👅👄💋👓👔👕👖👗👘👙👚👛👜👝🎒💼👞👟👠👡👢👑👒🎩🎓💄💅💍🌂'
  let codeArr:any[] =  s.split('')
  let transformCode:any[] = [],data:any[] = []

  let i = 0
  codeArr.map((item:any)=>{
    transformCode.push(codeArr[i]+codeArr[i+1])
    i +=2
  })


  transformCode = transformCode.splice(0,transformCode.length/2)
  transformCode.map((item:any)=>{
    data.push({
      emoji:item,
      code:emojiToUtf16(item),
      nameCode:'[玫瑰]',
      title:'玫瑰'
    })
  })

  console.log(data)
}