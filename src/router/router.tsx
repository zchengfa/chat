import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import {lazy} from "react";


const Home = lazy(()=> import('../pages/home/index'))
const Login = lazy(()=> import('../pages/login/login'))

function RouterComponent(){
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<Home />}></Route>
                <Route path={'/home'} element={<Home />}></Route>
                <Route path={'/login'} element={<Login />}></Route>
                <Route path={'*'} element={<Home />}></Route>
            </Routes>
        </Router>
    )
}

export default RouterComponent