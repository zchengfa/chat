import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {lazy} from "react";
import AuthRouter from "./authRouter";
import {isMobile} from "../util/util";

const Home = lazy(()=> import('../pages/home/index'))
const Login = lazy(()=> import('../pages/login/login'))

function RouterComponent(){
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<AuthRouter><Home /></AuthRouter>}>
                    <Route path={'/home'} element={<Home />}></Route>
                    <Route path={'*'} element={<Home />}></Route>
                  {/*{*/}
                  {/*  isMobile ? */}
                  {/*    <Route path={'/home'} element={<Home />}></Route>*/}
                  {/*    :null*/}
                  {/*}*/}
                </Route>
                <Route path={'/login'} element={<Login />}></Route>
            </Routes>
        </Router>
    )
}

export default RouterComponent