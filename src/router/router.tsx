import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {lazy} from "react";
import AuthRouter from "./authRouter";
// import AuthRouter from "./authRouter";



const Home = lazy(()=> import('../pages/home/index'))
const Login = lazy(()=> import('../pages/login/login'))

function RouterComponent(){
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<AuthRouter><Home /></AuthRouter>}>
                    <Route path={'/home'} element={<Home />}></Route>
                    <Route path={'*'} element={<Home />}></Route>
                </Route>
                <Route path={'/login'} element={<Login />}></Route>
            </Routes>
        </Router>
    )
}

export default RouterComponent