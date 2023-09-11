import { useNavigate,useLocation,useParams } from "react-router-dom";
import { useMessageStore } from "../zustand/store";
import { useRef } from "react";
import { socket } from "../socket/socket";

function WithHook(WrapperComponent:any){
    function ComponentProps(props:any){
        const navigate = useNavigate()
        const params  = useParams()
        const location = useLocation()

        const router = {
            navigate,params
        }

        const Ref = useRef(null)

        const Zustand = useMessageStore()

        return <WrapperComponent {...props} router={router} location={location} params={params}
           Zustand = { Zustand } Refs={ Ref } socket = { socket }
        ></WrapperComponent>
    }

    return ComponentProps
}

export default WithHook