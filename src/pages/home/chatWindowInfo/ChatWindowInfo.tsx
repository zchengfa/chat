import './chatWindowInfo.sass'
import {Fragment} from "react";
import NavBar from "../../../components/Common/NavBar/NavBar";
import ChatSiderWindow from "../../../components/ChatSiderWindow/ChatSiderWindow";

export default function ChatWindowInfo (props:any){
  return <Fragment>
    <NavBar back emptyTitle={true}></NavBar>
    <div className={'window-info'}>
      <ChatSiderWindow></ChatSiderWindow>
    </div>
  </Fragment>
}