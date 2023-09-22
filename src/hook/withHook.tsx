import { useNavigate,useLocation,useParams } from "react-router-dom";
import { useMessageStore } from "../zustand/store";
import { useRef } from "react";
import { socket } from "../socket/socket";
import { message } from "antd";

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

        const [messageApi,contextHolder] = message.useMessage()

        const Message = {
            messageApi,
            contextHolder
        }

        return <WrapperComponent {...props} router={router} location={location} params={params}
           Zustand = { Zustand } Refs={ Ref } socket = { socket } Message = { Message }
        ></WrapperComponent>
    }

    return ComponentProps
}

export default WithHook