// import { Row,Col } from 'antd'
import './login.sass'
import WaterDroplet from "../../components/WaterDroplet/WaterDroplet";
function Login(){

    return <div className={'drops'}>
        <div className={'drop-one'} style={{width:'400px',height:'400px'}}>
            <WaterDroplet type={'form'} dropBoxShadow={'inset 20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(0,0,0,.05),20px 20px 20px rgba(0,0,0,.05),inset -20px -20px 25px rgba(255,255,255,.9)'}
                          title={'Sign in'}
                          width={'400px'}
                          height={'400px'}
            ></WaterDroplet>
        </div>
        <div className={'drop-two'} style={{width:'200px',height:'200px'}}>
            <WaterDroplet width={'200px'} height={'200px'} title={'FORGET PASSWORD'}
                          radius={'70% 30% 38% 62% / 21% 58% 42% 79%'} fontSize={'12px'}
                          waterDropletColor={'red'}
            >

            </WaterDroplet>
        </div>
        <div className={'drop-three'} style={{width:'140px',height:'140px'}}>
            <WaterDroplet width={'140px'} height={'140px'} title={'SIGN UP'}
                          radius={'45% 55% 70% 30% / 21% 58% 42% 79%'} fontSize={'12px'}
                          waterDropletColor={'blue'}
            >

            </WaterDroplet>
        </div>
    </div>

}

export default Login