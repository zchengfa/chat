import './siderPop.sass'
export function SiderPop (props:any){
  const {data} = props
  const checkContentType = (item:any)=>{
    let confident = Object.prototype.toString.call(item) === '[object Object]'
    if(!Array.isArray(item)){
      return confident
    }
    else{
      let count = 0
      item.forEach((i:any)=>{
        if(checkContentType(i)){
          count ++
        }
      })
      return count
    }
  }

  return <div className={checkContentType(data) ? 'sider-pop has-content' : 'sider-pop'} >
    {data.map((item:any,index:number)=>{
      if (!checkContentType(item)) {
        return <div className={'box-item'} key={index}>
          <span className={'title'}>{item}</span>
        </div>
      }
      else{
        return <div className={'box-item'} key={index}>
          {item.content}
          <span className={'title'}>{item.title}</span>
        </div>
      }
    })}
  </div>
}