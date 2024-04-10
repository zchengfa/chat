import './contextMenu.sass'
import {useContextMenuStore} from "../../../zustand/store";
import {message} from "antd";

function ContextMenu (props:any){
  const {contextMenu} = useContextMenuStore((state:any)=> state)
  const [messageApi,contextHolder] = message.useMessage()
  const contextItemClick = (item:any,index:number)=>{
    let contextMenuEl:any = document.getElementById('context-menu')
    contextMenuEl.style.display = 'none'
    messageApi.open({
      type:'warning',
      content: item + '功能开发中'
    }).then()
  }

  return <div className={'context-menu-container'} id={'context-menu'}>
    {contextHolder}
    {contextMenu?.map((item:any,index:number)=>{
      return <div className={'context-menu-item'} key={index} onClick={()=> contextItemClick(item,index)}>
        <span className={'context-menu-title'}>{item}</span>
      </div>
    })}
  </div>
}

export default ContextMenu