import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Fragment, lazy} from "react";
import AuthRouter from "./authRouter";
import {isMobile} from "../util/util";

const Home = lazy(()=> import('../pages/home/index'))
const Login = lazy(()=> import('../pages/login/login'))
const FriendList = lazy(()=> import('../pages/home/FriendList/FriendList'))
const ChatContent = lazy(()=> import('../pages/home/ChatContent/ChatContent'))
const FriendListCon = lazy(()=> import('../pages/home/FriendListContent/FriendListContent'))
const ChatWindowInfo = lazy(()=> import('../pages/home/chatWindowInfo/ChatWindowInfo'))

function RouterComponent(){
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<AuthRouter><Home /></AuthRouter>}>
                    <Route path={'/home'} element={<Home />}></Route>
                    <Route path={'*'} element={<Home />}></Route>

                </Route>
                {
                    isMobile ? <Fragment>
                        <Route path={'/chatNote'} element={<FriendList />}></Route>
                        <Route path={'/chatContent'} element={<ChatContent />}></Route>
                        <Route path={'/friendListContent'} element={<FriendListCon />}></Route>
                        <Route path={'/chatWindowInfo'} element={<ChatWindowInfo />}></Route>
                    </Fragment>:null
                }
                <Route path={'/login'} element={<Login />}></Route>
            </Routes>
        </Router>
    )
}

export default RouterComponent