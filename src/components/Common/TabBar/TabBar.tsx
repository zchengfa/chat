import './tabbar.sass'
import {TabBarData} from "../../../common/staticData/data";
import {useTabbarStore} from "../../../zustand/store";
import {useNavigate} from "react-router-dom";

function TabBar(props:any) {
  const tabStore:any = useTabbarStore()
  const navigate = useNavigate()
  const tabClick = (index:number)=>{
    tabStore.changeIndex(index)
    props.routes.forEach((item:any,i:number)=>{
      if(index === i){
        navigate(item)
      }
    })

  }

  const tabData = TabBarData ? TabBarData : props.tab

  return <div className={'tabbar-container'}>
    {
      tabData.map((item:any,index:number)=>{
        return <div className={tabStore.currentIndex === index ? 'tab-item tab-actived' : 'tab-item'} key={index} onClick={()=> tabClick(index)}>
          {item.icon}
          <span className={'tab-title'}>{item.title}</span>
        </div>
      })
    }
  </div>
}

export default TabBar;