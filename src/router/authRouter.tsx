import { Navigate } from "react-router-dom";
import {useMessageStore} from "../zustand/store";


// @ts-ignore
export default function AuthRouter ({ children }){
    return useMessageStore((state:any)=> state.token) !==undefined ? (children) : <Navigate to={'/login'} replace></Navigate>
}