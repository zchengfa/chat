import './waterDroplet.sass'
import { Form,Input,Button,notification} from "antd";

function WaterDroplet(props:any){
    const [api,contextHolder,] = notification.useNotification()
    const key = 'updatable'
    const onFinish = (values:any)=>{
        console.log(values)
    }

    const onFinishFailed = ()=>{
        api.open({
            key,
            message: 'Form Error',
            description: 'Please fill out the form content according to regulations.',
        })

    }

    return <div className={'drop-container'}>
        {contextHolder}
        {

            props.type === 'form' ? <div className={'drop'} style={{minHeight:'400px',boxShadow:props.dropBoxShadow,width:props.width,height:props.height,backgroundColor:props.waterDropletColor}}>
                <p className={'form-title'} style={{fontSize:props.fontSize}}>{props.title ? props.title : 'title'}</p>
                <Form className={'form'}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                >
                    <Form.Item className="form-item" name={'username'} validateTrigger="onBlur" rules={[{required:true,message:'please enter your username'}]}>
                        <Input className={'account form-input'} placeholder={'Username'}></Input>
                    </Form.Item>
                    <Form.Item className="form-item password" name={'password'} validateTrigger="onBlur" rules={[{required:true,message:'please enter your password'}]}>
                        <Input className={'password form-input'} placeholder={'Password'}></Input>
                    </Form.Item>
                    <Form.Item className={'form-item'}>
                        <Button htmlType={'submit'} className={'form-input form-btn'}>LOGIN</Button>
                    </Form.Item>
                </Form>
            </div>: <div className={'drop'} style={{left:'0',top:'0',boxShadow:props.dropBoxShadow,width:props.width,height:props.height,borderRadius:props.radius,backgroundColor:props.waterDropletColor}}>
                <span className={'drop-before'} style={{backgroundColor:props.preCircleBgColor}}></span>
                <span className={'form-title'} style={{position:'relative',top:'0%',maxWidth:'50%',textAlign:'center',fontSize:props.fontSize,color:props.color}}>{props.title ? props.title : 'title'}</span>
            </div>
        }
    </div>
}

export default WaterDroplet