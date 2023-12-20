import './collectionList.sass'
import {collectionMenu} from "../../../common/staticData/data";
import {List} from "antd";
import {useState} from "react";
import {UpOutlined,DownOutlined} from '@ant-design/icons'

export function CollectionList (props:any){
  const [isOpen,setIsOpen] = useState(false)

  const btnClick = (index:number)=>{
    if(index === 3){
      setIsOpen(!isOpen)
    }
  }

  return <List className={'menu-box'}
               itemLayout={'vertical'}
               dataSource={collectionMenu}
               split={false}
               renderItem={(item:any,index:number)=>{
                 return <List.Item onClick={()=> btnClick(index)} className={'menu-item'} style={item.type ? {justifyContent:'center'} : {}}>
                   {

                     index !== 3 ? <div className={'item-box'}>
                       {item.icon}
                       <span className={'item-title'}>{item.title}</span>
                     </div> : <div className={'item-box'}>
                       <div>
                         {item.icon}
                         <span className={'item-title'}>{item.title}</span>
                       </div>
                       {
                         isOpen ? <DownOutlined className={'up-down'} /> : <UpOutlined className={'up-down'}/>
                       }
                     </div>
                   }
                 </List.Item>
               }}
  ></List>
}