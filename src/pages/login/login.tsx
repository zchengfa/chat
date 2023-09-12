import './login.sass'
import WaterDroplet from "../../components/WaterDroplet/WaterDroplet";
import { encrypt } from "../../util/util";
import { loginRegisterAxios } from "../../network/request";
import {useState} from "react";

function Login(){
    const [isLogin,setBtnStatus] = useState(true)
    const login = (data:{username:string,password:string},status:boolean)=>{
        data.password = encrypt(data.password)
        loginRegisterAxios(data,status).then(res=>{
            console.log(res)
        })
    }
    const register = ()=>{
        setBtnStatus(false)
    }

    const forgetPassword = ()=>{
        console.log('forget')
    }
    const signUp = ()=>{
        console.log('signUp')
    }

    return <div className={'drops'}>

        <div className={'drop-four'} style={{width:'140px',height:'140px'}}>
            <WaterDroplet width={'140px'} height={'140px'} title={'REGISTER'}
                          radius={'76% 24% 51% 49% / 68% 78% 22% 32%'} fontSize={'12px'}
                          waterDropletColor={'rgba(62 ,179, 156,1)'}
                          dropBoxShadow={'inset 20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(62 ,179, 156,,0.5),inset -20px -20px 25px rgba(255,255,255,.9)'}
                          color={'#fff'}
                          preCircleBgColor={'rgba(62 ,179, 156,0.5)'}
                          operationClick={register}
            >

            </WaterDroplet>
        </div>
        <div className={'drop-one'} style={{width:'400px',height:'400px'}}>
            <WaterDroplet type={'form'} dropBoxShadow={'inset 20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(0,0,0,.05),inset -20px -20px 25px rgba(255,255,255,.9)'}
                          title={'Sign in'}
                          width={'400px'}
                          height={'400px'}
                          waterDropletColor={'rgba(231 221 221,.5)'}
                          submit={login}
                          isLogin={isLogin}
            ></WaterDroplet>
        </div>
        <div className={'drop-two'} style={{width:'200px',height:'200px'}}>
            <WaterDroplet width={'200px'} height={'200px'} title={'FORGET PASSWORD'}
                          radius={'70% 30% 38% 62% / 21% 58% 42% 79%'} fontSize={'12px'}
                          waterDropletColor={'#ff00bf'}
                          dropBoxShadow={'inset 20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(255,0,191,0.5),inset -20px -20px 25px rgba(255,255,255,.9)'}
                          color={'#fff'}
                          preCircleBgColor={'rgba(255,0,191,0.5)'}
                          operationClick={forgetPassword}
            >

            </WaterDroplet>
        </div>
        <div className={'drop-three'} style={{width:'140px',height:'140px'}}>
            <WaterDroplet width={'140px'} height={'140px'} title={'SIGN UP'}
                          radius={'45% 55% 70% 30% / 21% 58% 42% 79%'} fontSize={'12px'}
                          waterDropletColor={'#00b0ff'}
                          dropBoxShadow={'inset 20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(0,176,255,0.5),inset -20px -20px 25px rgba(255,255,255,.9)'}
                          color={'#fff'}
                          preCircleBgColor={'rgba(0,176,255,0.5)'}
                          operationClick={signUp}
            >

            </WaterDroplet>
        </div>
    </div>

}

export default Login