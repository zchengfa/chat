import './NavBar.sass'
import withHook from "../../../hook/withHook";
import {Navbar, Container, Nav,NavDropdown} from "react-bootstrap";
import {NavBarData} from "../../../common/staticData/data";

function NavBar(props:any){
  const addClick = ()=>{

  }
  return <Navbar expand className={'nav-bar'}>
    <Nav className={'nav'}>
      {props.back ? <div className={'nav-back-box nav-item'}>{NavBarData.back.icon}</div> : <div className={'nav-item'}></div>}
      <div className={'nav-center'}>{props.title}</div>
      {props.more ? <div className={'nav-more-box nav-item'}>{NavBarData.more.icon}</div> : null}
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

export default withHook(NavBar)

