import { useNavigate,useLocation,useParams } from "react-router-dom";
import { useMessageStore } from "../zustand/store";

function WithHook(WrapperComponent:any){
    function ComponentProps(props:any){
        const navigate = useNavigate()
        const params  = useParams()
        const location = useLocation()

        const router = {
            navigate,params
        }

        const Zustand = useMessageStore()

        return <WrapperComponent {...props} router={router} location={location} params={params}
           Zustand = { Zustand }
        ></WrapperComponent>
    }

    return ComponentProps
}

export default WithHook