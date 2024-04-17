import './contextMenu.sass'
import {useContextMenuStore,useMessageStore} from "../../../zustand/store";
import {message,Modal} from "antd";
import {useState} from "react";

function ContextMenu (props:any){
  const {contextMenu} = useContextMenuStore((state:any)=> state)
  const {deleteChat} = useMessageStore((state:any)=> state)
  const [messageApi,contextHolder] = message.useMessage()
  const [modalOpen,setModalOpen] = useState(false)
  const contextItemClick = (item:any,index:number)=>{
    let contextMenuEl:any = document.getElementById('context-menu')
    contextMenuEl.style.display = 'none'
    if(item === '删除聊天'){
      setModalOpen(true)
    }
    else if (item === '不显示聊天'){
      //从chatList列表删除，但保留消息记录
      deleteChat(true)
    }
    else{
      messageApi.open({
        type:'warning',
        content: item + '功能开发中'
      }).then()
    }
  }

  const showHideModal = (status:boolean)=>{
    setModalOpen(status)
  }

  const deleteHistory = ()=>{
    deleteChat()
    setModalOpen(false)
  }

  return <div className={'context-menu-container'} id={'context-menu'}>
    {contextHolder}
    <Modal centered={true} mask={false} okText={'删除'} closeIcon={false} width={300} cancelText={'取消'}
           open={modalOpen} onCancel={() => showHideModal(false)}
           onOk={deleteHistory}
    >
      <span style={{display:"inline-block",textAlign:'center'}}>删除聊天后，将同时删除聊天记录，包括聊天中的文件、图片、视频等内容。</span>
    </Modal>
    {contextMenu?.map((item:any,index:number)=>{
      return <div className={'context-menu-item'} key={index} onClick={()=> contextItemClick(item,index)}>
        <span className={'context-menu-title'}>{item}</span>
      </div>
    })}
  </div>
}

export default ContextMenu