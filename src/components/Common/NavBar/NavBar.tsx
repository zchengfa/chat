import './NavBar.sass'
import {Navbar, Nav,NavDropdown} from "react-bootstrap";
import {NavBarData} from "../../../common/staticData/data";
import {useMessageStore} from "../../../zustand/store";
import {useNavigate} from "react-router-dom";

function NavBar(props:any){
  // @ts-ignore
  const {friendInfo,chatWindowSiderInfo,customer} = useMessageStore()
  const title = props.emptyTitle ? undefined : props.title ? props.title : (friendInfo[customer.user_id]?.isGroupChat ? friendInfo[customer.user_id]?.user + `(${chatWindowSiderInfo?.members.length})` : friendInfo[customer.user_id]?.user)
  const navigate = useNavigate()

  const addClick = ()=>{

  }
  const back = ()=>{
    navigate(-1)
    if (props.backEvent) {
      props.backEvent()
    }
  }

  const moreClick = ()=>{
    if (props.moreEvent) {
      props.moreEvent()
    }
  }

  return <Navbar expand className={'nav-bar'}>
    <Nav className={'nav'}>
      {props.back ? <div onClick={back} className={'nav-back-box nav-item'}>{NavBarData.back.icon}</div> : <div className={'nav-item'}></div>}
      <div className={'nav-center'}>{title}</div>
      {props.more ? <div className={'nav-more-box nav-item'} onClick={moreClick}>{NavBarData.more.icon}</div> : null}
      {props.add ? <div className={'nav-add-box nav-item'} onClick={addClick}>
        <NavDropdown title={NavBarData.add.icon} className={'dropdown-nav'}>
          {
            NavBarData.dropDownList.map((item:any,index:number)=>{
              return <NavDropdown.Item key={index}>
                {item.icon}
                <span className={'dropdown-item-title'}>{item.title}</span>
              </NavDropdown.Item>
            })
          }
        </NavDropdown>
      </div> : null}
    </Nav>
  </Navbar>
}

NavBar.defaultProps = {
  emptyTitle:false
}
export default NavBar

