import './login.sass'
import WaterDroplet from "../../components/WaterDroplet/WaterDroplet";
import { encrypt } from "../../util/util";
import { loginRegisterAxios } from "../../network/request";
import {useState} from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useMessageStore } from "../../zustand/store";
import {Container,Row,Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

function Login(){
    const [isLogin,setBtnStatus] = useState(true)
    const [title,setTitle] = useState('REGISTER')
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    const setToken = useMessageStore((state:any)=> state.setToken)
    const setUserInfo = useMessageStore((state:any)=> state.setUserInfo)
    const login = (data:{username:string,password:string},status:boolean)=>{
        data.password = encrypt(data.password)
        loginRegisterAxios(data,status).then(res=>{
            /**
             * 1.登录成功
             *  1.1将token以及用户信息交给Zustand管理
             *  1.2将信息反馈给用户
             *  1.3跳转到首页
             * 2.出现错误
             *  2.1将错误信息反馈给用户
             */
            if(res.data.success){

                if(status){
                    setToken(res.data.token)
                    setUserInfo(res.data.userInfo)
                    let timer = setTimeout(()=>{
                        navigate('/home')
                        clearTimeout(timer)
                    },500)
                }
                messageApi.open({
                    type:'success',
                    content:res.data.success
                }).then()
            }
            else if(res.data.errMsg){
                messageApi.open({
                    type:'error',
                    content:res.data.errMsg
                })
            }
        }).catch((err:any)=>{
           if(err.code === 'ERR_NETWORK'){
               messageApi.open({
                   type:'error',
                   content:'网络出现错误，请检查网络或服务端是否出现问题！'
               })
           }
        })
    }
    const register = ()=>{
        setBtnStatus(!isLogin)

        isLogin ? setTitle('LOGIN') : setTitle('REGISTER')
    }

    const forgetPassword = ()=>{
        messageApi.open({
            type:'error',
            content:'该功能完善中'
        })
    }
    const signUp = ()=>{
        register()
    }

    return <Container className={'drops-container'}>
        <Row className={'drops-row'}>
            <Col className={'drops-col'}>
                {contextHolder}
                <span className={'welcome'}>Welcome to my chat website</span>
                <div className={'drop-four drop-item'} style={{width:'140px',height:'140px'}}>
                    <WaterDroplet width={'140px'} height={'140px'} title={title}
                                  radius={'76% 24% 51% 49% / 68% 78% 22% 32%'} fontSize={'12px'}
                                  waterDropletColor={'rgba(62 ,179, 156,1)'}
                                  dropBoxShadow={'inset 20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(62 ,179, 156,,0.5),inset -20px -20px 25px rgba(255,255,255,.9)'}
                                  color={'#fff'}
                                  preCircleBgColor={'rgba(62 ,179, 156,0.5)'}
                                  operationClick={register}
                                  justButton={true}
                    >

                    </WaterDroplet>
                </div>
                <div className={'drop-one drop-item'}>
                    <WaterDroplet type={'form'}
                                  title={'Sign in'}
                                  waterDropletColor={'rgba(231 221 221,.5)'}
                                  submit={login}
                                  isLogin={isLogin}
                    ></WaterDroplet>
                </div>
                <div className={'drop-two drop-item'} style={{width:'200px',height:'200px'}}>
                    <WaterDroplet width={'200px'} height={'200px'} title={'FORGET PASSWORD'}
                                  radius={'70% 30% 38% 62% / 21% 58% 42% 79%'} fontSize={'12px'}
                                  waterDropletColor={'#ff00bf'}
                                  dropBoxShadow={'inset 20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(255,0,191,0.5),inset -20px -20px 25px rgba(255,255,255,.9)'}
                                  color={'#fff'}
                                  preCircleBgColor={'rgba(255,0,191,0.5)'}
                                  operationClick={forgetPassword}
                                  justButton={true}
                    >

                    </WaterDroplet>
                </div>
                <div className={'drop-three drop-item'} style={{width:'140px',height:'140px'}}>
                    <WaterDroplet width={'140px'} height={'140px'} title={'SIGN UP'}
                                  radius={'45% 55% 70% 30% / 21% 58% 42% 79%'} fontSize={'12px'}
                                  waterDropletColor={'#00b0ff'}
                                  dropBoxShadow={'inset 20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(0,176,255,0.5),inset -20px -20px 25px rgba(255,255,255,.9)'}
                                  color={'#fff'}
                                  preCircleBgColor={'rgba(0,176,255,0.5)'}
                                  operationClick={signUp}
                                  justButton={true}
                    >

                    </WaterDroplet>
                </div>
                <div className={'btn-box'}>
                    <div className={'button'} onClick={register}>R</div>
                    <div className={'button'} onClick={register}>S</div>
                    <div className={'button'} onClick={forgetPassword}>F</div>
                </div>
            </Col>
        </Row>
    </Container>

}

export default Login