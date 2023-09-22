// @ts-ignore
import cryptoJs from 'crypto-js/crypto-js'

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

export function timeFormatting (fm:string,time:any){
  //拓展Date的时间格式化函数
  // @ts-ignore
  // eslint-disable-next-line no-extend-native
  Date.prototype.format = function (fmt){
    let formatObject = {
      "M+": this.getMonth() + 1,                   //月份
      "d+": this.getDate(),                        //日
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
      if (new RegExp("(" + k + ")", "i").test(fmt)) {
        fmt = fmt.replace(
            //@ts-ignore
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