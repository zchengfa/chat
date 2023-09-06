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